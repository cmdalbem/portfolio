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

  useEffect(() => {
    // Check initial dark mode state and screen width
    if (typeof document !== "undefined") {
      setIsDarkMode(document.body.classList.contains("dark"));
      setScreenWidth(window.innerWidth);

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

  // Calculate responsive spacing based on screen width and columns
  const calculateSpacing = () => {
    if (screenWidth === 0) return 32; // Default fallback
    
    // Mobile: 30em = 480px (assuming 16px base font)
    // Tablet: 60em = 960px
    // Desktop: above 960px
    
    let baseSpacing;
    if (screenWidth < 480) {
      // Mobile: smaller spacing, fewer effective columns
      baseSpacing = screenWidth / (columns * 0.7); // Use 70% of columns for mobile
    } else if (screenWidth < 960) {
      // Tablet: medium spacing
      baseSpacing = screenWidth / (columns * 0.8); // Use 80% of columns for tablet
    } else {
      // Desktop: full spacing
      baseSpacing = screenWidth / columns;
    }
    
    // Ensure minimum spacing of 16px and maximum of 128px
    return Math.max(16, Math.min(128, baseSpacing));
  };

  const spacing = calculateSpacing();

  // CSS custom properties with responsive spacing
  const dotGridStyles = {
    '--dot-size': `${dotSize}px`,
    '--dot-spacing': `${spacing}px`,
    '--dot-opacity': opacity,
    '--dot-blend-mode': blendMode,
    '--dot-color': isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  };

  return (
    <div 
      className={`dot-grid ${className}`}
      style={dotGridStyles}
      aria-hidden="true"
    />
  );
};

export default DotGrid;
