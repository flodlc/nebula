import { AstreDescription } from "src/astres/types";

export const generateComet = ({
  frequence,
}: {
  frequence: number;
}): AstreDescription[] => {
  return new Array(frequence).fill(0).flatMap(() => {
    const ref = "cometRef_" + Math.random();
    return [
      {
        name: ref,
        type: "galaxy",
        width: 0,
        distance: 2000,
        rotateSpeed: 0.25 + Math.random() * 0.1,
        color: "rgb(1, 1, 1)",
      },
      {
        name: "Comet_" + Math.random(),
        type: "star",
        width: 0.2,
        distance: 2000 + Math.random() * 50,
        rotateSpeed: 0.55 + Math.random() * 0.3,
        origin: ref,
        color: "#ffffff",
      },
    ];
  });
};

console.log(generateComet({ frequence: 1 }));
