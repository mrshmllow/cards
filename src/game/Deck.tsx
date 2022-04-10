import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import Animation from "../animation/Animation";

const Deck: React.FC<{}> = () => {
  const ref = useRef();
  const animation = new Animation(
    19,
    0,
    (frame) => `/assets/card/explosion${frame}.png`,
    true
  );
  animation.playing = true;

  useFrame((_, delta) => {
    animation.animate(delta);
    (
      ref.current as unknown as Mesh<BufferGeometry, Material | Material[]>
    ).material = animation.material();
  });

  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[18 / 2, 25 / 2]} />
    </mesh>
    // <AnimatableMesh
    //   frames={19}
    //   currentFrame={0}
    //   resolve={(frame: number) => `/assets/card/explosion${frame}.png`}
    //   playing={true}
    //   loop={true}
    // />
  );
};

export default Deck;
