import React, { useState, useEffect, useRef } from "react";
import Sketch from "react-p5";

// Mathematical constants for attractors
const ATTRACTORS = [
  { o: 10, p: 28, b: 8.0 / 3.0 }, // Lorenz
];

// Performance monitoring and dynamic calibration
const TARGET_FPS = 30;
const MIN_FPS = 24;
const FPS_SAMPLES = 30;
const SHOW_FPS_DEBUG = false;

// Dynamic parameters with ranges
const PARAMS = {
  NUM_POINTS: { min: 50, max: 300, default: 150 },
  TAIL_SIZE: { min: 20, max: 500, default: 200 },
  CALC_ITERATIONS: { min: 10, max: 20, default: 15 },
  ADJUSTMENT_SPEED: 0.5, // How quickly to adjust parameters (0-1)
};

// Initialize with default values
let numPoints = PARAMS.NUM_POINTS.default;
let tailSize = PARAMS.TAIL_SIZE.default;
let calcIterations = PARAMS.CALC_ITERATIONS.default;

/**
 * FPS Monitor class for tracking performance and adjusting parameters
 */
class FPSMonitor {
  constructor() {
    this.frameTimes = [];
    this.lastTime = 0;
    this.currentFPS = TARGET_FPS;
    this.adjustmentCooldown = 0;
    this.lastAdjustment = 0;
  }

  update(currentTime) {
    if (this.lastTime === 0) {
      this.lastTime = currentTime;
      return;
    }

    const deltaTime = currentTime - this.lastTime;
    this.frameTimes.push(deltaTime);
    
    if (this.frameTimes.length > FPS_SAMPLES) {
      this.frameTimes.shift();
    }

    // Calculate average FPS
    if (this.frameTimes.length >= 10) {
      const avgFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
      this.currentFPS = 1000 / avgFrameTime;
    }

    this.lastTime = currentTime;
  }

  adjustParameters() {
    // Only adjust every 60 frames to avoid constant changes
    if (this.adjustmentCooldown > 0) {
      this.adjustmentCooldown--;
      return;
    }

    const fpsRatio = this.currentFPS / TARGET_FPS;
    const adjustmentSpeed = PARAMS.ADJUSTMENT_SPEED;

    if (this.currentFPS < MIN_FPS) {
      // Performance is poor, reduce complexity
      numPoints = Math.max(
        PARAMS.NUM_POINTS.min,
        numPoints - Math.round((MIN_FPS - this.currentFPS) * adjustmentSpeed * 10)
      );
      tailSize = Math.max(
        PARAMS.TAIL_SIZE.min,
        tailSize - Math.round((MIN_FPS - this.currentFPS) * adjustmentSpeed * 5)
      );
      calcIterations = Math.max(
        PARAMS.CALC_ITERATIONS.min,
        calcIterations - Math.round((MIN_FPS - this.currentFPS) * adjustmentSpeed * 2)
      );
      this.adjustmentCooldown = 60;
    } else if (this.currentFPS > TARGET_FPS * 1.1 && fpsRatio > 1.1) {
      // Performance is good, we can increase complexity
      numPoints = Math.min(
        PARAMS.NUM_POINTS.max,
        numPoints + Math.round((this.currentFPS - TARGET_FPS) * adjustmentSpeed * 2)
      );
      tailSize = Math.min(
        PARAMS.TAIL_SIZE.max,
        tailSize + Math.round((this.currentFPS - TARGET_FPS) * adjustmentSpeed)
      );
      calcIterations = Math.min(
        PARAMS.CALC_ITERATIONS.max,
        calcIterations + Math.round((this.currentFPS - TARGET_FPS) * adjustmentSpeed * 0.5)
      );
      this.adjustmentCooldown = 60;
    }
  }

  getCurrentFPS() {
    return this.currentFPS;
  }
}

/**
 * Class representing a chaotic attractor point and its trail.
 */
class AttractorPoint {
  constructor(p5, x, y, z, color, type) {
    this.p5 = p5;
    this.pos = p5.createVector(x, y, z);
    this.prev = [this.pos.array()];
    this.color = color;
    this.type = type;
    this.h = null;

    // Set constants for this attractor type
    const { o, p, b } = ATTRACTORS[type];
    this.o = o;
    this.p = p;
    this.b = b;
  }

