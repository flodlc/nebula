import { parseColor } from "../utils/parseColor";
import { Sun } from "../astres/Sun";
import { Planet } from "../astres/Planet";

export const generateSolarSytem = ({
  planets,
  sunScale,
  scale,
  rotationSpeed,
  distance,
  ctx,
}: {
  planets: (Planet | Sun)[];
  sunScale: number;
  scale: number;
  rotationSpeed: number;
  distance: number;
  ctx: CanvasRenderingContext2D;
}) => {
  // if (scale === 0) return [];
  const sun = new Sun({
    ctx,
    width: 3.8 * 0.5 * sunScale,
    distance: distance / 2,
    startAngle: 0,
    speed: 0.0033 * rotationSpeed,
    rgb: parseColor("rgb(208,141,16)"),
  });

  const earth = new Planet({
    ctx,
    width: 0.96 * 0.5 * scale,
    distance: 10 * 0.5 * scale,
    speed: 0.01 * rotationSpeed,
    rgb: parseColor("rgb(19,102,150)"),
    origin: sun,
  });

  return [
    sun,
    new Planet({
      ctx,
      width: 0.3 * 0.5 * scale,
      distance: 4.2,
      speed: 0.017 * rotationSpeed,
      rgb: parseColor("rgb(180, 144, 88)"),
      origin: sun,
    }),
    earth,
    new Planet({
      ctx,
      width: 0.24 * 0.5 * scale,
      distance: 3.2 * 0.5 * scale,
      speed: 0.0212 * rotationSpeed,
      rgb: parseColor("rgb(200, 200, 200)"),
      origin: earth,
    }),
    new Planet({
      ctx,
      width: 0.64 * 0.5 * scale,
      distance: 12.8 * 0.5 * scale,
      speed: 0.0066 * rotationSpeed,
      rgb: parseColor("rgb(233, 88, 26)"),
      origin: sun,
    }),
    new Planet({
      ctx,
      width: 1.44 * 0.5 * scale,
      distance: 17.6 * 0.5 * scale,
      speed: 0.0046 * rotationSpeed,
      rgb: parseColor("rgb(169, 109, 45)"),
      origin: sun,
    }),
    new Planet({
      ctx,
      width: 1.2 * 0.5 * scale,
      distance: 22 * 0.5 * scale,
      speed: 0.004 * rotationSpeed,
      rgb: parseColor("rgb(164,127,84)"),
      origin: sun,
    }),
    new Planet({
      ctx,
      width: 0.76 * 0.5 * scale,
      distance: 25.2 * 0.5 * scale,
      speed: 0.0037 * rotationSpeed,
      rgb: parseColor("rgb(84,149,164)"),
      origin: sun,
    }),
    new Planet({
      ctx,
      width: 0.62 * 0.5 * scale,
      distance: 27.2 * 0.5 * scale,
      speed: 0.0033 * rotationSpeed,
      rgb: parseColor("rgb(36,82,154)"),
      origin: sun,
    }),
  ];
};
