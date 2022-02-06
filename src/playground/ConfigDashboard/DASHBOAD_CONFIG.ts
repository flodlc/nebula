import { SystemConfig } from "../../types";

export const DASHBOAD_CONFIG = [
  {
    key: "starsCount" as keyof SystemConfig,
    min: 0,
    max: 1000,
    step: 10,
  },
  {
    key: "starsRotationSpeed" as keyof SystemConfig,
    min: 0,
    max: 500,
    step: 0.1,
    float: true,
  },
  {
    key: "cometFrequence" as keyof SystemConfig,
    min: 0,
    max: 100,
    step: 1,
  },
  {
    key: "nebulasIntensity" as keyof SystemConfig,
    min: 0,
    max: 30,
    step: 1,
  },
  {
    key: "sunScale" as keyof SystemConfig,
    min: 0,
    max: 5,
    step: 0.1,
    float: true,
  },
  {
    key: "planetsScale" as keyof SystemConfig,
    min: 0,
    max: 5,
    step: 0.1,
    float: true,
  },
  {
    key: "solarSystemOrbite" as keyof SystemConfig,
    min: 0,
    max: 100,
    step: 1,
  },
  {
    key: "solarSystemSpeedOrbit" as keyof SystemConfig,
    min: 0,
    max: 1000,
    step: 10,
  },
];
