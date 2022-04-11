import Game from "./game/game";
import { createRoot } from "react-dom/client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "three";

const World: React.FC = () => {
  return (
    <Canvas
      camera={
        new PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
      }
    >
      <Game />
    </Canvas>
  );
};

createRoot(document.getElementById("root")!).render(<World />);
