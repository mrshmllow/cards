import useStore from "../state";
import cardAnimations from "../types/cards/card_animations";
import { useEffect, useMemo, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { DoubleSide, Group, NearestFilter, TextureLoader } from "three";
import { degToRad } from "three/src/math/MathUtils";

const Discard: React.FC<{}> = ({}) => {
  const type = useStore.useDiscard();
  const ref = useRef(null!);

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

  useEffect(() => {
    if (type) {
      const reference = ref.current as unknown as Group;

      reference.rotation.set(degToRad(-90), 0, 0);
    }
  }, [type]);

  return (
    type && (
      <group ref={ref}>
        <mesh>
          <planeGeometry args={[18 / 2, 25 / 2]} />

          <meshLambertMaterial
            args={[{ transparent: true, side: DoubleSide, alphaTest: 0.1 }]}
            map={texture}
          />
        </mesh>
      </group>
    )
  );
};
export default Discard;
