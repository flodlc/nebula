import React, { useLayoutEffect, useRef, useState } from "react";
import { Planet } from "src/astres/Planet";
import { Star } from "src/astres/Star";
import { Galaxy } from "src/astres/Galaxy";
import { parseColor } from "src/utils/parseColor";
import { Sun } from "src/astres/Sun";
import { Nebula } from "src/astres/Nebula";
import { AstreDescription } from "src/astres/types";
import { Astre } from "src/astres/Astre";
import { generateStars } from "src/utils/starGenerator";
import { generateNebulas } from "src/utils/generateNebulas";
import { generateComet } from "src/utils/generateComet";
import { SystemConfig } from "src/types";

const DEFAULT_CONFIG = {
  astres: [] as AstreDescription[],
  cometFrequence: 1,
  scale: 0.8,
  speed: 0.3,
  starsCount: 150,
  starsColor: "#FFFFFF",
  starsRotationSpeed: 5,
  nebulasIntensity: 6,
  nebulasColors: ["rgb(5,63,157)", "rgb(42,112,25)", "rgb(182,41,44)"],
};

export const ReactNebula = ({ config = {} }: { config?: SystemConfig }) => {
  const filledConfig = Object.assign({}, DEFAULT_CONFIG, config);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iter, setIter] = useState(0);

  useLayoutEffect(() => {
    const handler = () => {
      setIter(iter + 1);
    };
    if (!window) return;
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [iter]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const width = canvas.width;
    const height = canvas.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const planets: Record<string, Astre> = {};

    const astres = [
      ...generateStars({
        rotationSpeed: filledConfig.starsRotationSpeed,
        count: filledConfig.starsCount,
        color: filledConfig.starsColor,
      }),
      ...generateNebulas({
        intensity: filledConfig.nebulasIntensity,
        colors: filledConfig.nebulasColors,
      }),
      ...generateComet({
        frequence: filledConfig.cometFrequence,
      }),
      ...filledConfig.astres,
    ];

    astres.forEach((astreConfig) => {
      const Type = {
        star: Star,
        galaxy: Galaxy,
        planet: Planet,
        sun: Sun,
        nebula: Nebula,
      }[astreConfig.type];
      planets[astreConfig.name] = new Type({
        ctx,
        ...astreConfig,
        distance: astreConfig.distance * filledConfig.scale,
        rgb: parseColor(astreConfig.color),
        width: astreConfig.width * filledConfig.scale,
        origin: astreConfig.origin ? planets[astreConfig.origin] : undefined,
        rotateSpeed: astreConfig.rotateSpeed * filledConfig.speed,
      });
    });

    ctx.save();

    let animation: number | undefined;
    const drawCtx = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgb(8, 8, 8)";
      ctx.fillRect(0, 0, width, height);
      Object.values(planets).forEach((planet) => planet.draw());
      animation = requestAnimationFrame(drawCtx);
    };

    drawCtx();

    return () => {
      ctx.restore();
      if (animation) {
        cancelAnimationFrame(animation);
      }
    };
  }, [iter]);

  if (!window) return <div></div>;
  return (
    <div
      style={{
        overflow: "hidden",
        background: "#0a1929",
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ height: "100%", width: "100%" }}
        ref={canvasRef}
      />
    </div>
  );
};
