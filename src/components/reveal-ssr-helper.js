// Helper for SSR compatibility with react-reveal
// Webpack null loader returns empty object during SSR
export const isFunctionOrClass = (obj) => typeof obj === 'function' || (obj && obj.$$typeof);
