import { Astre } from "src/astres/Astre";

export class Galaxy extends Astre {
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
  }
}
