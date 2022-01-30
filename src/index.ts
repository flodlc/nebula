import { SystemConfig } from "src/types";
import { Nebula } from "src/View/Nebula";

export { Nebula } from "src/View/Nebula";
export { ReactNebula } from "src/View/ReactNebula";
const createNebula = (element: HTMLElement, config: SystemConfig) => {
  return new Nebula({ config, element });
};
