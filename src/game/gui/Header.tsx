import { useEffect } from "react";
import useStore from "../../state";

const Header: React.FC = () => {
  const turn = useStore.useTurn();

  useEffect(() => {
    console.log(turn, "main");
  }, [turn]);

  return (
    <>
      <div className="absolute top-0 left-1/2 translate-x-1/2 text-white bg-black flex flex-col">
        {turn === 0 ? (
          <span>Its your turn</span>
        ) : (
          <span>Its player {turn}'s turn</span>
        )}
      </div>
    </>
  );
};

export default Header;
