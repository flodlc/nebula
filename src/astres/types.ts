export type NubulaDescription = {
  type: "nebula";
  intensity?: number;
} & BaseAstreDescription;

export type PlanetDescription = {
  type: "planet";
  intensity?: number;
} & BaseAstreDescription;

export type SunDescription = {
  type: "sun";
  intensity?: number;
} & BaseAstreDescription;

export type StarDescription = {
  type: "star";
  intensity?: number;
} & BaseAstreDescription;

export type GalaxyDescription = {
  type: "galaxy";
  intensity?: number;
} & BaseAstreDescription;

type BaseAstreDescription = {
  name: string;
  width: number;
  rotateSpeed: number;
  distance: number;
  color: string;
  origin?: string;
  startAngle?: number;
};

export type AstreDescription =
  | NubulaDescription
  | PlanetDescription
  | SunDescription
  | StarDescription
  | GalaxyDescription;

export interface Drawable {
  draw: () => void;
  getOriginCoords: () => [number, number];
  getAngle: () => number;
  getWidth: () => number;
}
