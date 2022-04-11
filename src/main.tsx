import Game from "./game/game";
import { createRoot } from "react-dom/client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import useStore from "./state";

const World: React.FC = () => {
  const setTooltip = useStore.useSetTooltip();

  return (
    <Canvas>
      <Game />
    </Canvas>
  );
};

createRoot(document.getElementById("root")!).render(<World />);
