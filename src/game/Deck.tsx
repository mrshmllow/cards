import { useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { NearestFilter, Texture, TextureLoader } from "three";
import Animation from "../animation/AnimationComponent";

const Deck: React.FC<{}> = () => {
  const ref = useRef();

  const textures: Texture[] = [];
  const materials: JSX.Element[] = [];

  for (let i = 0; i < 19; i++) {
    const texture = useLoader(TextureLoader, `/assets/card/explosion${i}.png`);
    texture.magFilter = NearestFilter;

    textures.push(texture);

    materials.push(
      <meshBasicMaterial args={[{ transparent: true }]} map={texture} key={i} />
    );
  }

  let [frame, setFrame] = useState(0);

  useEffect(
    () =>
      void setInterval(() => {
        setFrame((frame) => frame + 1);
      }, 500),
    []
  );

  return (
    <mesh>
      <planeGeometry args={[18 / 2, 25 / 2]} />

      <Animation
        currentFrame={0}
        frames={19}
        resolve={(frame) => `/assets/card/explosion${frame}.png`}
        loop={true}
        playing={true}
      />
    </mesh>
  );
};

export default Deck;
