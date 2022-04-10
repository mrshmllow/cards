import Tooltip from "../game/hover";

abstract class Hoverable {
  abstract tooltip: Tooltip;
  abstract hover: (uuid: string) => Tooltip | false;
}

export default Hoverable;
