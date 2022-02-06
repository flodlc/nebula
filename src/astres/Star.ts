import { Astre, AstreArgs } from "./Astre";
import { roundCoords } from "../utils/roundCoords";

export class Star extends Astre {
  constructor({ ...args }: AstreArgs) {
    super({
      ...args,
    });
  }

  draw = () => {
    this.rotate();
    this.ctx.shadowBlur = 0;
    this.ctx.beginPath();
    const orginalCoords = roundCoords(this.getOriginCoords());
    this.ctx.arc(...orginalCoords, Math.round(this.width), 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 1)`;
    this.ctx.fill();
  };
}
