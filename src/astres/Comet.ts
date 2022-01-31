import { FPS } from "src/config";
import { Drawable } from "src/astres/Drawable";
import { parseColor } from "src/utils/parseColor";

const SPEED = 160;

export class Comet extends Drawable {
  ctx: CanvasRenderingContext2D;
  frequence: number;

  constructor({
    ctx,
    frequence,
  }: {
    ctx: CanvasRenderingContext2D;
    frequence: number;
  }) {
    super({ ctx });
    this.ctx = ctx;
    this.frequence = frequence;
  }

  private showConfig:
    | {
        speed: number;
        startCoords: { x: number; y: number };
        direction: number;
        distanceToTarget: number;
        rgb: [number, number, number];
        width: number;
        startOpacity: number;
      }
    | undefined;

  private speed = SPEED;
  private x = 0;
  private y = 0;
  private opacity = 0;
  private move() {
    if (this.showConfig) {
      this.x += this.speed * Math.cos(this.showConfig.direction);
      this.y += this.speed * Math.sin(this.showConfig.direction);
      const { x: startX, y: startY } = this.showConfig.startCoords;
      const distance = Math.sqrt(
        Math.pow(this.x - startX, 2) + Math.pow(this.y - startY, 2)
      );
      const showAvancement = distance / this.showConfig.distanceToTarget;
      this.opacity = Math.max(
        0.7,
        Math.min(showAvancement < 0.3 ? showAvancement : 1 - showAvancement, 1)
      );

      if (distance > this.showConfig.distanceToTarget) {
        this.showConfig = undefined;
      }
      return;
    }

    const shouldCreateANewShow = Math.random() > 1 - this.frequence / 100 / FPS;
    if (shouldCreateANewShow) {
      const fromAngle = Math.random() * 2 * Math.PI;
      const maxSideSize = Math.max(
        this.getCanvasHeight(),
        this.getCanvasWidth()
      );
      this.showConfig = {
        startCoords: {
          x:
            ((Math.cos(fromAngle) * maxSideSize) / 3) * (0.5 + Math.random()) +
            this.getCanvasWidth() / 2,
          y:
            ((Math.sin(fromAngle) * maxSideSize) / 3) * (0.5 + Math.random()) +
            this.getCanvasHeight() / 2,
        },
        direction: fromAngle + Math.PI + (Math.random() * Math.PI) / 6,
        distanceToTarget: maxSideSize * 0.6 * (0.7 + Math.random() * 0.6),
        speed: SPEED * (0.7 + Math.random() * 0.6),
        rgb: parseColor("rgb(255,207,207)"),
        width: 0.2 + Math.random() * 0.6,
        startOpacity: 0,
      };
      this.x = this.showConfig.startCoords.x;
      this.y = this.showConfig.startCoords.y;
    }
  }

  draw = () => {
    this.move();
    if (!this.showConfig) return;
    this.ctx.save();
    this.ctx.ellipse(
      this.x,
      this.y,
      this.showConfig.width,
      90,
      this.showConfig.direction + Math.PI / 2,
      0,
      Math.PI * 2
    );
    this.ctx.globalAlpha = this.opacity;
    const gradiant = this.ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      90
    );
    gradiant.addColorStop(
      0,
      `rgba(${this.showConfig.rgb[0]}, ${this.showConfig.rgb[1]}, ${this.showConfig.rgb[2]}, 1)`
    );
    gradiant.addColorStop(
      1,
      `rgba(${this.showConfig.rgb[0]}, ${this.showConfig.rgb[1]}, ${this.showConfig.rgb[2]}, 0)`
    );
    this.ctx.fillStyle = gradiant;
    this.ctx.fill();
    this.ctx.restore();
  };
}
