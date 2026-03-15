import React, { useState, useEffect, useCallback } from "react";

const SHOW_CONSOLE_LOG = true;

function createLogEntry(message, category = "INFO") {
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 2,
  });
  return {
    message,
    category,
    timestamp,
    id: Date.now() + Math.random(),
  };
}

/**
 * Lazy loader for LorenzSketch (Three.js / GPU shader attractor).
 * Uses dynamic import to avoid loading Three.js during SSR/build.
 * Recovers the matrix-style console overlay from the original P5 sketch.
 */
export default function LorenzSketchLoader() {
  const [SketchComponent, setSketchComponent] = useState(null);
  const [consoleLogs, setConsoleLogs] = useState([]);

  const addLog = useCallback((message, category = "INFO") => {
    const newLog = createLogEntry(message, category);
    setConsoleLogs((prevLogs) => {
      const updatedLogs = [...prevLogs, newLog];
      return updatedLogs.length > 25 ? updatedLogs.slice(-25) : updatedLogs;
    });
  }, []);

  useEffect(() => {
    import("./LorenzSketch.js")
      .then((module) => {
        setSketchComponent(() => module.default);
      })
      .catch((err) => {
        console.error("Failed to load Lorenz sketch:", err);
      });
  }, []);

  // Inject console logs into placeholder (same as original P5 sketch)
  useEffect(() => {
    const placeholder = document.getElementById("consoleLogOverlayPlaceholder");
    if (!placeholder) return;
    if (consoleLogs.length === 0) {
      placeholder.innerHTML = "";
    } else {
      placeholder.innerHTML = consoleLogs
        .map(
          (log) =>
            `<div style="white-space: nowrap;"><span class="o-50">[${log.timestamp}]</span> <span class="">${log.message}</span></div>`
        )
        .join("");
    }
  }, [consoleLogs]);

  if (!SketchComponent) {
    return null;
  }

  const logFunction = SHOW_CONSOLE_LOG ? addLog : () => {};
  return <SketchComponent onLog={logFunction} />;
}
