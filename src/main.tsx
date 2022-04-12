import Game from "./game/game";
import { createRoot } from "react-dom/client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import useStore from "./state";
import { useEffect, useRef } from "react";

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

const Gui: React.FC = () => {
  const tooltip = useStore.useTooltip();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousemove", (event) => {
      if (ref.current) {
        ref.current.style.top = `${event.y + 10}px`;
        ref.current.style.left = `${event.x + 10}px`;
      }
    });
  }, []);

  if (tooltip)
    return (
      <div ref={ref} className="text-white absolute bg-black p-2 flex flex-col">
        <span className="text-lg">{tooltip.title}</span>
        <span>{tooltip.text}</span>
      </div>
    );
  return <></>;
};

createRoot(document.getElementById("root")!).render(
  <>
    <World />
    <Gui />
  </>
);
