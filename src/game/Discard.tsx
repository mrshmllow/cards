import useStore from "../state";
import { useEffect, useMemo, useRef } from "react";
import { Group } from "three";
import { degToRad } from "three/src/math/MathUtils";
import StaticFrame from "../animation/StaticFrame";
import atlasJSON from "../../assets/card/card.json";
import { AsepriteAtlas } from "../types/aseprite";

const Discard: React.FC<{}> = ({}) => {
  const type = useStore.useDiscard();
  const ref = useRef(null!);

  const tag = useMemo(() => {
    if (type) {
      return atlasJSON.meta.frameTags.find(
        (tag) => tag.name === type.toString()
      );
    } else return undefined;
  }, [atlasJSON, type]);

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

          <StaticFrame
            atlas={atlasJSON as unknown as AsepriteAtlas}
            frame={tag!.to}
          />
        </mesh>
      </group>
    )
  );
};
export default Discard;
