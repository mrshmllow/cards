import { Mesh } from "three";

abstract class MultiMesh {
  abstract getMeshes: () => Mesh[];
}

export default MultiMesh;
