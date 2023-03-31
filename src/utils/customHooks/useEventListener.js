import { useEffect, useRef } from "react";

const useEventListener = (eventName, handler) => {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Create event listener that calls handler function stored in ref
    const eventListener = (event) => savedHandler.current(event);

    // Add event listener
    window.addEventListener(eventName, eventListener);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, []);
};

export default useEventListener;
