import React, { useState, useEffect, useRef, useCallback } from "react";
import Sketch from "react-p5";

// Mathematical constants for attractors
const ATTRACTORS = [
  { o: 10, p: 28, b: 8.0 / 3.0 }, // Lorenz
];

// Performance monitoring and dynamic calibration
const TARGET_FPS = 30;
const MIN_FPS = 24;
const FPS_SAMPLES = 30;
const SHOW_CONSOLE_LOG = true; // Matrix-style console overlay

// Dynamic parameters with ranges
const PARAMS = {
  NUM_POINTS: { min: 50, max: 300, default: 150 },
  TAIL_SIZE: { min: 20, max: 500, default: 200 },
  CALC_ITERATIONS: { min: 15, max: 15, default: 15 }, // smoothness <> speed tradeoff
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
    this.hasLoggedLowFPS = false;
    this.hasLoggedGoodFPS = false;
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

  adjustParameters(logFunction = null) {
    // Only adjust every 60 frames to avoid constant changes
    if (this.adjustmentCooldown > 0) {
      this.adjustmentCooldown--;
      return false;
    }

    const fpsRatio = this.currentFPS / TARGET_FPS;
    const adjustmentSpeed = PARAMS.ADJUSTMENT_SPEED;
    let adjusted = false;
    const oldNumPoints = numPoints;
    const oldTailSize = tailSize;
    const oldCalcIterations = calcIterations;

    if (this.currentFPS < MIN_FPS) {
      // Log performance warning only once
      if (!this.hasLoggedLowFPS && logFunction) {
        logFunction(`Performance warning: FPS dropped below ${MIN_FPS}`, 'PERF');
        this.hasLoggedLowFPS = true;
        this.hasLoggedGoodFPS = false; // Reset good FPS flag
      }
      
      // Performance is poor, reduce complexity
      numPoints = Math.max(
        PARAMS.NUM_POINTS.min,
        numPoints - Math.round((MIN_FPS - this.currentFPS) * adjustmentSpeed * 10)
      );
      tailSize = Math.max(
        PARAMS.TAIL_SIZE.min,
        tailSize - Math.round((MIN_FPS - this.currentFPS) * adjustmentSpeed * 5)
      );
      // calcIterations = Math.max(
      //   PARAMS.CALC_ITERATIONS.min,
      //   calcIterations - Math.round((MIN_FPS - this.currentFPS) * adjustmentSpeed * 2)
      // );
      this.adjustmentCooldown = 60;
      adjusted = true;
      
      if (logFunction) {
        let message = `Warning: low FPS (${this.currentFPS.toFixed(1)}), reducing complexity `;
        if (numPoints !== oldNumPoints) message += `(numPoints ${oldNumPoints}→${numPoints}) `;
        if (tailSize !== oldTailSize) message += `(tailSize ${oldTailSize}→${tailSize}) `;
        if (calcIterations !== oldCalcIterations) message += `(calcIterations ${oldCalcIterations}→${calcIterations}) `;
        logFunction(message, 'PERF');
      }
    } else if (this.currentFPS > TARGET_FPS * 1.1 && fpsRatio > 1.1) {
      // Log performance optimal only once
      if (!this.hasLoggedGoodFPS && logFunction) {
        logFunction(`Performance optimal: FPS above ${(TARGET_FPS * 1.1).toFixed(1)}`, 'PERF');
        this.hasLoggedGoodFPS = true;
        this.hasLoggedLowFPS = false; // Reset low FPS flag
      }
      
      // Performance is good, we can increase complexity
      numPoints = Math.min(
        PARAMS.NUM_POINTS.max,
        numPoints + Math.round((this.currentFPS - TARGET_FPS) * adjustmentSpeed * 2)
      );
      tailSize = Math.min(
        PARAMS.TAIL_SIZE.max,
        tailSize + Math.round((this.currentFPS - TARGET_FPS) * adjustmentSpeed)
      );
      // calcIterations = Math.min(
      //   PARAMS.CALC_ITERATIONS.max,
      //   calcIterations + Math.round((this.currentFPS - TARGET_FPS) * adjustmentSpeed * 0.5)
      // );
      this.adjustmentCooldown = 60;
      adjusted = true;
      
      if (logFunction) {
        let message = `Good FPS (${this.currentFPS.toFixed(1)}), increasing complexity `;
        if (numPoints !== oldNumPoints) message += `(numPoints ${oldNumPoints}→${numPoints}) `;
        if (tailSize !== oldTailSize) message += `(tailSize ${oldTailSize}→${tailSize}) `;
        if (calcIterations !== oldCalcIterations) message += `(calcIterations ${oldCalcIterations}→${calcIterations}) `;
        logFunction(message, 'PERF');
      }
    }
    
    return adjusted;
  }

  getCurrentFPS() {
    return this.currentFPS;
  }
}

