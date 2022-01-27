import { Astre } from "src/astres/Astre";
import { Drawable } from "src/astres/types";

export class Planet extends Astre {
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
    startAngle?: number;
  }) {
    super({
      ctx,
      width,
      rotateSpeed,
      distance,
      rgb,
      origin,
      startAngle,
    });
  }

  rotate() {
    this.angle = (this.angle + (Math.PI / 180) * this.rotateSpeed) % 360;
  }

  draw() {
    this.rotate();
    this.ctx.beginPath();
    this.ctx.arc(...this.getOriginCoords(), this.width, 0, Math.PI * 2);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(...this.getOriginCoords(), this.width, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.shadowBlur = 0;
    const originCoords = this.getOriginCoords();
    const gradient = this.ctx.createRadialGradient(
      originCoords[0] - 0.4 * this.width * Math.cos(this.angle),
      originCoords[1] - 0.4 * this.width * Math.sin(this.angle),
      0,
      ...originCoords,
      this.width
    );
    gradient.addColorStop(
      0,
      `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 1)`
    );

    gradient.addColorStop(
      1,
      `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0.5)`
    );

    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }
}
