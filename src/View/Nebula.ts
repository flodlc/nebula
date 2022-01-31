import { Star } from "src/astres/Star";
import { SystemConfig } from "src/types";
import { fillConfig } from "src/DEFAULT_CONFIG";
import { Comet } from "src/astres/Comet";
import { Sun } from "src/astres/Sun";
import { Planet } from "src/astres/Planet";
import { NebulaAstre } from "src/astres/NebulaAstre";
import { generateStars } from "src/utils/generateStars";
import { drawAstres } from "src/View/draw";
import { generateSolarSytem } from "src/utils/generateSolarSytem";
import { generateComet } from "src/utils/generateComet";
import { generateNebulas } from "src/utils/generateNebulas";
import { FPS } from "src/config";
import "context-filter-polyfill";

export class Nebula {
  private config: Required<SystemConfig>;
  private element: HTMLElement;
  private bgCanvas: HTMLCanvasElement;
  private canvas: HTMLCanvasElement;
  private nebulas: NebulaAstre[] = [];
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
    this.canvas = document.createElement("CANVAS") as HTMLCanvasElement;
    this.bgCanvas = document.createElement("CANVAS") as HTMLCanvasElement;
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
    this.canvas.setAttribute(
      "style",
      "width: 100%;height: 100%;position:absolute;top: 0;left:0;"
    );

    this.bgCanvas.setAttribute(
      "style",
      "width: 100%;height: 100%;position:absolute;top: 0;left:0;"
    );
    this.canvas.width = this.element.offsetWidth * 2;
    this.canvas.height = this.element.offsetHeight * 2;
    this.bgCanvas.width = this.element.offsetWidth * 2;
    this.bgCanvas.height = this.element.offsetHeight * 2;
  };

  setConfig(config: SystemConfig) {
    this.config = fillConfig(config);
    this.nebulas = generateNebulas({
      nebulas: this.nebulas,
      ctx: this.bgCanvas.getContext("2d") as CanvasRenderingContext2D,
      intensity: this.config.nebulasIntensity,
      colors: this.config.nebulasColors,
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

  private cancelAnimations: (() => void)[] = [];
  draw() {
    this.cancelAnimations.forEach((callback) => callback());
    this.cancelAnimations = [
      drawAstres({
        astres: this.nebulas,
        play: false,
        canvas: this.bgCanvas,
        bgColor: "rgb(8, 8, 8)",
      }),
      drawAstres({
        astres: [...this.stars, ...this.comets, ...this.planets],
        fps: FPS,
        play: true,
        canvas: this.canvas,
      }),
    ];
  }

  destroy() {
    this.cancelAnimations.forEach((callback) => callback());
    this.cancelAnimations = [];
    this.bgCanvas.parentElement?.removeChild(this.bgCanvas);
    this.canvas.parentElement?.removeChild(this.canvas);
  }
}
