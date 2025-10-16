import React, { useState, useEffect, useRef } from "react";
import Sketch from "react-p5";

// Mathematical constants for attractors
const ATTRACTORS = [
  { o: 10, p: 28, b: 8.0 / 3.0 }, // Lorenz
];

const NUM_POINTS = 200;
const TAIL_SIZE = 300;

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
    if (this.prev.length > TAIL_SIZE) this.prev.shift();

    // Lightness based on the length of the trail for a fade in effect
    p5.stroke(strokeHue, 120, strokeLightness * (this.prev.length / TAIL_SIZE));

    p5.beginShape();
    p5.vertex(...this.prev[this.prev.length - 1]);
    let R = 1;
    for (let i = this.prev.length - 2; i >= 0; i -= R) {
      let v1 = this.prev[i];
      let v2 = this.prev[i + 1];
      let G = Math.sqrt(
        (v1[0] - v2[0]) ** 2 + (v1[1] - v2[1]) ** 2 + (v1[2] - v2[2]) ** 2
      );
      R = p5.constrain(Math.round(5 / (G + 1)), 1, TAIL_SIZE / 2);
      p5.vertex(...v1);
    }
    p5.vertex(...this.prev[0]);
    p5.endShape();
  }
}

export default function P5SketchLoader() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Use refs to persist sketch state across renders
  const sketchState = useRef({
    points: [],
    colorSeed: 0,
    stepSpeed: 0.0002,
    currentTime: 0,
    mouseRotation: null,
    mouseVelocity: null,
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

  const setup = (p5, canvasParentRef) => {
    const state = sketchState.current;
    state.mouseRotation = p5.createVector(0, 0);
    state.mouseVelocity = p5.createVector(0, 0);

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
    for (let i = 0; i < NUM_POINTS; i++) {
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

    state.currentTime++;

    if (state.currentTime % 30 === 0) {
      // Add random point
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
      for (let i = 0; i < 10; i++) pt.calculate(state.stepSpeed);
      pt.draw(strokeHue, strokeLightness);
    }
    p5.pop();
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
    </div>
  );
}
