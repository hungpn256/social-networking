import React, { useEffect, useRef } from 'react';

export default function useClickOutSide(handler: (e?: any) => void) {
  const refParent = useRef<HTMLElement>();
  const refChildren = useRef<HTMLElement>();
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !refParent.current ||
        refParent.current.contains(event.target) ||
        refChildren.current?.contains?.(event.target)
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);
  return {
    refParent,
    refChildren,
  };
}
