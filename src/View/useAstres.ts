import { RefObject, useLayoutEffect } from "react";
import { SystemConfig } from "src/types";
import { generateStars } from "src/utils/generateStars";
import { Star } from "src/astres/Star";
import { generateComet } from "src/utils/generateComet";
import { Planet } from "src/astres/Planet";
import { Sun } from "src/astres/Sun";
import { drawAstres } from "src/View/draw";
import { generateSolarSytem } from "src/utils/generateSolarSytem";

export const useAstres = ({
  canvasSize,
  canvasRef,
  config,
}: {
  canvasSize: { height: number; width: number };
  canvasRef: RefObject<HTMLCanvasElement>;
  config: Required<SystemConfig>;
}) => {
  useLayoutEffect(() => {
    if (!canvasSize.width) return () => undefined;
    const ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d");
    const stars = generateStars({
      rotationSpeed: config.starsRotationSpeed,
      count: config.starsCount,
      color: config.starsColor,
    }).reduce(
      (stars, starConfig) => ({
        ...stars,
        [starConfig.name]: new Star({
          ...(starConfig as any),
          ctx,
        }),
      }),
      {} as Record<string, Star>
    );

    const comets = generateComet({
      frequence: config.cometFrequence,
    }).reduce(
      (comets, cometConfig) => ({
        ...comets,
        [cometConfig.name]: new Star({
          ctx,
          ...(cometConfig as any),
          origin: cometConfig.origin ? comets[cometConfig.origin] : undefined,
        }),
      }),
      {} as Record<string, Star>
    );

    const planets = generateSolarSytem({
      scale: config.solarSystemScale,
      distance: config.solarSystemDistance,
      rotationSpeed: config.solarSystemRotationSpeed,
    }).reduce((planets, planetConfig) => {
      const Type = {
        planet: Planet,
        sun: Sun,
      }[planetConfig.type as "sun" | "planet"];
      return {
        ...planets,
        [planetConfig.name]: new Type({
          ctx,
          ...(planetConfig as any),
          origin: planetConfig.origin
            ? planets[planetConfig.origin]
            : undefined,
        }),
      };
    }, {} as Record<string, Star>);
    return drawAstres({
      astres: { ...stars, ...comets, ...planets },
      canvas: canvasRef.current as HTMLCanvasElement,
      play: true,
      fps: 40,
    });
  }, [canvasSize.width, canvasSize.height, config]);
};
