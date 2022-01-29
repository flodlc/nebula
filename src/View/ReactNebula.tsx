import React, { useMemo, useRef } from "react";
import { SystemConfig } from "src/types";
import { DEFAULT_CONFIG } from "src/DEFAULT_CONFIG";
import { useNebulas } from "src/View/useNebulas";
import { useAstres } from "src/View/useAstres";
import { useSize } from "src/View/useSize";

export const ReactNebula = ({ config = {} }: { config?: SystemConfig }) => {
  const filledConfig = useMemo(
    () => Object.assign({}, DEFAULT_CONFIG, config),
    [config]
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const size = useSize(wrapperRef);
  useNebulas({
    canvasSize: size,
    canvasRef: bgCanvasRef,
    config: filledConfig,
  });
  useAstres({ canvasSize: size, canvasRef: canvasRef, config: filledConfig });

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
    >
      <canvas
        width={size.width * 2}
        height={size.height * 2}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          willChange: "transform",
        }}
        ref={bgCanvasRef}
      />
      <canvas
        width={size.width * 2}
        height={size.height * 2}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          willChange: "transform",
        }}
        ref={canvasRef}
      />
    </div>
  );
};
