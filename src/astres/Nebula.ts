import { Astre } from "src/astres/Astre";
import { Drawable } from "src/astres/types";
import { roundCoords } from "src/utils/roundCoords";

export class Nebula extends Astre {
  intensity: number;

  constructor({
    ctx,
    width,
    rotateSpeed,
    distance,
    rgb,
    origin,
    startAngle = Math.random() * 360,
    intensity,
  }: {
    ctx: CanvasRenderingContext2D;
    width: number;
    rotateSpeed: number;
    distance: number;
    rgb: [number, number, number];
    origin?: Drawable;
    invisible?: boolean;
    startAngle?: number;
    intensity: number;
  }) {
    super({
      ctx,
      width,
      rgb,
      origin,
      startAngle,
      distance,
      rotateSpeed,
    });
    this.intensity = intensity;
  }

  draw() {
    this.rotate();
    this.ctx.beginPath();
    const orginalCoords = roundCoords(this.getOriginCoords());
    this.ctx.arc(...orginalCoords, Math.round(this.width * 10), 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.shadowBlur = 0;

    const gradient = this.ctx.createRadialGradient(
      ...orginalCoords,
      0,
      ...orginalCoords,
      Math.round(this.width * 7)
    );
    gradient.addColorStop(
      0,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, ${
        this.intensity / 100
      })`
    );
    gradient.addColorStop(
      1,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0)`
    );

    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }
}
