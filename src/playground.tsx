import React from "react";
import { ReactNebula } from "src/ReactNebula";
import { smallSolarSystem } from "src/templates/smallSolarSystem";
import { bigSolarSystem } from "src/templates/bigSolarSystem";

export const Playground = () => {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <ReactNebula config={{ astres: [] }} />
      </div>
      <div style={{ height: "100vh" }}>
        <ReactNebula config={{ astres: bigSolarSystem }} />
      </div>
      <div style={{ height: "100vh" }}>
        <ReactNebula config={{ astres: smallSolarSystem }} />
      </div>
    </>
  );
};
