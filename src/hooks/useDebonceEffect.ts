import { useEffect } from "react";

const useDebounceEffect = (
  callback: VoidFunction,
  dependencies: unknown[] = [],
  delay = 500
) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, dependencies);
};

export default useDebounceEffect;
