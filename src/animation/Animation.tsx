import { useEffect, useMemo, useState } from "react";
import { DoubleSide, NearestFilter, TextureLoader } from "three";
import { IAnimation } from "../types/cards/card_animations";

const Animation: React.FC<{
  animation: IAnimation;
  playing: boolean;
  loop: boolean;
}> = ({ playing, loop, animation }) => {
  const loader = new TextureLoader();

  const textures = useMemo(() => {
    const textures = [];
    for (let i = 0; i < animation.frames; i++) {
      const texture = loader.load(animation.resolve(i));
      texture.magFilter = NearestFilter;

      textures.push(texture);
    }

    return textures;
  }, []);

  const [frame, setFrame] = useState(animation.frame);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setFrame((frame) => {
          if (frame + 1 === animation.frames) {
            if (loop) {
              return 0;
            }
          } else {
            return frame + 1;
          }
          return frame;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <meshLambertMaterial
      args={[{ transparent: true, side: DoubleSide }]}
      map={textures[frame]}
    />
  );
};

export default Animation;
