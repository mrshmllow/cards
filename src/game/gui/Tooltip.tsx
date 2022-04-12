import { useEffect, useRef } from "react";
import useStore from "../../state";
import { Html } from "@react-three/drei";

const Tooltip: React.FC = () => {
  const tooltip = useStore.useTooltip();
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("mousemove", () => {
      if (ref.current) {
        // ref.current.style.top = `${event.y + 10}`;
        // ref.current.style.left = `${event.x + 10}`;
        // const reference = ref.current as unknown as Group;
        // reference.position.set(event.y, event.x, 0);
      }
    });
  }, []);

  if (tooltip)
    return (
      <group ref={ref}>
        <Html
          className="text-white absolute bg-black p-2 flex flex-col"
          transform
        >
          <span className="text-lg">{tooltip.title}</span>
          <span>{tooltip.text}</span>
        </Html>
      </group>
    );
  return <></>;
};

export default Tooltip;
