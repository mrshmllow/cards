import React from "react";
import { Vector3 } from "three";
import { middleOfArray } from "../math";
import useStore from "../state";
import Card from "./Card";

const Player: React.FC<{ number: number }> = ({ number }) => {
  const me = useStore.usePlayers()[number];

  return (
    <>
      {me.cards.map((card, index) => (
        <Card
          type={card.type}
          key={index}
          moving={
            new Vector3(
              me.cards.length % 2 === 0
                ? (index - middleOfArray(me.cards)) * 9.5 + 9.5 / 2
                : (index - middleOfArray(me.cards)) * 9.5,
              0,
              25
            )
          }
        />
      ))}
    </>
  );
};

export default Player;
