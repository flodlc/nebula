export const generateComet = ({ frequence }: { frequence: number }) => {
  return new Array(frequence).fill(0).flatMap(() => {
    return [
      {
        name: "comet",
        frequence,
      },
    ];
  });
};
