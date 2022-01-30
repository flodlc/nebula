import { Drawable } from "src/astres/types";
import { FPS } from "src/config";

const SPEED = 150;

export class Comet implements Drawable {
  ctx: CanvasRenderingContext2D;
  frequence: number;

  constructor({
    ctx,
    frequence,
  }: {
    ctx: CanvasRenderingContext2D;
    frequence: number;
  }) {
    this.ctx = ctx;
    this.frequence = frequence;
  }

  getOriginCoords() {
    return [1, 1] as [number, number];
  }
  getAngle() {
    return 1;
  }
  getWidth() {
    return 1;
  }

  private getCanvasWidth() {
    return this.ctx.canvas.width;
  }

  private getCanvasHeight() {
    return this.ctx.canvas.height;
  }

  private showConfig:
    | {
        speed: number;
        startCoords: { x: number; y: number };
        direction: number;
        distanceToTarget: number;
        color: string;
        width: number;
        startOpacity: number;
      }
    | undefined;

  private speed = SPEED;
  private x = 0;
  private y = 0;
  private opacity = 0;
  private co = 0;
  private coa = 0;
  private move() {
    if (this.showConfig) {
      this.x += this.speed * Math.cos(this.showConfig.direction);
      this.y += this.speed * Math.sin(this.showConfig.direction);
      const { x: startX, y: startY } = this.showConfig.startCoords;
      const distance = Math.sqrt(
        Math.pow(this.x - startX, 2) + Math.pow(this.y - startY, 2)
      );
      const showAvancement = distance / this.showConfig.distanceToTarget;
      this.opacity = Math.min(this.showConfig.startOpacity + showAvancement, 1);

      if (distance > this.showConfig.distanceToTarget) {
        this.showConfig = undefined;
      }
      return;
    }

    const shouldCreateANewShow = Math.random() > 1 - this.frequence / 100 / FPS;
    this.co++;
    if (shouldCreateANewShow) {
      this.coa++;
      const fromAngle = Math.random() * 2 * Math.PI;
      const maxSideSize = Math.max(
        this.getCanvasHeight(),
        this.getCanvasWidth()
      );
      this.showConfig = {
        startCoords: {
          x:
            (Math.cos(fromAngle) * maxSideSize) / 2 + this.getCanvasWidth() / 2,
          y:
            (Math.sin(fromAngle) * maxSideSize) / 2 +
            this.getCanvasHeight() / 2,
        },
        direction: fromAngle + Math.PI + (Math.random() * Math.PI) / 6,
        distanceToTarget: maxSideSize,
        speed: Math.random() * SPEED + SPEED,
        color: "width",
        width: 1 + Math.random() * 3,
        startOpacity: Math.random() * 0.5,
      };
      this.x = this.showConfig.startCoords.x;
      this.y = this.showConfig.startCoords.y;
    }
  }

  draw() {
    this.move();
    if (!this.showConfig) return;
    this.ctx.save();
    this.ctx.arc(this.x, this.y, this.showConfig.width, 0, Math.PI * 2);
    this.ctx.fillStyle = this.showConfig.color;
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fill();
    this.ctx.restore();
  }
}
