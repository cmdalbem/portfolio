import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Lorenz attractor – port of the original P5 sketch to GPU shaders.
 *
 * ORIGINAL P5 BEHAVIOR (kept in sync):
 * - Lorenz: dx = σ(y−x), dy = x(ρ−z)−y, dz = xy−βz; one step dt = stepSpeed, 15 steps/frame.
 * - Trail: prev[] = [oldest … newest]; each frame push(current), shift if > tailSize.
 * - Draw: ONE stroke per trail – stroke(hue, 120, lightness * (prev.length/tailSize)); no gradient along trail.
 * - Vertex order: newest first (head), then backwards to oldest (tail). Adaptive R step in P5 (we draw all segments).
 * - Camera: perspective(π/4), camera(0,0,70); rotateY(frame/2000−π/10), rotateX(frame/1000); translate(10,0,−20).
 * - Blend: ADD (dark) / SUBTRACT (light). Initial positions: random in [-20,20]³. Inject: every 60 frames after 350, replace one point with random in [-100,100]³.
 */
const SIGMA = 10;
const RHO = 28;
const BETA = 8 / 3;
const STEP_SPEED = 0.0005;
const CALC_ITERATIONS = 8;
const NUM_POINTS = 300;
const TAIL_SIZE = 100;
const ROTATION_SPEED = 0.5;
const INJECT_INTERVAL = 60;
const INJECT_START_FRAME = 300;

// Shader: one Lorenz step per fragment (state texture: numPoints × 1)
const lorenzVertexShader = `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const lorenzFragmentShader = `
  uniform sampler2D uState;
  uniform float uSigma;
  uniform float uRho;
  uniform float uBeta;
  uniform float uDt;
  uniform int uSteps;
  uniform float uNumPoints;

  void main() {
    vec2 uv = gl_FragCoord.xy / vec2(uNumPoints, 1.0);
    vec4 s = texture2D(uState, uv);
    float x = s.x, y = s.y, z = s.z;

    float dt = uDt / float(uSteps);
    for (int i = 0; i < 15; i++) {
      if (i >= uSteps) break;
      float dx = uSigma * (y - x);
      float dy = x * (uRho - z) - y;
      float dz = x * y - uBeta * z;
      x += dt * dx;
      y += dt * dy;
      z += dt * dz;
    }

    gl_FragColor = vec4(x, y, z, 1.0);
  }
`;

// Shader: update trail (shift and add new head from state)
const trailVertexShader = `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const copyFragmentShader = `
  uniform sampler2D uSource;
  uniform vec2 uSize;

  void main() {
    vec2 uv = gl_FragCoord.xy / uSize;
    gl_FragColor = texture2D(uSource, uv);
  }
`;

// Inject: copy state but replace one pixel with new random position
const injectVertexShader = `
  void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;
const injectFragmentShader = `
  uniform sampler2D uState;
  uniform float uNumPoints;
  uniform float uInjectIndex;
  uniform vec3 uInjectPos;

  void main() {
    float i = gl_FragCoord.x;
    vec2 uv = gl_FragCoord.xy / vec2(uNumPoints, 1.0);
    if (i >= uInjectIndex && i < uInjectIndex + 1.0) {
      gl_FragColor = vec4(uInjectPos, 1.0);
    } else {
      gl_FragColor = texture2D(uState, uv);
    }
  }
`;

const resetTrailFragmentShader = `
  uniform sampler2D uTrail;
  uniform float uNumPoints;
  uniform float uTrailHeight;
  uniform float uInjectIndex;
  uniform vec3 uInjectPos;

  void main() {
    float i = gl_FragCoord.x;
    vec2 uv = gl_FragCoord.xy / vec2(uNumPoints, uTrailHeight);
    if (i >= uInjectIndex && i < uInjectIndex + 1.0) {
      gl_FragColor = vec4(uInjectPos, 1.0);
    } else {
      gl_FragColor = texture2D(uTrail, uv);
    }
  }
