import Game from "./game/game";
import { createRoot } from "react-dom/client";
import "./style.css";
import { Canvas } from "@react-three/fiber";

createRoot(document.getElementById("root")!).render(
  <Canvas>
    <Game />
  </Canvas>
);
