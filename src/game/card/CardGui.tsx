import { Html } from "@react-three/drei/web/Html";
import { Vector3 } from "three";
import cardLore from "../../types/cards/card_lore";

import { CardTypes } from "../../types/cards/card_types";

const CardGui: React.FC<{ type: CardTypes; known: boolean }> = ({
  type,
  known,
}) => {
  return (
    <Html
      className={`bg-black text-white flex flex-col text-center rounded-lg p-2`}
      transform
      position={new Vector3(0, 8, 0)}
    >
      <span className="text-6xl">{cardLore[type].title}</span>
      <span className="text-xl">{cardLore[type].text}</span>
      {known && (
        <span className="text-xl">Your opponent knows you have this card.</span>
      )}
    </Html>
  );
};
export default CardGui;
