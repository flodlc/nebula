import { Astre } from "src/astres/Astre";
import { Drawable } from "src/astres/types";

export class Sun extends Astre {
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

  getGradiant() {
    const originCoords = this.getOriginCoords();
    const gradient = this.ctx.createRadialGradient(
      originCoords[0],
      originCoords[1],
      0,
      ...originCoords,
      this.width * 5
    );
    gradient.addColorStop(
      0,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0)`
    );
    gradient.addColorStop(
      0.1,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0.2)`
    );
    gradient.addColorStop(
      0.17,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0.6)`
    );
    gradient.addColorStop(
      0.2,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 1)`
    );
    gradient.addColorStop(
      0.2,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0.4)`
    );
    gradient.addColorStop(
      0.23,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0.08)`
    );
    gradient.addColorStop(
      0.5,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0.02)`
    );
    gradient.addColorStop(
      0.9,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0.005)`
    );
    gradient.addColorStop(
      1,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0)`
    );
    return gradient;
  }

  draw() {
    this.rotate();

    this.ctx.beginPath();
    this.ctx.arc(...this.getOriginCoords(), this.width, 0, Math.PI * 2);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(...this.getOriginCoords(), this.width * 5, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.shadowColor = "rgb(0, 0, 0, 0.3)";
    this.ctx.shadowBlur = 6;
    this.ctx.fillStyle = this.getGradiant();
    this.ctx.fill();
  }
}
