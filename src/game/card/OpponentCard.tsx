import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import Playlist from "../../animation/Playlist";
import cardAnimations from "../../types/cards/card_animations";
import { CardTypes } from "../../types/cards/card_types";

const OpponentCard: React.FC<{
  type: CardTypes;
  known?: boolean;
  moving?: Vector3;
  index: number;
}> = ({ type, moving, known }) => {
  const ref = useRef(null!);
  const refrence = ref.current as unknown as
    | Mesh<BufferGeometry, Material | Material[]>
    | undefined;

  useFrame(() => {
    if (moving) refrence!.position.lerp(moving, 0.1);
  });

  return (
    <>
      <mesh ref={ref}>
        <planeGeometry args={[18 / 2, 25 / 2]} />

        <Playlist
          animations={[
            known || type === CardTypes.explosion
              ? type === CardTypes.explosion
                ? cardAnimations["explosion"]
                : type === CardTypes.future
                ? cardAnimations["future"]
                : type === CardTypes.skip
                ? cardAnimations["skip"]
                : cardAnimations["default"]
              : cardAnimations["default"],
          ]}
          loop={false}
          playing={true}
        />
      </mesh>
    </>
  );
};

export default OpponentCard;