// Helper function to create a log entry
function createLogEntry(message, category = 'INFO') {
  const timestamp = new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    fractionalSecondDigits: 2
  });
  
  return {
    message,
    category,
    timestamp,
    id: Date.now() + Math.random()
  };
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
  const [consoleLogs, setConsoleLogs] = useState([]);
  
  // Log function that adds entries to React state
  const addLog = useCallback((message, category = 'INFO') => {
    const newLog = createLogEntry(message, category);
    setConsoleLogs(prevLogs => {
      const updatedLogs = [...prevLogs, newLog];
      // Keep only the last 25 logs
      return updatedLogs.length > 25 ? updatedLogs.slice(-25) : updatedLogs;
    });
  }, []);

  // Create log function - either real logging or no-op
  const logFunction = SHOW_CONSOLE_LOG ? addLog : () => {};
  
  // Use refs to persist sketch state across renders
  const sketchState = useRef({
    points: [],
    colorSeed: 0,
    stepSpeed: 0.0002,
    currentFrameNbr: 0,
    mouseRotation: null,
    mouseVelocity: null,
    fpsMonitor: null,
    lastMouseActivity: 0,
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

  // Inject console logs into placeholder div
  useEffect(() => {
    const placeholder = document.getElementById('consoleLogOverlayPlaceholder');
    if (placeholder && consoleLogs.length > 0) {
      placeholder.innerHTML = consoleLogs.map((log, index) => {
        return `
          <div style="white-space: nowrap;">
            <span class="o-50">[${log.timestamp}]</span> <span class="">${log.message}</span>
          </div>
        `;
      }).join('');
    }
  }, [consoleLogs]);

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

    // 1-second delay before initialization
    setTimeout(() => {
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
      logFunction(`Initializing Lorenz Attractor: σ = ${ATTRACTORS[0].o}, ρ = ${ATTRACTORS[0].p}, β = ${ATTRACTORS[0].b.toFixed(3)}`, 'INIT');
      logFunction(`Initial parameters numPoints = ${numPoints}, tailSize = ${tailSize}, calcIterations = ${calcIterations}`, 'INIT');
      logFunction(`Canvas size = ${p5.windowWidth}x${p5.windowHeight}px`, 'INIT');
      logFunction(`Initialized ${numPoints} attractor points`, 'INIT');
    }, 1000);
  };

  const draw = (p5) => {
    const state = sketchState.current;
    const backgroundColor = isDarkMode ? "#1c2222" : 255;
    const strokeHue = isDarkMode ? 20 : 220;
    const strokeLightness = isDarkMode ? 10 : 20;

    state.currentFrameNbr++;

    // Don't draw anything until points are initialized
    if (!state.points || state.points.length === 0) {
      p5.background(backgroundColor);
      return;
    }

    // Adjust points array size based on current numPoints
    const currentNumPoints = state.points.length;
    if (currentNumPoints > numPoints) {
      // Remove excess points
      const removed = currentNumPoints - numPoints;
      state.points.splice(numPoints);
      logFunction(`Removing ${removed} excess points (total: ${numPoints})`, 'POINTS');
    } else if (currentNumPoints < numPoints) {
      // Add new points
      const added = numPoints - currentNumPoints;
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
      logFunction(`Adding ${added} new points (total: ${numPoints})`, 'POINTS');
    }


    if (state.currentFrameNbr > 150) {
      // Update FPS monitoring
      state.fpsMonitor.update(p5.millis());
      state.fpsMonitor.adjustParameters(logFunction);
    }
 
    // Waits for attractor to stabilize and then replaces the oldest point with a new one every few frames
    if (state.currentFrameNbr > 300 && state.currentFrameNbr % 60 === 0) {
      state.points.shift();
      const x = p5.random(100, -100);
      const y = p5.random(100, -100);
      const z = p5.random(100, -100);
      state.points.push(
        new AttractorPoint(
          p5,
          x,
          y,
          z,
          strokeHue,
          0
        )
      );
      logFunction(`Replacing oldest point with new one at (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`, 'POINTS');
    }

    p5.rotateY(state.currentFrameNbr / 2000 - p5.PI / 10);
    p5.rotateX(state.currentFrameNbr / 1000);
    p5.background(backgroundColor);
    p5.blendMode(isDarkMode ? p5.ADD : p5.SUBTRACT);

    p5.push();
    p5.translate(0, 0, -100);
    p5.pop();

    // Mouse control
    if (p5.mouseX !== p5.pmouseX || p5.mouseY !== p5.pmouseY) {
      const deltaX = p5.mouseX - p5.pmouseX;
      const deltaY = p5.mouseY - p5.pmouseY;
      const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      state.mouseVelocity.add(
        deltaX / 1000,
        (p5.pmouseY - p5.mouseY) / 1000
      );
      state.mouseVelocity.mult(0.02);
      state.mouseRotation.add(state.mouseVelocity);
      
      if (magnitude > 0.5) { 
        const now = state.currentFrameNbr;
        if (now - state.lastMouseActivity > 30) { 
          logFunction(`Cursor Δ=${magnitude.toFixed(1)}px, camera rotation=${state.mouseRotation.mag().toFixed(3)}`, 'MOUSE');
          state.lastMouseActivity = now;
        }
      }
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

  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    // Update perspective projection to maintain correct aspect ratio
    p5.perspective(p5.PI / 4, p5.width / p5.height, 1, 1000);
    logFunction(`Canvas resized to ${p5.windowWidth}x${p5.windowHeight}px, aspect ratio = ${(p5.width / p5.height).toFixed(3)}`, 'CANVAS');
  };

  return (
    <div id="p5-container">
      <Sketch setup={setup} draw={draw} windowResized={windowResized} />
    </div>
  );
}
