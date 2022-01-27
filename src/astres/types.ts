export type AstreDescription = {
  name: string;
  type: "galaxy" | "star" | "planet" | "sun" | "nebula";
  width: number;
  rotateSpeed: number;
  distance: number;
  color: string;
  origin?: string;
  startAngle?: number;
};

export interface Drawable {
  draw: () => void;
  getOriginCoords: () => [number, number];
  getAngle: () => number;
  getWidth: () => number;
}
