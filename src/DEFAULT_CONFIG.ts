import { SystemConfig } from "./types";

export const DEFAULT_CONFIG = {
  starsCount: 400,
  starsColor: "#FFFFFF",
  starsRotationSpeed: 3,
  cometFrequence: 15,
  nebulasIntensity: 10,
  bgColor: "rgb(8,8,8)",
  sunScale: 1,
  planetsScale: 1,
  solarSystemOrbite: 65,
  solarSystemSpeedOrbit: 100,
};

export const fillConfig = (config: SystemConfig) => {
  return Object.assign({}, DEFAULT_CONFIG, config);
};
