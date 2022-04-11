import { useEffect, useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import { degToRad } from "three/src/math/MathUtils";
import Animation from "../animation/AnimationComponent";
import useStore from "../state";

const Deck: React.FC<{}> = () => {
  const ref = useRef();
  const setTooltip = useStore.useSetTooltip();
  const clearTooltip = useStore.useClearTooltip();

  useEffect(() => {
    const reference = ref.current as unknown as Mesh<
      BufferGeometry,
      Material | Material[]
    >;

    reference.rotation.set(degToRad(-90), 0, 0);
  }, []);

  const onClick = () => {
    console.log("clicked");
  };

  return (
    <mesh
      ref={ref}
      onClick={onClick}
      onPointerEnter={() => setTooltip("Deck", "Text")}
      onPointerLeave={() => clearTooltip()}
    >
      <planeGeometry args={[18 / 2, 25 / 2]} />

      <Animation
        currentFrame={0}
        frames={1}
        resolve={(frame) => `/assets/card/default${frame}.png`}
        loop={false}
        playing={true}
      />
    </mesh>
  );
};

export default Deck;
