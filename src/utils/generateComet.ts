import { parseColor } from "src/utils/parseColor";

export const generateComet = ({ frequence }: { frequence: number }) => {
  return new Array(frequence).fill(0).flatMap(() => {
    const ref = "cometRef_" + Math.random();
    return [
      {
        name: ref,
        type: "galaxy",
        width: 0,
        distance: 1500,
        rotateSpeed: 0.08 + Math.random() * 0.033,
        rgb: parseColor("rgb(1, 1, 1)"),
      },
      {
        name: "Comet_" + Math.random(),
        type: "star",
        width: 0.15,
        distance: 1500 + Math.random() * 50,
        rotateSpeed: 0.2 + Math.random() * 0.1,
        origin: ref,
        rgb: parseColor("#ffffff"),
      },
    ];
  });
};

console.log(generateComet({ frequence: 1 }));
