import { useEffect, useRef } from 'react';

export function useClickAway(ref: React.MutableRefObject<HTMLDivElement|null>, onClickAway: Function) {
  const events = ['mousedown', 'touchstart'];
  const savedCallback = useRef(onClickAway);

  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const eventHandler = (event: Event) => {
      const { current: el } = ref;
      el && !el.contains(event.target as Node) && savedCallback.current(event);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, eventHandler);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, eventHandler);
      }
    };
  }, [events, ref]);
}
