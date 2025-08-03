import React, { useEffect } from "react";

export default function P5SketchLoader() {
  useEffect(() => {
    let p5Script;

    // Only add p5.js if not already loaded
    if (!document.querySelector('script[src*="p5.min.js"]')) {
      p5Script = document.createElement("script");
      p5Script.src = "https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.min.js";
      p5Script.async = true;
      document.body.appendChild(p5Script);
    }

    p5Script.onload = () => {
      let sketchScript;

      // Only add lorenz.js if not already loaded
      if (!document.querySelector('script[src*="lorenz.js"]')) {
        sketchScript = document.createElement("script");
        sketchScript.src = "/lorenz.js";
        sketchScript.onload = () => {
          const isDark = document.body.classList.contains("dark");
          if (window.setLorenzDarkMode) {
            window.setLorenzDarkMode(isDark);
          }

          const observer = new MutationObserver(() => {
            const isDark = document.body.classList.contains("dark");
            if (window.setLorenzDarkMode) {
              window.setLorenzDarkMode(isDark);
            }
          });
          observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

        }
        document.body.appendChild(sketchScript);
      }
    };

    return () => {
      if (p5Script.parentNode) p5Script.parentNode.removeChild(p5Script);
    };
  }, []);

  return <div id="p5-container"></div>;
}
