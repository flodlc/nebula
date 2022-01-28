import { PlanetDescription, SunDescription } from "src/astres/types";

export type SystemConfig = {
  astres?: (PlanetDescription | SunDescription)[];
  scale?: number;
  speed?: number;
  starsCount?: number;
  starsColor?: string;
  starsRotationSpeed?: number;
  cometFrequence?: number;
  nebulasIntensity?: number;
  nebulasColors?: string[];
};
