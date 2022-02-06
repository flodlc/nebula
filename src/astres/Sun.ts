import { Astre, AstreArgs } from "./Astre";
import { roundCoords } from "../utils/roundCoords";
import { getRGB } from "../utils/parseColor";

export class Sun extends Astre {
  constructor({ ...args }: AstreArgs) {
    super({
      ...args,
    });
  }

  getGradiant() {
    const orginalCoords = roundCoords(this.getOriginCoords());
    const gradient = this.ctx.createRadialGradient(
      ...orginalCoords,
      0,
      ...orginalCoords,
      Math.round(this.width * 5)
    );
    gradient.addColorStop(0, getRGB(this.rgb, 0.2));
    gradient.addColorStop(0.1, getRGB(this.rgb, 0.3));
    gradient.addColorStop(0.16, getRGB(this.rgb, 0.6));
    gradient.addColorStop(0.2, getRGB(this.rgb, 1));
    gradient.addColorStop(0.2, getRGB(this.rgb, 0.4));
    gradient.addColorStop(0.23, getRGB(this.rgb, 0.08));
    gradient.addColorStop(0.5, getRGB(this.rgb, 0.02));
    gradient.addColorStop(0.9, getRGB(this.rgb, 0.005));
    gradient.addColorStop(1, getRGB(this.rgb, 0));
    return gradient;
  }

  draw = () => {
    this.rotate();
    this.ctx.shadowBlur = 0;

    this.ctx.beginPath();
    const orginalCoords = roundCoords(this.getOriginCoords());
    this.ctx.arc(...orginalCoords, Math.round(this.width), 0, Math.PI * 2);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(...orginalCoords, Math.round(this.width * 5), 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = this.getGradiant();
    this.ctx.fill();
  };
}
