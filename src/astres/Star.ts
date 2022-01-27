import { Astre } from "src/astres/Astre";
import { Drawable } from "src/astres/types";

export class Star extends Astre {
  constructor({
    ctx,
    width,
    rotateSpeed,
    distance,
    origin,
    rgb,
    startAngle = Math.random() * 360,
  }: {
    ctx: CanvasRenderingContext2D;
    width: number;
    rotateSpeed: number;
    distance: number;
    origin?: Drawable;
    invisible?: boolean;
    startAngle?: number;
    rgb: [number, number, number];
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
  }

  draw() {
    this.rotate();
    this.ctx.shadowBlur = 0;
    this.ctx.beginPath();
    this.ctx.arc(...this.getOriginCoords(), this.width, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 1)`;
    this.ctx.fill();
  }
}
