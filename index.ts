import { smallSolarSystem } from "src/templates/smallSolarSystem";
import { bigSolarSystem } from "src/templates/bigSolarSystem";
import { ReactNebula } from "src/ReactNebula";
import { PlanetDescription, SunDescription } from "src/astres/types";

type AstreDescription = PlanetDescription | SunDescription;
export type { AstreDescription };
export { smallSolarSystem, bigSolarSystem, ReactNebula };
