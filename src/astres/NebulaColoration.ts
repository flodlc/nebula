import { Drawable } from "src/astres/Drawable";
import { parseColor } from "src/utils/parseColor";
import { Random } from "src/utils/random";

const INTENSITY_MULTIPLE = 0.01;
const ITERATION_PER_COLOR = 3;
const COLORS = [
  "rgb(23,2,122)",
  "rgb(23,2,122)",
  "rgb(20,98,47)",
  "rgb(20,98,47)",
  "#6e0459",
  "#6e0459",
];

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
    const grid = getGrid(COLORS.length);
    this.colorations = COLORS.flatMap((color) => {
      const gridItem = grid.pop()!;
      return new Array(ITERATION_PER_COLOR).fill(0).map(() => {
        return {
          coords: {
            x: gridItem.x * this.getCanvasWidth(),
            y: gridItem.y * this.getCanvasHeight(),
          },
          rgb: parseColor(color),
          ratio: Random.around(0.8, 0.3),
          width: Random.around(6.5, 1.5) * this.canvasMinSide * 0.07,
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
    }

    const unBandedData = data.map((val) =>
      Math.round(Random.between(val - 1, val))
    );
    imageData.data.set(unBandedData);
    this.ctx.putImageData(imageData, 0, 0);
  };
}

const getGrid = (length: number) => {
  let xValues = Array(length)
    .fill(0)
    .map((v, i) => i);

  xValues = Random.randomizeArray(xValues);
  const yValues = Random.randomizeArray(xValues);

  return xValues.map((xValue) => ({
    x: xValue / length + Math.random() / length,
    y: (yValues.pop() as number) / length + Math.random() / length,
  }));
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
