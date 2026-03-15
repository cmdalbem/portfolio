import React from 'react';
import { ThemeToggler as PluginThemeToggler } from 'gatsby-plugin-dark-mode';

export const ThemeContext = React.createContext({
  theme: null,
  toggleTheme: () => {},
});

/**
 * Single provider that uses gatsby-plugin-dark-mode's ThemeToggler once.
 * The plugin registers window.__onThemeChange in componentDidMount; multiple
 * instances overwrite each other so only one would receive updates. By
 * using one provider and context, all toggle buttons stay in sync.
 */
export function ThemeProvider({ children }) {
  return (
    <PluginThemeToggler>
      {({ theme, toggleTheme }) => (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      )}
    </PluginThemeToggler>
  );
}
