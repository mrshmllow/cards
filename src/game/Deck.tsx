import { useEffect, useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import { degToRad } from "three/src/math/MathUtils";
import Animation from "../animation/Animation";
import useStore from "../state";
import { getNextCard } from "./helper";

const Deck: React.FC<{}> = () => {
  const ref = useRef();
  const setTooltip = useStore.useSetTooltip();
  const pickupCard = useStore.usePickupCard();
  const turn = useStore.useTurn();
  const nextTurn = useStore.useNextTurn();

  useEffect(() => {
    const reference = ref.current as unknown as Mesh<
      BufferGeometry,
      Material | Material[]
    >;

    reference.rotation.set(degToRad(-90), 0, 0);
  }, []);

  const onClick = () => {
    if (turn === 0) {
      const next = getNextCard();
      pickupCard(turn, next);
      nextTurn();
    }
  };

  return (
    <mesh
      ref={ref}
      onClick={onClick}
      onPointerOver={() =>
        setTooltip("Deck", "Click to pickup a card (Be Careful!)")
      }
      // onPointerLeave={() => clearTooltip()}
    >
      <planeGeometry args={[18 / 2, 25 / 2]} />

      <Animation
        frame={0}
        frames={1}
        resolve={(frame) => `/assets/card/default${frame}.png`}
        loop={false}
        playing={true}
      />
    </mesh>
  );
};

export default Deck;
