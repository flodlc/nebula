import { Astre } from "src/astres/Astre";
import { Drawable } from "src/astres/types";

export class Nebula extends Astre {
  constructor({
    ctx,
    width,
    rotateSpeed,
    distance,
    rgb,
    origin,
    startAngle = Math.random() * 360,
  }: {
    ctx: CanvasRenderingContext2D;
    width: number;
    rotateSpeed: number;
    distance: number;
    rgb: [number, number, number];
    origin?: Drawable;
    invisible?: boolean;
    startAngle?: number;
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
    this.ctx.beginPath();
    this.ctx.arc(...this.getOriginCoords(), this.width * 10, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.shadowBlur = 0;

    const originCoords = this.getOriginCoords();
    const gradient = this.ctx.createRadialGradient(
      originCoords[0],
      originCoords[1],
      0,
      ...originCoords,
      this.width * 10
    );
    gradient.addColorStop(
      0,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0.038)`
    );
    gradient.addColorStop(
      1,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0)`
    );

    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }
}
