import React from "react";
import { ReactSolarSystem } from "src/ReactSolarSystem";
import { bigSolarSystem } from "src/templates/bigSolarSystem";

export const Atoms = () => {
  return <ReactSolarSystem config={{ astres: bigSolarSystem }} />;
};
