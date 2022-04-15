import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import Playlist from "../../animation/Playlist";
import { CardType } from "../../types/cards/card_type";
import { AsepriteAtlas } from "../../types/aseprite";
import atlasJSON from "../../../assets/card/card.json";

const OpponentCard: React.FC<{
  type: CardType;
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
          // animations={[
          //   known || type === CardType.explosion
          //     ? type === CardType.explosion
          //       ? cardAnimations["explosion"]
          //       : type === CardType.future
          //       ? cardAnimations["future"]
          //       : type === CardType.skip
          //       ? cardAnimations["skip"]
          //       : cardAnimations["default"]
          //     : cardAnimations["default"],
          // ]}
          tags={
            known || type === CardType.explosion
              ? ["unturn", type.toString()]
              : ["default"]
          }
          atlas={atlasJSON as unknown as AsepriteAtlas}
          loop={false}
          playing={true}
        />
      </mesh>
    </>
  );
};

export default OpponentCard;
