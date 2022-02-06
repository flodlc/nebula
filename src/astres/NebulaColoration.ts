import { Drawable } from "./Drawable";
import { parseColor } from "../utils/parseColor";
import { Random } from "../utils/random";

const INTENSITY_MULTIPLE = 0.025;
const ITERATION_PER_COLOR = 3;
const COLORS = ["rgb(6,2,122)", "rgb(6,66,18)", "#57046e"];

type Coloration = {
  coords: { x: number; y: number };
  rgb: [number, number, number];
  width: number;
  ratio: number;
};

export class NebulaColoration extends Drawable {
  intensity: number;
  colorations: Coloration[];

  constructor({
    ctx,
    intensity,
  }: {
    ctx: CanvasRenderingContext2D;
    intensity: number;
  }) {
    super({ ctx });
    this.intensity = intensity * INTENSITY_MULTIPLE;
    const grid = getGrid(COLORS.length * ITERATION_PER_COLOR);
    this.colorations = COLORS.flatMap((color) => {
      return new Array(ITERATION_PER_COLOR).fill(0).map(() => {
        const gridItem = grid.pop()!;
        return {
          coords: {
            x: gridItem.x * this.getCanvasWidth(),
            y: gridItem.y * this.getCanvasHeight(),
          },
          rgb: parseColor(color),
          ratio: Random.around(Math.PI / 4, 0.2),
          width: Random.between(5, 8) * this.canvasMinSide * 0.08,
        };
      });
    });
  }

  setIntensity(intensity: number) {
    this.intensity = intensity * INTENSITY_MULTIPLE;
  }

  draw = () => {
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.getCanvasWidth(),
      this.getCanvasHeight()
    );
    const canvasWidth = this.getCanvasWidth();
    const data: number[] = Array.from(imageData.data);
    for (let i = 0; i < data.length; i = i + 4) {
      const pixelIndex = i / 4;
      const x = pixelIndex % canvasWidth;
      const y = Math.floor(pixelIndex / canvasWidth);

      this.colorations.forEach((coloration) => {
        const opacity = getColorationOpacity(coloration, x, y) * this.intensity;
        if (opacity > 0) {
          for (let channel = 0; channel < 3; channel++) {
            data[i + channel] =
              opacity * coloration.rgb[channel] +
              data[channel + i] * (1 - opacity);
          }
        }
      });
      for (let channel = 0; channel < 3; channel++) {
        const value = data[i + channel];
        if (value > 0) {
          data[i + channel] = Math.round(value - 1 + Math.random());
        }
      }
    }

    imageData.data.set(data);
    this.ctx.putImageData(imageData, 0, 0);
  };
}

const getGrid = (length: number) => {
  const startAngle = Math.PI * 2 * Math.random();
  const coords = new Array(length).fill(0).map((v, i) => {
    const angle = startAngle + Random.around((i * Math.PI * 2) / length, 0.32);
    const rayon = Random.between(0.8, 1.1);
    return {
      x: (Math.cos(angle) * rayon + 1) / 2,
      y: (Math.sin(angle) * rayon + 1) / 2,
    };
  });
  return Random.randomizeArray(coords);
};

const getColorationOpacity = (coloration: Coloration, x: number, y: number) => {
  const xDistance = x - coloration.coords.x;
  const yDistance = y - coloration.coords.y;
  const distanceToNebula = Math.sqrt(
    Math.pow(xDistance * Math.cos(coloration.ratio), 2) +
      Math.pow(yDistance * Math.sin(coloration.ratio), 2)
  );
  const relativeDistanceToNebula =
    (coloration.width - distanceToNebula) / coloration.width;
  return Math.max(relativeDistanceToNebula, 0);
};
