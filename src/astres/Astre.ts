import { Drawable } from "src/astres/types";

export abstract class Astre implements Drawable {
  ctx: CanvasRenderingContext2D;
  relativeWidth: number;
  rgb: [number, number, number];
  rotateSpeed: number;
  angle: number;
  origin?: Drawable;
  relativeDistance: number;

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
    this.ctx = ctx;
    this.relativeWidth = width;
    this.rgb = rgb;
    this.rotateSpeed = rotateSpeed;
    this.relativeDistance = distance;
    this.origin = origin;
    this.angle = (Math.PI / 180) * (startAngle ?? 0);
  }

  protected rotate() {
    this.angle = (this.angle + (Math.PI / 180) * this.rotateSpeed) % 360;
  }

  protected getCanvasWidth() {
    return this.ctx.canvas.width;
  }

  protected getCanvasHeight() {
    return this.ctx.canvas.height;
  }

  protected get canvasMinSide() {
    return Math.min(this.getCanvasHeight(), this.getCanvasWidth());
  }

  protected get width() {
    return (this.relativeWidth / 100) * this.canvasMinSide;
  }

  protected get distance() {
    return (this.relativeDistance / 100) * this.canvasMinSide;
  }

  draw() {
    console.log("should implement");
  }

  getAngle(): number {
    return this.angle;
  }

  getWidth(): number {
    return this.width;
  }

  getOriginCoords(): [number, number] {
    if (!this.origin) {
      const orbitOriginCoords = [
        this.getCanvasWidth() / 2,
        this.getCanvasHeight() / 2,
      ];
      return [
        orbitOriginCoords[0] + Math.cos(this.angle) * this.distance,
        orbitOriginCoords[1] + Math.sin(this.angle) * this.distance,
      ];
    } else {
      const orbitOriginCoords = this.origin.getOriginCoords();
      return [
        orbitOriginCoords[0] +
          Math.cos(this.origin.getAngle() + this.angle) *
            (this.distance + this.origin.getWidth()),
        orbitOriginCoords[1] +
          Math.sin(this.origin.getAngle() + this.angle) *
            (this.distance + this.origin.getWidth()),
      ];
    }
  }
}
