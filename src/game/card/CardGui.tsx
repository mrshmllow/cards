import { Html } from "@react-three/drei";
import { CardTypes } from "../../types/cards/card_types";

const CardGui: React.FC<{ type: CardTypes }> = ({ type }) => {
  return (
    <Html
      calculatePosition={(element, camera, size) => {
        return [0, size.height / 2 - 250 / 2];
      }}
      className={`w-[180px] h-[250px]`}
    >
      <img
        className="rendering-pixelated w-full h-full"
        src={`/assets/card/${type}0.png`}
      />
    </Html>
  );
};
export default CardGui;
