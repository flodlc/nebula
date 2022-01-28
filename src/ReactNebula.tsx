import React, { useLayoutEffect, useRef, useState } from "react";
import { generateStars } from "src/utils/starGenerator";
import { generateNebulas } from "src/utils/generateNebulas";
import { generateComet } from "src/utils/generateComet";
import { SystemConfig } from "src/types";
import { DEFAULT_CONFIG } from "src/DEFAULT_CONFIG";
import { drawAstres } from "src/draw";

export const ReactNebula = ({ config = {} }: { config?: SystemConfig }) => {
  const filledConfig = Object.assign({}, DEFAULT_CONFIG, config);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ height: 0, width: 0 });

  useLayoutEffect(() => {
    const handler = () => {
      setSize({
        height: wrapperRef.current?.offsetHeight ?? 0,
        width: wrapperRef.current?.offsetWidth ?? 0,
      });
    };
    handler();
    if (typeof window === "undefined") return;
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [setSize]);

  useLayoutEffect(() => {
    return drawAstres({
      astresConfig: [
        ...generateStars({
          rotationSpeed: filledConfig.starsRotationSpeed,
          count: filledConfig.starsCount,
          color: filledConfig.starsColor,
        }),
        ...generateComet({
          frequence: filledConfig.cometFrequence,
        }),
        ...filledConfig.astres,
      ],
      config: filledConfig,
      canvas: canvasRef.current as HTMLCanvasElement,
      play: true,
    });
  }, [size]);

  useLayoutEffect(() => {
    return drawAstres({
      astresConfig: generateNebulas({
        intensity: filledConfig.nebulasIntensity,
        colors: filledConfig.nebulasColors,
      }),
      config: filledConfig,
      canvas: bgCanvasRef.current as HTMLCanvasElement,
      play: false,
      bgColor: "rgb(8, 8, 8)",
    });
  }, [size]);

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
        style={{ height: "100%", width: "100%", position: "absolute" }}
        ref={bgCanvasRef}
      />
      <canvas
        width={size.width * 2}
        height={size.height * 2}
        style={{ height: "100%", width: "100%", position: "absolute" }}
        ref={canvasRef}
      />
    </div>
  );
};