  /**
   * Calculate next position based on attractor equations.
   */
  calculate(dt) {
    const p5 = this.p5;
    let { x, y, z } = this.pos;
    let next = this.pos.copy();

    switch (this.type) {
      case 0: // Lorenz
        next.set(
          x + dt * this.o * (y - x),
          y + dt * (x * (this.p - z) - y),
          z + dt * (x * y - this.b * z)
        );
        break;
      case 1: // Chen
        next.set(
          x + dt * this.o * (y - x),
          y + dt * ((this.b - this.o) * x - x * z + this.b * y),
          z + dt * (x * y - this.p * z)
        );
        break;
      case 2: // Chua
        this.h = -0.11 * p5.sin((p5.PI * x) / 2.6);
        next.set(
          x + dt * (this.o * (y - this.h)),
          y + dt * (x - y + z),
          z + dt * (-this.p * y)
        );
        break;
      case 3: // Rossler
        next.set(
          x + dt * (-y - p5.pow(this.o * z, 2)),
          y + dt * (x + this.o * y),
          z + dt * (this.p + z * (x - this.b))
        );
        break;
    }
    this.pos.set(next);
  }

  /**
   * Draw the point and its trail.
   */
  draw(strokeHue, strokeLightness) {
    const p5 = this.p5;
    this.prev.push(this.pos.array());
    if (this.prev.length > tailSize) this.prev.shift();

    // Lightness based on the length of the trail for a fade in effect
    p5.stroke(strokeHue, 120, strokeLightness * (this.prev.length / tailSize));

    p5.beginShape();
    p5.vertex(...this.prev[this.prev.length - 1]);
    let R = 1;
    for (let i = this.prev.length - 2; i >= 0; i -= R) {
      let v1 = this.prev[i];
      let v2 = this.prev[i + 1];
      let G = Math.sqrt(
        (v1[0] - v2[0]) ** 2 + (v1[1] - v2[1]) ** 2 + (v1[2] - v2[2]) ** 2
      );
      R = p5.constrain(Math.round(5 / (G + 1)), 1, tailSize / 2);
      p5.vertex(...v1);
    }
    p5.vertex(...this.prev[0]);
    p5.endShape();
  }
}

