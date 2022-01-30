import { Astre } from "src/astres/Astre";
import { roundCoords } from "src/utils/roundCoords";

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
    origin?: Astre;
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
    this.ctx.shadowBlur = 0;
    this.ctx.beginPath();
    const orginalCoords = roundCoords(this.getOriginCoords());
    this.ctx.arc(...orginalCoords, Math.round(this.width), 0, Math.PI * 2);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();
    const gradient = this.ctx.createRadialGradient(
      Math.round(orginalCoords[0] - 0.4 * this.width * Math.cos(this.angle)),
      Math.round(orginalCoords[1] - 0.4 * this.width * Math.sin(this.angle)),
      0,
      ...orginalCoords,
      Math.round(this.width)
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
