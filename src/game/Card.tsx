import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import Animation from "../animation/AnimationComponent";
import { CardTypes } from "../types/card_types";

const Card: React.FC<{ type: CardTypes; moving?: Vector3 }> = ({
  type,
  moving,
}) => {
  const ref = useRef();
  const refrence = ref.current as unknown as Mesh<
    BufferGeometry,
    Material | Material[]
  >;

  useFrame(() => {
    if (moving) {
      refrence.position.lerp(moving, 0.1);
    }
  });

  return (
    <mesh ref={ref} position={new Vector3(0, 0, 25)}>
      <planeGeometry args={[18 / 2, 25 / 2]} />

      {type === CardTypes.default ? (
        <Animation
          frames={1}
          frame={0}
          resolve={(frame) => `/assets/card/default${frame}.png`}
          playing={true}
          loop={false}
        />
      ) : type === CardTypes.explosion ? (
        <Animation
          frames={19}
          frame={0}
          resolve={(frame) => `/assets/card/explosion${frame}.png`}
          playing={true}
          loop={false}
        />
      ) : type === CardTypes.future ? (
        <Animation
          frames={1}
          frame={0}
          resolve={(frame) => `/assets/card/future${frame}.png`}
          playing={true}
          loop={false}
        />
      ) : type === CardTypes.skip ? (
        <Animation
          frames={4}
          frame={0}
          resolve={(frame) => `/assets/card/skip${frame}.png`}
          playing={true}
          loop={false}
        />
      ) : (
        <></>
      )}
    </mesh>
  );
};

export default Card;
