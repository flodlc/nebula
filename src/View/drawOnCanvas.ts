import { Drawable } from "../astres/Drawable";

export const drawOnCanvas = ({
  canvas,
  drawings,
  bgColor,
  fps = 0,
}: {
  canvas: HTMLCanvasElement;
  drawings: Drawable[];
  bgColor?: string;
  fps?: number;
}) => {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => undefined;

  ctx.save();
  let animation: number | undefined;

  let lastTimestamp = 0;
  let timeStep = 1000 / fps;

  const drawMainCanvas = () => {
    if (fps) {
      animation = requestAnimationFrame(drawMainCanvas);
      const timestamp = Date.now();
      if (timestamp - lastTimestamp < timeStep) return;
      lastTimestamp = timestamp;
    }

    ctx.clearRect(0, 0, width, height);
    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    }

    drawings.forEach((drawing) => drawing.draw());
  };

  drawMainCanvas();

  return () => {
    ctx.restore();
    if (animation) {
      cancelAnimationFrame(animation);
    }
  };
};
