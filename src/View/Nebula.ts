import { Star } from "../astres/Star";
import { SystemConfig } from "../types";
import { fillConfig } from "../DEFAULT_CONFIG";
import { Comet } from "../astres/Comet";
import { Sun } from "../astres/Sun";
import { Planet } from "../astres/Planet";
import { NebulaColoration } from "../astres/NebulaColoration";
import { generateStars } from "../utils/generateStars";
import { drawOnCanvas } from "../View/drawOnCanvas";
import { generateSolarSytem } from "../utils/generateSolarSytem";
import { generateComet } from "../utils/generateComet";
import { generateNebulaColoration } from "../utils/generateNebulaColoration";
import { FPS } from "../config";

const CANVAS_STYLE =
  "width: 100%;height: 100%;position:absolute;will-change:transform;top: 0;left:0;";

export class Nebula {
  private config: Required<SystemConfig>;
  private element: HTMLElement;
  private readonly bgCanvas: HTMLCanvasElement;
  private readonly canvas: HTMLCanvasElement;
  private cancelAnimations: (() => void)[] = [];

  private coloration?: NebulaColoration;
  private stars: Star[] = [];
  private comets: Comet[] = [];
  private planets: (Sun | Planet)[] = [];

  constructor({
    config,
    element,
  }: {
    config: SystemConfig;
    element: HTMLElement;
  }) {
    this.element = element;
    this.bgCanvas = document.createElement("CANVAS") as HTMLCanvasElement;
    this.canvas = document.createElement("CANVAS") as HTMLCanvasElement;
    element.append(this.bgCanvas);
    element.append(this.canvas);
    this.styleCanvas();
    window.addEventListener("resize", this.onResize);
    this.config = fillConfig(config);
    this.setConfig(config);
  }

  private onResize = () => {
    this.styleCanvas();
    this.init();
  };

  private styleCanvas = () => {
    this.bgCanvas.setAttribute("style", CANVAS_STYLE);
    this.bgCanvas.width = this.element.offsetWidth / 3;
    this.bgCanvas.height = this.element.offsetHeight / 3;
    this.canvas.setAttribute("style", CANVAS_STYLE);
    this.canvas.width = this.element.offsetWidth * 2;
    this.canvas.height = this.element.offsetHeight * 2;
  };

  setConfig(config: SystemConfig) {
    this.config = fillConfig(config);
    this.coloration = generateNebulaColoration({
      coloration: this.coloration,
      ctx: this.bgCanvas.getContext("2d") as CanvasRenderingContext2D,
      intensity: this.config.nebulasIntensity,
    });
    this.stars = generateStars({
      stars: this.stars,
      ctx: this.canvas.getContext("2d") as CanvasRenderingContext2D,
      color: this.config.starsColor,
      count: this.config.starsCount,
      rotationSpeed: this.config.starsRotationSpeed,
    });
    this.planets = generateSolarSytem({
      planets: this.planets,
      sunScale: this.config.sunScale,
      scale: this.config.planetsScale,
      ctx: this.canvas.getContext("2d") as CanvasRenderingContext2D,
      rotationSpeed: this.config.solarSystemSpeedOrbit,
      distance: this.config.solarSystemOrbite,
    });
    this.comets = generateComet({
      ctx: this.canvas.getContext("2d") as CanvasRenderingContext2D,
      frequence: this.config.cometFrequence,
    });
    this.init();
  }

  private init() {
    this.draw();
  }

  draw() {
    this.cancelAnimations.forEach((callback) => callback());
    this.cancelAnimations = [
      drawOnCanvas({
        canvas: this.bgCanvas,
        drawings: [this.coloration as NebulaColoration],
        bgColor: this.config.bgColor,
      }),
      drawOnCanvas({
        canvas: this.canvas,
        drawings: [...this.stars, ...this.comets, ...this.planets],
        fps: FPS,
      }),
    ];
  }

  destroy() {
    window.removeEventListener("resize", this.onResize);
    this.cancelAnimations.forEach((callback) => callback());
    this.cancelAnimations = [];
    this.bgCanvas.parentElement?.removeChild(this.bgCanvas);
    this.canvas.parentElement?.removeChild(this.canvas);
  }
}
