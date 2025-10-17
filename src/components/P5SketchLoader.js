import React, { useState, useEffect } from "react";

/**
 * Lazy loader for P5sketch that completely avoids SSR
 * Uses dynamic import to prevent react-p5 from being loaded during build
 */
export default function P5SketchLoader() {
  const [P5Component, setP5Component] = useState(null);

  useEffect(() => {
    // Only import on client side
    import('./P5sketch.js')
      .then((module) => {
        setP5Component(() => module.default);
      })
      .catch((err) => {
        console.error("Failed to load P5 sketch:", err);
      });
  }, []);

  if (!P5Component) {
    return null;
  }

  return <P5Component />;
}

