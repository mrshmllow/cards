import { Vector3 } from "three";
import { middleOfArray } from "../../math";
import useStore from "../../state";
import OpponentCard from "../card/OpponentCard";

const Opponent: React.FC<{ number: number }> = ({ number }) => {
  const me = useStore.usePlayers()[number];

  return (
    <>
      {me.cards.map((card, index) => (
        <OpponentCard
          type={card.type}
          key={index}
          index={index}
          moving={
            new Vector3(
              me.cards.length % 2 === 0
                ? (index - middleOfArray(me.cards)) * 9.5 + 9.5 / 2
                : (index - middleOfArray(me.cards)) * 9.5,
              0,
              -23 * 2
            )
          }
        />
      ))}
    </>
  );
};

export default Opponent;
