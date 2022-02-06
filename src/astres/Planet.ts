import { Astre, AstreArgs } from "./Astre";
import { roundCoords } from "../utils/roundCoords";
import { getRGB } from "../utils/parseColor";

export class Planet extends Astre {
  constructor({ ...args }: AstreArgs) {
    super({
      ...args,
    });
  }

  draw = () => {
    this.rotate();
    this.ctx.shadowBlur = 0;
    this.ctx.beginPath();
    const originalCoords = roundCoords(this.getOriginCoords());
    this.ctx.arc(...originalCoords, Math.round(this.width), 0, Math.PI * 2);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();
    const gradient = this.ctx.createRadialGradient(
      Math.round(
        originalCoords[0] - 0.4 * this.width * Math.cos(this.getRefAngle())
      ),
      Math.round(
        originalCoords[1] - 0.4 * this.width * Math.sin(this.getRefAngle())
      ),
      0,
      ...originalCoords,
      Math.round(this.width)
    );
    gradient.addColorStop(0, getRGB(this.rgb, 1));
    gradient.addColorStop(1, getRGB(this.rgb, 0.5));

    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  };
}
