import { roundCoords } from "src/utils/roundCoords";
import { Drawable } from "src/astres/Drawable";

export class NebulaAstre extends Drawable {
  intensity: number;
  relativeWidth: number;
  rgb: [number, number, number];
  coords: [number, number];

  constructor({
    ctx,
    width,
    rgb,
    intensity,
  }: {
    ctx: CanvasRenderingContext2D;
    width: number;
    rgb: [number, number, number];
    intensity: number;
  }) {
    super({ ctx });
    this.relativeWidth = width;
    this.rgb = rgb;
    this.intensity = intensity;
    this.coords = roundCoords([
      Math.random() * this.getCanvasWidth(),
      Math.random() * this.getCanvasHeight(),
    ]);
  }

  getNebulaWidth() {
    return (this.relativeWidth / 100) * this.canvasMinSide;
  }

  draw = () => {
    this.ctx.beginPath();
    const width = this.getNebulaWidth();
    this.ctx.arc(...this.coords, Math.round(width * 10), 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.shadowBlur = 0;

    const gradient = this.ctx.createRadialGradient(
      ...this.coords,
      0,
      ...this.coords,
      Math.round(width * 7)
    );
    gradient.addColorStop(
      0,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, ${
        this.intensity / 100
      })`
    );
    gradient.addColorStop(
      1,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, ${0})`
    );

    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  };
}
