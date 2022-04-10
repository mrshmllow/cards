import { Mesh } from "three";

abstract class SingleMesh {
  abstract getMesh: () => Mesh;
}

export default SingleMesh;
