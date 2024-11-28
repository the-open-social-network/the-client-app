import { useEffect } from 'react';

export function useKeyDown(keymap: Record<string, Function> = {}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const cb = keymap[e.key];

      if (cb) {
        cb(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });
}