import { Drawable } from "src/astres/Drawable";

export const drawAstres = ({
  astres,
  canvas,
  bgColor,
  play,
  fps = 60,
}: {
  astres: Drawable[];
  canvas: HTMLCanvasElement;
  bgColor?: string;
  play: boolean;
  fps?: number;
}) => {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => undefined;

  ctx.save();
  let animation: number | undefined;

  let lastTimestamp = 0,
    timestep = 1000 / fps; // ms for each frame

  const drawMainCanvas = () => {
    if (play) {
      animation = requestAnimationFrame(drawMainCanvas);
      const timestamp = Date.now();
      if (timestamp - lastTimestamp < timestep) return;
      lastTimestamp = timestamp;
    }

    ctx.clearRect(0, 0, width, height);
    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    }

    astres.forEach((astre) => astre.draw());
  };
  drawMainCanvas();
  return () => {
    ctx.restore();
    if (animation) {
      cancelAnimationFrame(animation);
    }
  };
};
