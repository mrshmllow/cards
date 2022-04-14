import Game from "./game/game";
import { createRoot } from "react-dom/client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, WebGLRenderer } from "three";
import { Suspense } from "react";
import ResouceLoader from "./ResourceLoader";

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
      gl={(canvas) =>
        new WebGLRenderer({
          canvas,
          antialias: true,
        })
      }
    >
      <Suspense fallback={null}>
        <ResouceLoader />
        <Game />
      </Suspense>
    </Canvas>
  );
};

createRoot(document.getElementById("root")!).render(
  <>
    <World />
    {/* <Header />
    <Tooltip /> */}
  </>
);
