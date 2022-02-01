export const Random = {
  between: (min: number, max: number) => min + Math.random() * (max - min),
  around: (value: number, tolerance: number, unit?: "%") => {
    if (unit === "%") {
      tolerance = tolerance * value;
    }
    return value - tolerance + Math.random() * tolerance * 2;
  },
  positiveOrNegative: () => (Math.random() > 0.5 ? 1 : -1),
  randomizeArray: (array: any[]) =>
    array.slice().sort(Random.positiveOrNegative),
};
