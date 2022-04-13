import { useEffect, useMemo, useState } from "react";
import { DoubleSide, NearestFilter, TextureLoader } from "three";

const Animation: React.FC<{
  frames: number;
  frame: number;
  resolve: (frame: number) => string;
  playing: boolean;
  loop: boolean;
}> = ({ frame: currentFrame, frames, playing, loop, resolve }) => {
  const loader = new TextureLoader();

  const textures = useMemo(() => {
    const textures = [];
    for (let i = 0; i < frames; i++) {
      const texture = loader.load(resolve(i));
      texture.magFilter = NearestFilter;

      textures.push(texture);
    }

    return textures;
  }, []);

  const [frame, setFrame] = useState(currentFrame);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setFrame((frame) => {
          if (frame + 1 === frames) {
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
