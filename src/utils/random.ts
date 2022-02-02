export const Random = {
  between: (min: number, max: number) => min + Math.random() * (max - min),
  around: (value: number, tolerance: number, unit?: "%") => {
    if (unit === "%") {
      tolerance = tolerance * value;
    }
    return value - tolerance + Math.random() * tolerance * 2;
  },
  positiveOrNegative: () => (Math.random() > 0.5 ? 1 : -1),
  randomizeArray: (array: any[]) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  },
};
