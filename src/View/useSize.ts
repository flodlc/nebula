import { RefObject, useLayoutEffect, useState } from "react";

export const useSize = (elementRef: RefObject<HTMLElement>) => {
  const [size, setSize] = useState({ height: 0, width: 0 });
  useLayoutEffect(() => {
    const handler = () => {
      setSize({
        height: elementRef.current?.offsetHeight ?? 0,
        width: elementRef.current?.offsetWidth ?? 0,
      });
    };
    handler();
    if (typeof window === "undefined") return;
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [setSize]);

  return size;
};