export default function P5SketchLoader() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);
  const [debugUpdateCounter, setDebugUpdateCounter] = useState(0);
  
  // Store the setter function in a ref so it's accessible in the draw function
  const setDebugUpdateCounterRef = useRef(setDebugUpdateCounter);
  setDebugUpdateCounterRef.current = setDebugUpdateCounter;
  
  // Use refs to persist sketch state across renders
  const sketchState = useRef({
    points: [],
    colorSeed: 0,
    stepSpeed: 0.0002,
    currentTime: 0,
    mouseRotation: null,
    mouseVelocity: null,
    fpsMonitor: null,
    debugInfo: null,
  });

  useEffect(() => {
    // Check initial dark mode state
    if (typeof document !== "undefined") {
      setIsDarkMode(document.body.classList.contains("dark"));

      // Watch for dark mode changes
      const observer = new MutationObserver(() => {
        setIsDarkMode(document.body.classList.contains("dark"));
      });

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }
  }, []);

  // Update debug info state when it changes
  useEffect(() => {
    if (SHOW_FPS_DEBUG && sketchState.current.debugInfo) {
      setDebugInfo(sketchState.current.debugInfo);
    }
  }, [debugUpdateCounter]);

  const setup = (p5, canvasParentRef) => {
    const state = sketchState.current;
    state.mouseRotation = p5.createVector(0, 0);
    state.mouseVelocity = p5.createVector(0, 0);
    state.fpsMonitor = new FPSMonitor();

    p5.frameRate(60);
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(
      canvasParentRef
    );
    p5.strokeWeight(1);
    p5.noFill();
    p5.perspective(p5.PI / 4, p5.width / p5.height, 1, 1000);
    p5.colorMode(p5.HSL);
    p5.camera(0, 0, 70);


    // Initialize attractor
    const type = 0; // Lorenz
    const s = 20;
    const x = 1,
      y = 1,
      z = 1;

    state.points = [];
    state.colorSeed = p5.random(0, 100);
    for (let i = 0; i < numPoints; i++) {
      state.points.push(
        new AttractorPoint(
          p5,
          p5.random(x * s, x * -s),
          p5.random(y * s, y * -s),
          p5.random(z * s, z * -s),
          p5.abs(p5.randomGaussian(state.colorSeed, 5)) % 100,
          type
        )
      );
    }
  };

  const draw = (p5) => {
    const state = sketchState.current;
    const backgroundColor = isDarkMode ? "#1c2222" : 255;
    const strokeHue = isDarkMode ? 20 : 220;
    const strokeLightness = isDarkMode ? 10 : 20;

    // Update FPS monitoring
    state.fpsMonitor.update(p5.millis());
    state.fpsMonitor.adjustParameters();

    state.currentTime++;

    // Adjust points array size based on current numPoints
    const currentNumPoints = state.points.length;
    if (currentNumPoints > numPoints) {
      // Remove excess points
      state.points.splice(numPoints);
    } else if (currentNumPoints < numPoints) {
      // Add new points
      for (let i = currentNumPoints; i < numPoints; i++) {
        state.points.push(
          new AttractorPoint(
            p5,
            p5.random(100, -100),
            p5.random(100, -100),
            p5.random(100, -100),
            strokeHue,
            0
          )
        );
      }
    }

    if (state.currentTime % 30 === 0) {
      // Add random point (replace oldest)
      state.points.shift();
      state.points.push(
        new AttractorPoint(
          p5,
          p5.random(100, -100),
          p5.random(100, -100),
          p5.random(100, -100),
          strokeHue,
          0
        )
      );
    }

    p5.rotateY(state.currentTime / 2000 - p5.PI / 10);
    p5.rotateX(state.currentTime / 1000);
    p5.background(backgroundColor);
    p5.blendMode(isDarkMode ? p5.ADD : p5.SUBTRACT);

    p5.push();
    p5.translate(0, 0, -100);
    p5.pop();

    // Mouse control
    if (p5.mouseX !== p5.pmouseX || p5.mouseY !== p5.pmouseY) {
      state.mouseVelocity.add(
        (p5.mouseX - p5.pmouseX) / 1000,
        (p5.pmouseY - p5.mouseY) / 1000
      );
      state.mouseVelocity.mult(0.02);
      state.mouseRotation.add(state.mouseVelocity);
    }
    p5.rotateX(-state.mouseRotation.y);
    p5.rotateY(-state.mouseRotation.x);

    p5.noFill();

    p5.push();
    p5.translate(10, 0, -20);
    for (let pt of state.points) {
      for (let i = 0; i < calcIterations; i++) pt.calculate(state.stepSpeed);
      pt.draw(strokeHue, strokeLightness);
    }
    p5.pop();

    // Optional FPS debug display - update HTML overlay
    if (SHOW_FPS_DEBUG) {
      // Update debug info in HTML overlay (handled in useEffect)
      state.debugInfo = {
        fps: state.fpsMonitor.getCurrentFPS().toFixed(1),
        points: numPoints,
        tail: tailSize,
        iterations: calcIterations,
        pointsDefault: PARAMS.NUM_POINTS.default,
        tailDefault: PARAMS.TAIL_SIZE.default,
        iterationsDefault: PARAMS.CALC_ITERATIONS.default,
      };
      // Trigger React re-render every 30 frames
      if (state.currentTime % 30 === 0) {
        setDebugUpdateCounterRef.current(prev => prev + 1);
      }
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <Sketch setup={setup} draw={draw} windowResized={windowResized} />
      {SHOW_FPS_DEBUG && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            color: "#ff0000",
            fontFamily: "monospace",
            fontSize: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            padding: "12px",
            borderRadius: "6px",
            zIndex: 9999,
            pointerEvents: "none",
            border: "2px solid #ff0000",
          }}
        >
          {debugInfo ? (
            <>
              <div>FPS: {debugInfo.fps}</div>
              <div>Points: {debugInfo.points} ({debugInfo.pointsDefault})</div>
              <div>Tail: {debugInfo.tail} ({debugInfo.tailDefault})</div>
              <div>Iterations: {debugInfo.iterations} ({debugInfo.iterationsDefault})</div>
              <div>Iterations: {debugInfo.iterations}</div>
            </>
          ) : (
            <div>Loading debug info...</div>
          )}
        </div>
      )}
    </div>
  );
}
