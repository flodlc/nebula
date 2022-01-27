import React from "react";
import { ReactNebula } from "src/ReactNebula";
import { bigSolarSystem } from "src/templates/bigSolarSystem";

export const Playground = () => {
  return <ReactNebula config={{ astres: bigSolarSystem }} />;
};
