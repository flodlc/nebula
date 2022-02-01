export abstract class Drawable {
  protected ctx: CanvasRenderingContext2D;

  constructor({ ctx }: { ctx: CanvasRenderingContext2D }) {
    this.ctx = ctx;
  }

  public abstract draw: () => void;

  protected getCanvasWidth() {
    return this.ctx.canvas.width;
  }

  protected getCanvasHeight() {
    return this.ctx.canvas.height;
  }

  protected get canvasMinSide() {
    return Math.min(this.getCanvasHeight(), this.getCanvasWidth());
  }

  protected get canvasMaxSide() {
    return Math.max(this.getCanvasHeight(), this.getCanvasWidth());
  }
}
