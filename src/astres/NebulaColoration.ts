import { Drawable } from "src/astres/Drawable";
import { parseColor } from "src/utils/parseColor";

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
          ratio: 0.5 + Math.random() * 0.6,
          width: (5 + Math.random() * 3) * this.canvasMinSide * 0.07,
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
        for (let channel = 0; channel < 3; channel++) {
          data[i + channel] =
            opacity * coloration.rgb[channel] +
            data[channel + i] * (1 - opacity);
        }
      });
    }

    const unBandedData = data.map((val) => Math.round(val - 1 + Math.random()));
    imageData.data.set(unBandedData);
    this.ctx.putImageData(imageData, 0, 0);
  };
}

const getGrid = (length: number) => {
  const xValues = Array(length)
    .fill(0)
    .map((v, i) => i)
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

  const yValues = xValues.slice().sort(() => (Math.random() > 0.5 ? 1 : -1));

  return xValues.map((xValue) => ({
    x: xValue / length + Math.random() * (1 / length),
    y: (yValues.pop() as number) / length + Math.random() * (1 / length),
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
