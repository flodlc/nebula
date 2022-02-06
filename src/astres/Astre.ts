import { Drawable } from "./Drawable";

export type AstreArgs = {
  ctx: CanvasRenderingContext2D;
  width: number;
  speed: number;
  distance: number;
  rgb: [number, number, number];
  origin?: Astre;
  invisible?: boolean;
  startAngle?: number;
};

export abstract class Astre extends Drawable {
  relativeWidth: number;
  rgb: [number, number, number];
  speed: number;
  angle: number;
  origin?: Astre;
  relativeDistance: number;

  protected constructor({
    ctx,
    width,
    speed,
    distance,
    rgb,
    origin,
    startAngle = Math.random() * 360,
  }: AstreArgs) {
    super({ ctx });
    this.relativeWidth = width;
    this.rgb = rgb;
    this.speed = speed;
    this.relativeDistance = distance;
    this.origin = origin;
    this.angle = (Math.PI / 180) * (startAngle ?? 0);
  }

  protected rotate() {
    this.angle = (this.angle + (Math.PI / 180) * this.speed) % 360;
  }

  protected get width() {
    return (this.relativeWidth / 100) * this.canvasMinSide;
  }

  protected get distance() {
    return (this.relativeDistance / 100) * this.canvasMinSide;
  }

  getAngle(): number {
    return this.angle;
  }

  getRefAngle(): number {
    return this.getAngle() + (this.origin?.getAngle() ?? 0);
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
