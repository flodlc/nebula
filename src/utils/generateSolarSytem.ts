import { parseColor } from "src/utils/parseColor";

export const generateSolarSytem = ({
  scale,
  rotationSpeed,
  distance,
}: {
  scale: number;
  rotationSpeed: number;
  distance: number;
}) => {
  if (scale === 0) return [];
  return [
    {
      name: "Sun",
      type: "sun",
      width: 3.8 * 0.5 * scale,
      distance: distance / 2,
      startAngle: 0,
      rotateSpeed: 0.0033 * rotationSpeed,
      rgb: parseColor("rgb(255,180,40)"),
    },
    {
      name: "Mercure",
      type: "planet",
      width: 0.3 * 0.5 * scale,
      distance: 4.2,
      rotateSpeed: 0.017 * rotationSpeed,
      rgb: parseColor("rgb(180, 144, 88)"),
      origin: "Sun",
    },
    {
      name: "Earth",
      type: "planet",
      width: 0.96 * 0.5 * scale,
      distance: 10 * 0.5 * scale,
      rotateSpeed: 0.01 * rotationSpeed,
      rgb: parseColor("rgb(19,102,150)"),
      origin: "Sun",
    },
    {
      name: "Moon",
      type: "planet",
      width: 0.24 * 0.5 * scale,
      distance: 3.2 * 0.5 * scale,
      rotateSpeed: 0.0112 * rotationSpeed,
      rgb: parseColor("rgb(200, 200, 200)"),
      origin: "Earth",
    },
    {
      name: "Mars",
      type: "planet",
      width: 0.64 * 0.5 * scale,
      distance: 12.8 * 0.5 * scale,
      rotateSpeed: 0.0066 * rotationSpeed,
      rgb: parseColor("rgb(233, 88, 26)"),
      origin: "Sun",
    },
    {
      name: "Jupiter",
      type: "planet",
      width: 1.44 * 0.5 * scale,
      distance: 17.6 * 0.5 * scale,
      rotateSpeed: 0.0046 * rotationSpeed,
      rgb: parseColor("rgb(169, 109, 45)"),
      origin: "Sun",
    },
    {
      name: "Saturne",
      type: "planet",
      width: 1.2 * 0.5 * scale,
      distance: 22 * 0.5 * scale,
      rotateSpeed: 0.004 * rotationSpeed,
      rgb: parseColor("rgb(164,127,84)"),
      origin: "Sun",
    },
    {
      name: "Uranus",
      type: "planet",
      width: 0.76 * 0.5 * scale,
      distance: 25.2 * 0.5 * scale,
      rotateSpeed: 0.0037 * rotationSpeed,
      rgb: parseColor("rgb(84,149,164)"),
      origin: "Sun",
    },
    {
      name: "Netpune",
      type: "planet",
      width: 0.62 * 0.5 * scale,
      distance: 27.2 * 0.5 * scale,
      rotateSpeed: 0.0033 * rotationSpeed,
      rgb: parseColor("rgb(36,82,154)"),
      origin: "Sun",
    },
  ];
};
