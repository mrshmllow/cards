import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { TextureLoader } from "three";
import cardAnimations from "./types/cards/card_animations";

const ResouceLoader = () => {
  useMemo(() => {
    const animations = Object.entries(cardAnimations);
    for (let i = 0; i < animations.length; i++) {
      const [_index, animation] = animations[i];

      console.log(animation);

      for (let j = 0; j < animation.frames; j++) {
        // console.log(index, animation.resolve(j));
        useLoader(TextureLoader, animation.resolve(j));
        if (animation.depthResolve)
          useLoader(TextureLoader, animation.depthResolve(j));
      }
    }
  }, []);

  return <></>;
};

export default ResouceLoader;
