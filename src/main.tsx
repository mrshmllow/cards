import { render } from "preact";
import { Canvas } from "@react-three/fiber";

render(
  <Canvas>
    <ambientLight />
  </Canvas>,
  document.body
);
