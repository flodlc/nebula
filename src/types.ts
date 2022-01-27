import { AstreDescription } from "src/astres/types";

export type SystemConfig = {
  astres?: AstreDescription[];
  scale?: number;
  speed?: number;
  starsCount?: number;
  starsColor?: string;
  starsRotationSpeed?: number;
  cometFrequence?: number;
  nebulasIntensity?: number;
  nebulasColors?: string[];
};
