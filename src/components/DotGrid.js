import React, { useState, useEffect } from 'react';
import './DotGrid.css';

const DotGrid = ({ 
  dotSize = 1, 
  columns = 12, // Number of columns for the grid
  opacity = 0.3,
  blendMode = 'difference',
  className = ''
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check initial dark mode state and screen width
    if (typeof document !== "undefined") {
      setIsDarkMode(document.body.classList.contains("dark"));
      setScreenWidth(window.innerWidth);
      setIsReady(true);

      // Watch for dark mode changes
      const observer = new MutationObserver(() => {
        setIsDarkMode(document.body.classList.contains("dark"));
      });

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });

      // Watch for window resize
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Calculate spacing to ensure exact number of columns
  const calculateSpacing = () => {
    if (screenWidth === 0) return 32; // Default fallback
    
    // Calculate exact spacing to fit the desired number of columns
    // For N columns, we need N-1 gaps between them, plus margins
    return screenWidth / columns;
  };

  const spacing = calculateSpacing();

  // CSS custom properties with responsive spacing
  const dotGridStyles = {
    '--dot-size': `${dotSize}px`,
    '--dot-spacing': `${spacing}px`,
    '--dot-opacity': opacity,
    '--dot-blend-mode': blendMode,
    '--dot-color': isDarkMode ? 'rgba(255,255,255,0.4)' : 'white',
  };

  // Don't render until we have the correct screen width
  if (!isReady) {
    return null;
  }

  return (
    <div 
      className={`dot-grid ${className}`}
      style={dotGridStyles}
      aria-hidden="true"
    />
  );
};

export default DotGrid;
