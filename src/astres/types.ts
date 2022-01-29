export interface Drawable {
  draw: () => void;
  getOriginCoords: () => [number, number];
  getAngle: () => number;
  getWidth: () => number;
}