`;

const trailFragmentShader = `
  uniform sampler2D uState;
  uniform sampler2D uTrail;
  uniform float uNumPoints;
  uniform float uTrailHeight;

  void main() {
    float i = gl_FragCoord.x;
    float j = gl_FragCoord.y;
    float uStateSample = i / uNumPoints;
    float uCoord = i / uNumPoints;
    float vCoord = (j + 1.0) / uTrailHeight;
    if (j >= uTrailHeight - 1.0) {
      gl_FragColor = texture2D(uState, vec2(uStateSample, 0.5));
    } else {
      gl_FragColor = texture2D(uTrail, vec2(uCoord, vCoord));
    }
  }
`;

// Shader: draw lines by sampling trail texture
const lineVertexShader = `
  uniform sampler2D uTrail;
  uniform float uNumPoints;
  uniform float uTrailHeight;

  attribute float aPointIndex;
  attribute float aSegmentIndex;

  void main() {
    float u = (aPointIndex + 0.5) / uNumPoints;
    float v = (aSegmentIndex + 0.5) / uTrailHeight;
    vec3 pos = texture2D(uTrail, vec2(u, v)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const lineFragmentShader = `
  uniform float uHue;
  uniform float uLightness;
  uniform float uAlpha;

  vec3 hsl2rgb(float h, float s, float l) {
    vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
  }

  void main() {
    float l = uLightness;
    vec3 rgb = hsl2rgb(uHue, 1.0, l);
    gl_FragColor = vec4(rgb, uAlpha);
  }
`;

function createInitialPositions(numPoints) {
  const size = numPoints * 4;
  const data = new Float32Array(size);
  const s = 20;
  for (let i = 0; i < numPoints; i++) {
    const r = () => (Math.random() * 2 - 1) * s;
    data[i * 4] = r();
    data[i * 4 + 1] = r();
    data[i * 4 + 2] = r();
    data[i * 4 + 3] = 1;
  }
  return data;
}

function createStateTexture(initialPositions, numPoints) {
  const data = new Float32Array(initialPositions);
  const tex = new THREE.DataTexture(data, numPoints, 1, THREE.RGBAFormat);
  tex.type = THREE.FloatType;
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

function createTrailTexture(initialPositions, numPoints, trailHeight) {
  const size = numPoints * trailHeight * 4;
  const data = new Float32Array(size);
  for (let i = 0; i < numPoints; i++) {
    const x = initialPositions[i * 4];
    const y = initialPositions[i * 4 + 1];
    const z = initialPositions[i * 4 + 2];
    for (let j = 0; j < trailHeight; j++) {
      const idx = (j * numPoints + i) * 4;
      data[idx] = x;
      data[idx + 1] = y;
      data[idx + 2] = z;
      data[idx + 3] = 1;
    }
  }
  const tex = new THREE.DataTexture(data, numPoints, trailHeight, THREE.RGBAFormat);
  tex.type = THREE.FloatType;
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

export default function LorenzSketch({ onLog }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const containerRef = useRef(null);
  const stateRef = useRef({
    renderer: null,
    camera: null,
    lineScene: null,
    lorenzTargetA: null,
    lorenzTargetB: null,
    trailTargetA: null,
    trailTargetB: null,
    mouseRotation: { x: 0, y: 0 },
    mouseVelocity: { x: 0, y: 0 },
    frameCount: 0,
    animationId: null,
    lastFrameTime: 0,
  });

  useEffect(() => {
    if (typeof document === "undefined" || !containerRef.current) return;

    const container = containerRef.current;
    stateRef.current.onLog = onLog;
    let renderer;
    try {
      const numPoints = NUM_POINTS;
      const trailHeight = TAIL_SIZE + 1;

      const width = containerRef.current.offsetWidth || window.innerWidth;
      const height = containerRef.current.offsetHeight || window.innerHeight;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      // Clamp pixel ratio to 1 to reduce GPU load on weaker machines
      renderer.setPixelRatio(1);
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      container.appendChild(renderer.domElement);

      const aspect = height > 0 ? width / height : 16 / 9;
      const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
      camera.position.z = 70;

      const lineScene = new THREE.Scene();

      // Initialize state and trail from the same positions so early frames don't connect unrelated history
      const initialPositions = createInitialPositions(numPoints);
      const stateTexA = createStateTexture(initialPositions, numPoints);
      const lorenzTargetA = new THREE.WebGLRenderTarget(numPoints, 1, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      });
      const lorenzTargetB = new THREE.WebGLRenderTarget(numPoints, 1, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      });

      const trailTexA = createTrailTexture(initialPositions, numPoints, trailHeight);
      const trailTargetA = new THREE.WebGLRenderTarget(numPoints, trailHeight, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      });
      const trailTargetB = new THREE.WebGLRenderTarget(numPoints, trailHeight, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      });

    // Orthographic camera for fullscreen quads (simulation passes)
    const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const copyMaterial = new THREE.ShaderMaterial({
        vertexShader: trailVertexShader,
        fragmentShader: copyFragmentShader,
        uniforms: {
          uSource: { value: null },
          uSize: { value: new THREE.Vector2(1, 1) },
        },
      });
      const copyQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), copyMaterial);
      copyQuad.frustumCulled = false;
      const copyScene = new THREE.Scene();
      copyScene.add(copyQuad);

      // Seed the ping-pong render targets from the initial textures so all reads
      // come from the same texture type/path from the first visible frame on.
      copyMaterial.uniforms.uSource.value = stateTexA;
      copyMaterial.uniforms.uSize.value.set(numPoints, 1);
      renderer.setRenderTarget(lorenzTargetA);
      renderer.render(copyScene, orthoCamera);

      copyMaterial.uniforms.uSource.value = trailTexA;
      copyMaterial.uniforms.uSize.value.set(numPoints, trailHeight);
      renderer.setRenderTarget(trailTargetA);
      renderer.render(copyScene, orthoCamera);
      renderer.setRenderTarget(null);

    // Lorenz step quad (covers numPoints×1)
    const lorenzMaterial = new THREE.ShaderMaterial({
      vertexShader: lorenzVertexShader,
      fragmentShader: lorenzFragmentShader,
      uniforms: {
        uState: { value: stateTexA },
        uSigma: { value: SIGMA },
        uRho: { value: RHO },
        uBeta: { value: BETA },
        uDt: { value: STEP_SPEED * CALC_ITERATIONS },
        uSteps: { value: CALC_ITERATIONS },
        uNumPoints: { value: numPoints },
      },
    });
    const lorenzQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      lorenzMaterial
    );
    lorenzQuad.frustumCulled = false;
    const lorenzScene = new THREE.Scene();
    lorenzScene.add(lorenzQuad);

    // Trail update quad (covers numPoints × trailHeight)
    const trailMaterial = new THREE.ShaderMaterial({
      vertexShader: trailVertexShader,
      fragmentShader: trailFragmentShader,
      uniforms: {
        uState: { value: null },
        uTrail: { value: trailTexA },
        uNumPoints: { value: numPoints },
        uTrailHeight: { value: trailHeight },
      },
    });
    const trailQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      trailMaterial
    );
    trailQuad.frustumCulled = false;
    const trailScene = new THREE.Scene();
    trailScene.add(trailQuad);

    const injectMaterial = new THREE.ShaderMaterial({
      vertexShader: injectVertexShader,
      fragmentShader: injectFragmentShader,
      uniforms: {
        uState: { value: null },
        uNumPoints: { value: numPoints },
        uInjectIndex: { value: 0 },
        uInjectPos: { value: new THREE.Vector3(0, 0, 0) },
      },
    });
    const injectQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), injectMaterial);
    injectQuad.frustumCulled = false;
    const injectScene = new THREE.Scene();
    injectScene.add(injectQuad);

    const resetTrailMaterial = new THREE.ShaderMaterial({
      vertexShader: trailVertexShader,
      fragmentShader: resetTrailFragmentShader,
      uniforms: {
        uTrail: { value: trailTexA },
        uNumPoints: { value: numPoints },
        uTrailHeight: { value: trailHeight },
        uInjectIndex: { value: 0 },
        uInjectPos: { value: new THREE.Vector3(0, 0, 0) },
      },
    });
    const resetTrailQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      resetTrailMaterial
    );
    resetTrailQuad.frustumCulled = false;
    const resetTrailScene = new THREE.Scene();
    resetTrailScene.add(resetTrailQuad);

    // One Line (LINE_STRIP) per trail so no segment can ever connect two trails
    const lineMaterial = new THREE.ShaderMaterial({
      vertexShader: lineVertexShader,
      fragmentShader: lineFragmentShader,
      uniforms: {
        uTrail: { value: trailTexA },
        uNumPoints: { value: numPoints },
        uTrailHeight: { value: trailHeight },
        uHue: { value: 0.06 },
        uLightness: { value: 0.5 },
        uAlpha: { value: 0.9 },
      },
      transparent: true,
      depthWrite: false,
      blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    if (lineMaterial.linewidth !== undefined) lineMaterial.linewidth = 1;

    const lineGroup = new THREE.Group();
    const trailLines = [];
    const trailAges = new Uint16Array(numPoints);
    trailAges.fill(1);
    const vertsPerTrail = TAIL_SIZE + 1; // head to tail
    for (let k = 0; k < numPoints; k++) {
      const pointIndices = new Float32Array(vertsPerTrail);
      const segmentIndices = new Float32Array(vertsPerTrail);
      for (let j = 0; j <= TAIL_SIZE; j++) {
        pointIndices[j] = k;
        segmentIndices[j] = TAIL_SIZE - j; // head (TAIL_SIZE) first, then tail (0)
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertsPerTrail * 3), 3));
      geom.setAttribute("aPointIndex", new THREE.BufferAttribute(pointIndices, 1));
      geom.setAttribute("aSegmentIndex", new THREE.BufferAttribute(segmentIndices, 1));
      geom.setDrawRange(0, 0);
      const line = new THREE.Line(geom, lineMaterial);
      line.frustumCulled = false;
      lineGroup.add(line);
      trailLines.push(line);
    }
    lineScene.add(lineGroup);

    stateRef.current = {
      renderer,
      camera,
      lineScene,
      lorenzTargetA,
      lorenzTargetB,
      trailTargetA,
      trailTargetB,
      lorenzMaterial,
      lorenzScene,
      trailMaterial,
      trailScene,
      resetTrailMaterial,
      resetTrailScene,
      injectMaterial,
      injectScene,
      lineGroup,
      lineMaterial,
      orthoCamera,
      numPoints,
      trailHeight,
      mouseRotation: { x: 0, y: 0 },
      mouseVelocity: { x: 0, y: 0 },
      mouseDeltaX: 0,
      mouseDeltaY: 0,
      frameCount: 0,
      animationId: null,
      lastMouseActivity: 0,
      onLog,
    };

    onLog?.(
      `Initial parameters numPoints = ${numPoints}, tailSize = ${TAIL_SIZE}, σ = ${SIGMA}, ρ = ${RHO}, β = ${BETA.toFixed(3)}`,
      "INIT"
    );

    let stateRead = lorenzTargetA.texture;
    let stateWrite = lorenzTargetB;
    let trailRead = trailTargetA.texture;
    let trailWrite = trailTargetB;

    const onResize = () => {
      const s = stateRef.current;
      if (!s.renderer) return;
      const w = containerRef.current?.offsetWidth || window.innerWidth;
      const h = containerRef.current?.offsetHeight || window.innerHeight;
      s.renderer.setSize(w, h);
      s.camera.aspect = w / h;
      s.camera.updateProjectionMatrix();
      s.onLog?.(`Canvas resized to ${w}x${h}px, aspect ratio = ${(w / h).toFixed(3)}`, "CANVAS");
    };

    const onMouseMove = (e) => {
      const s = stateRef.current;
      if (!s) return;
      const deltaX = e.movementX || 0;
      const deltaY = e.movementY || 0;
      const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      // Accumulate deltas; applied once per frame in animate() to match P5 (one update per frame)
      s.mouseDeltaX += deltaX;
      s.mouseDeltaY += deltaY;
      if (magnitude > 0.5 && s.frameCount - s.lastMouseActivity > 30) {
        const rotMag = Math.sqrt(s.mouseRotation.x ** 2 + s.mouseRotation.y ** 2);
        s.onLog?.(`Cursor Δ=${magnitude.toFixed(1)}px, camera rotation=${rotMag.toFixed(3)}`, "MOUSE");
        s.lastMouseActivity = s.frameCount;
      }
    };

    const targetFrameMs = 1000 / 30; // 30 FPS cap

    function animate(now) {
      const s = stateRef.current;
      if (!s.renderer || !s.lineScene) return;

      // Frame pacing: only run the heavy simulation/render logic ~30 times per second.
      if (typeof now === "number") {
        if (!s.lastFrameTime) {
          s.lastFrameTime = now;
        }
        const delta = now - s.lastFrameTime;
        if (delta < targetFrameMs) {
          s.animationId = requestAnimationFrame(animate);
          return;
        }
        s.lastFrameTime = now;
      }
      try {
        s.frameCount++;
        const time = s.frameCount * 0.001;

        for (let step = 0; step < CALC_ITERATIONS; step++) {
          s.lorenzMaterial.uniforms.uState.value = stateRead;
          s.renderer.setRenderTarget(stateWrite);
          s.renderer.render(s.lorenzScene, s.orthoCamera);
          stateRead = stateWrite.texture;
          stateWrite = stateWrite === s.lorenzTargetA ? s.lorenzTargetB : s.lorenzTargetA;
        }

        // Replace one point with random position periodically (like original)
        if (s.frameCount >= INJECT_START_FRAME && s.frameCount % INJECT_INTERVAL === 0) {
          const injectIndex = Math.floor(s.frameCount / INJECT_INTERVAL) % s.numPoints;
          const r = () => (Math.random() * 2 - 1) * 100;
          const injectPos = new THREE.Vector3(r(), r(), r());
          s.onLog?.(
            `Replacing oldest point with new one at (${injectPos.x.toFixed(2)}, ${injectPos.y.toFixed(2)}, ${injectPos.z.toFixed(2)})`,
            "POINTS"
          );
          s.injectMaterial.uniforms.uState.value = stateRead;
          s.injectMaterial.uniforms.uInjectIndex.value = injectIndex;
          s.injectMaterial.uniforms.uInjectPos.value.copy(injectPos);
          s.renderer.setRenderTarget(stateWrite);
          s.renderer.render(s.injectScene, s.orthoCamera);
          stateRead = stateWrite.texture;
          stateWrite = stateWrite === s.lorenzTargetA ? s.lorenzTargetB : s.lorenzTargetA;

          // Match the original P5 behavior: when a point is replaced,
          // its entire trail history is reset to the new position.
          s.resetTrailMaterial.uniforms.uTrail.value = trailRead;
          s.resetTrailMaterial.uniforms.uInjectIndex.value = injectIndex;
          s.resetTrailMaterial.uniforms.uInjectPos.value.copy(injectPos);
          s.renderer.setRenderTarget(trailWrite);
          s.renderer.render(s.resetTrailScene, s.orthoCamera);
          trailRead = trailWrite.texture;
          trailWrite = trailWrite === s.trailTargetA ? s.trailTargetB : s.trailTargetA;
          trailAges[injectIndex] = 1;
          trailLines[injectIndex].geometry.setDrawRange(0, 0);
        }

        // Trail update (state -> trail)
        s.trailMaterial.uniforms.uState.value = stateRead;
        s.trailMaterial.uniforms.uTrail.value = trailRead;
        s.renderer.setRenderTarget(trailWrite);
        s.renderer.render(s.trailScene, s.orthoCamera);
        trailRead = trailWrite.texture;
        trailWrite = trailWrite === s.trailTargetA ? s.trailTargetB : s.trailTargetA;

        // Match original P5 behavior: trails grow one vertex at a time until they reach full length.
        for (let i = 0; i < s.numPoints; i++) {
          trailAges[i] = Math.min(trailAges[i] + 1, s.trailHeight);
          trailLines[i].geometry.setDrawRange(
            0,
            trailAges[i] >= 2 ? trailAges[i] : 0
          );
        }

        // Apply accumulated mouse deltas once per frame (like P5 draw()) to avoid drift
        const mouseScale = 0.02 / 1000;
        s.mouseRotation.x += s.mouseDeltaX * mouseScale; // horizontal -> orbit (lineGroup.rotation.y)
        s.mouseRotation.y += s.mouseDeltaY * mouseScale;  // vertical -> tilt (lineGroup.rotation.x)
        s.mouseDeltaX = 0;
        s.mouseDeltaY = 0;
        // Gentle decay so view returns toward auto-orbit when mouse stops
        s.mouseRotation.x *= 0.998;
        s.mouseRotation.y *= 0.998;

        // Main view: rotate and draw lines
        s.lineMaterial.uniforms.uTrail.value = trailRead;
        s.lineGroup.rotation.order = "YXZ";
        const t = time * ROTATION_SPEED;
        s.lineGroup.rotation.y = t / 2 - Math.PI / 10;
        s.lineGroup.rotation.x = t;
        s.lineGroup.rotation.x -= s.mouseRotation.y;
        s.lineGroup.rotation.y -= s.mouseRotation.x;
        s.lineGroup.position.set(10, 0, -20);

        s.renderer.setRenderTarget(null);
        const w = containerRef.current?.offsetWidth || window.innerWidth;
        const h = containerRef.current?.offsetHeight || window.innerHeight;
        if (w > 0 && h > 0 && (s.renderer.domElement.width !== w || s.renderer.domElement.height !== h)) {
          s.renderer.setSize(w, h);
          s.camera.aspect = w / h;
          s.camera.updateProjectionMatrix();
        }
        s.renderer.setClearColor(0x000000, 0);
        s.renderer.clear();
        s.renderer.render(s.lineScene, s.camera);
      } catch (err) {
        console.error("LorenzSketch animate error:", err);
        return;
      }
      s.animationId = requestAnimationFrame(animate);
    }

    stateRef.current.lastFrameTime = 0;
    stateRef.current.animationId = requestAnimationFrame(animate);

    const resizeTimeout = setTimeout(onResize, 0);
    window.addEventListener("resize", onResize);
    // Listen on window so we get mouse events even though the Lorenz container is at z-index -1 (behind content)
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (stateRef.current.animationId != null) {
        cancelAnimationFrame(stateRef.current.animationId);
      }
      stateRef.current.renderer?.dispose();
      stateRef.current.lorenzTargetA?.dispose();
      stateRef.current.lorenzTargetB?.dispose();
      stateRef.current.trailTargetA?.dispose();
      stateRef.current.trailTargetB?.dispose();
      if (stateRef.current.lineGroup) {
        stateRef.current.lineGroup.children.forEach((child) => child.geometry?.dispose());
      }
      stateRef.current.lineMaterial?.dispose();
      stateRef.current.lorenzMaterial?.dispose();
      stateRef.current.trailMaterial?.dispose();
      stateRef.current.resetTrailMaterial?.dispose();
      stateRef.current.injectMaterial?.dispose();
      copyMaterial.dispose();
      copyQuad.geometry.dispose();
      if (container?.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
    } catch (err) {
      console.error("LorenzSketch setup error:", err);
      return () => {};
    }
  }, [isDarkMode, onLog]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setIsDarkMode(document.body.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains("dark"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const s = stateRef.current;
    if (!s?.lineMaterial) return;
    const hue = isDarkMode ? 20 / 360 : 40 / 360; // orange in both modes
    const lightness = isDarkMode ? 0.1 : 0.55; // dark orange glow on dark bg, visible orange on light bg
    const alpha = isDarkMode ? 0.3 : 0.1; // dark: solid for strong glow; light: transparent so overlaps accumulate
    s.lineMaterial.uniforms.uHue.value = hue;
    s.lineMaterial.uniforms.uLightness.value = lightness;
    s.lineMaterial.uniforms.uAlpha.value = alpha;
    s.lineMaterial.blending = isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending;
    s.lineMaterial.needsUpdate = true;
  }, [isDarkMode]);

  return (
    <div
      id="lorenz-container"
      ref={containerRef}
    />
  );
}
