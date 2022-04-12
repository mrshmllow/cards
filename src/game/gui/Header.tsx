import { Html } from "@react-three/drei/web/Html";
import { useRef } from "react";
import useStore from "../../state";

const Header: React.FC = () => {
  const turn = useStore.useTurn();
  const ref = useRef();

  return (
    <>
      <group ref={ref}>
        <Html
          className="text-white bg-black text-center w-32"
          calculatePosition={(_el, _camera, size) => {
            return [size.width / 2 - 32 * 2, 0];
          }}
        >
          <span>{turn === 0 ? "Its your turn" : "Its the enemies turn"}</span>
        </Html>
      </group>
    </>
  );
};

export default Header;
