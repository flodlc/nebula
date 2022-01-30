import { Astre, AstreArgs } from "src/astres/Astre";
import { roundCoords } from "src/utils/roundCoords";

export class Sun extends Astre {
  constructor({ ...args }: AstreArgs) {
    super({
      ...args,
    });
  }

  getGradiant() {
    const orginalCoords = this.getOriginCoords();
    const gradient = this.ctx.createRadialGradient(
      Math.round(orginalCoords[0]),
      Math.round(orginalCoords[1]),
      0,
      Math.round(orginalCoords[0]),
      Math.round(orginalCoords[1]),
      Math.round(this.width * 5)
    );
    gradient.addColorStop(
      0,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0.17)`
    );
    gradient.addColorStop(
      0.1,
      `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, 0.3)`
    );
    gradient.addColorStop(
      0.16,
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
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = this.getGradiant();
    this.ctx.fill();
  };
}
