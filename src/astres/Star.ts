import { Astre } from "src/astres/Astre";
import { roundCoords } from "src/utils/roundCoords";

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
    origin?: Astre;
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
    const orginalCoords = roundCoords(this.getOriginCoords());
    this.ctx.arc(...orginalCoords, Math.round(this.width), 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 1)`;
    this.ctx.fill();
  }
}
