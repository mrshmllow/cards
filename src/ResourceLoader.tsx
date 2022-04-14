import { useMemo } from "react";
import cardAnimations from "./types/cards/card_animations";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const ResouceLoader = () => {
  useMemo(() => {
    const animations = Object.entries(cardAnimations);
    const resolves: string[] = [];
    for (let i = 0; i < animations.length; i++) {
      const [_index, animation] = animations[i];

      for (let j = 0; j < animation.frames; j++) {
        resolves.push(animation.resolve(j));
        if (animation.depthResolve) resolves.push(animation.depthResolve(j));
      }
    }

    useLoader(TextureLoader, resolves);
  }, []);

  return <></>;
};

export default ResouceLoader;
