import { useEffect } from 'react';

function useEvent(eventName, handler) {
  useEffect(() => {
    window.addEventListener(eventName, handler);
    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);
}

export default useEvent;
