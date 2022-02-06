import React, { useLayoutEffect, useRef } from "react";
import { SystemConfig } from "../types";
import { Nebula } from "../View/Nebula";

export const ReactNebula = ({ config = {} }: { config?: SystemConfig }) => {
  const nebulaRef = useRef<Nebula>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (nebulaRef.current) {
      nebulaRef.current?.setConfig(config);
    }
  }, [config]);

  useLayoutEffect(() => {
    if (!nebulaRef.current) {
      nebulaRef.current = new Nebula({
        config,
        element: wrapperRef.current as HTMLElement,
      });
    }
    return () => {
      nebulaRef.current?.destroy();
      nebulaRef.current = undefined;
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        overflow: "hidden",
        background: "#0a1929",
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
    />
  );
};
