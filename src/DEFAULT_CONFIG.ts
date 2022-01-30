import { SystemConfig } from "src/types";

export const DEFAULT_CONFIG = {
  starsCount: 350,
  starsColor: "#FFFFFF",
  starsRotationSpeed: 3,
  cometFrequence: 20,
  nebulasIntensity: 10,
  nebulasColors: ["rgb(27,2,140)", "rgb(22,91,2)", "#880554"],
  solarSystemScale: 1,
  solarSystemDistance: 65,
  solarSystemRotationSpeed: 100,
};

export const fillConfig = (config: SystemConfig) => {
  return Object.assign({}, DEFAULT_CONFIG, config);
};
