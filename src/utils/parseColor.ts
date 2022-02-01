export const parseColor = (color: string): [number, number, number] => {
  const rgb = color.includes("#") ? hexToRGB(color) : color;
  const split = rgb.split(/[\(|,|\)]/);
  return [
    parseInt(split[1], 10),
    parseInt(split[2], 10),
    parseInt(split[3], 10),
  ];
};

function hexToRGB(color: string) {
  let r = "0",
    g = "0",
    b = "0";

  if (color.length <= 5) {
    r = "0x" + color[1] + color[1];
    g = "0x" + color[2] + color[2];
    b = "0x" + color[3] + color[3];
  } else if (color.length >= 7) {
    r = "0x" + color[1] + color[2];
    g = "0x" + color[3] + color[4];
    b = "0x" + color[5] + color[6];
  }

  return "rgb(" + +r + "," + +g + "," + +b + ")";
}

export const getRGB = (
  rgbChannels: [number, number, number],
  opacity: number
) => {
  return `rgba(${rgbChannels[0]}, ${rgbChannels[1]}, ${rgbChannels[2]}, ${opacity})`;
};
