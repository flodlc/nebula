import { AstreDescription } from "src/astres/types";
import { SystemConfig } from "src/types";
import { Astre } from "src/astres/Astre";
import { Star } from "src/astres/Star";
import { Galaxy } from "src/astres/Galaxy";
import { Planet } from "src/astres/Planet";
import { Sun } from "src/astres/Sun";
import { Nebula } from "src/astres/Nebula";
import { parseColor } from "src/utils/parseColor";

export const drawAstres = ({
  astresConfig,
  config,
  canvas,
  bgColor,
  play,
}: {
  astresConfig: AstreDescription[];
  config: Required<SystemConfig>;
  canvas: HTMLCanvasElement;
  bgColor?: string;
  play: boolean;
}) => {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => undefined;

  const astres: Record<string, Astre> = {};

  astresConfig.forEach((astreConfig) => {
    const Type = {
      star: Star,
      galaxy: Galaxy,
      planet: Planet,
      sun: Sun,
      nebula: Nebula,
    }[astreConfig.type];
    astres[astreConfig.name] = new Type({
      ctx,
      ...(astreConfig as any),
      distance: astreConfig.distance * config.scale,
      rgb: parseColor(astreConfig.color),
      width: astreConfig.width * config.scale,
      origin: astreConfig.origin ? astres[astreConfig.origin] : undefined,
      rotateSpeed: astreConfig.rotateSpeed * config.speed,
    });
  });

  ctx.save();
  let animation: number | undefined;

  const drawMainCanvas = () => {
    ctx.clearRect(0, 0, width, height);
    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    }
    Object.values(astres).forEach((astre) => astre.draw());
    if (play) {
      animation = requestAnimationFrame(drawMainCanvas);
    }
  };
  drawMainCanvas();

  return () => {
    ctx.restore();
    if (animation) {
      cancelAnimationFrame(animation);
    }
  };
};
