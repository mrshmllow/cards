import {
  addEffect,
  MeshBasicMaterialProps,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  BufferGeometry,
  Material,
  Mesh,
  MeshBasicMaterial,
  NearestFilter,
  TextureLoader,
} from "three";

const Animation: React.FC<{
  frames: number;
  currentFrame: number;
  resolve: (frame: number) => string;
  playing: boolean;
  loop: boolean;
}> = ({ currentFrame, frames, playing, loop, resolve }) => {
  const loader = new TextureLoader();
  const ref = useRef();
  const materials = useMemo(() => {
    const materials = [];
    for (let i = 0; i < frames; i++) {
      const texture = loader.load(resolve(i));
      texture.magFilter = NearestFilter;
      const material = new MeshBasicMaterial({
        map: texture,
        transparent: true,
      });

      materials.push(material);
    }

    return materials;
  }, []);
  let ticks = 0;

  const [frame, setFrame] = useState(currentFrame);

  useFrame((_, delta) => {
    ticks += delta;

    if (playing && ticks >= 0.1) {
      ticks = 0;

      if (frame + 1 === frames) {
        if (loop) {
          currentFrame = 0;
        }
      } else {
        currentFrame += 1;
      }

      (
        ref.current as unknown as Mesh<BufferGeometry, Material | Material[]>
      ).material = materials[currentFrame];
    }
  });

  useEffect(() => console.log(currentFrame), [currentFrame]);

  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[18 / 2, 25 / 2]} />
    </mesh>
  );
};

export default Animation;
