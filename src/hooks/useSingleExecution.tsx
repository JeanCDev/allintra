import { useRef, useEffect } from "react";

export const useSingleExecution = (callback: () => void) => {
  const executed = useRef(false);

  return useEffect(() => {
    if (!executed.current) {
      executed.current = true;

      callback();
    }
  }, [callback]);
};
