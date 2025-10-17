import React, { useState, useEffect } from "react";

/**
 * Client-only wrapper component to prevent SSR
 * Only renders children on the client side after hydration
 */
export default function ClientOnly({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

