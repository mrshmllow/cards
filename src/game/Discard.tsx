import useStore from "../state";
import cardAnimations from "../types/cards/card_animations";
import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { DoubleSide, NearestFilter, TextureLoader } from "three";

const Discard: React.FC<{}> = ({}) => {
  const type = useStore.useDiscard();
  useEffect(() => console.log(type), [type]);

  const texture = useMemo(() => {
    const animation =
      cardAnimations[type === null ? "default" : type.toString()];
    const texture = useLoader(
      TextureLoader,
      animation.resolve(animation.frames - 1)
    );
    texture.magFilter = NearestFilter;
    return texture;
  }, [type]);

  return (
    <mesh>
      <planeGeometry args={[18 / 2, 25 / 2]} />

      <meshLambertMaterial
        args={[{ transparent: true, side: DoubleSide, alphaTest: 0.1 }]}
        map={texture}
      />
    </mesh>
  );
};
export default Discard;
