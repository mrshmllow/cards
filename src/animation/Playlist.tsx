import { useEffect, useMemo, useState } from "react";
import { NearestFilter, Texture, TextureLoader } from "three";

const Playlist: React.FC<{
  animations: {
    frames: number;
    frame: number;
    resolve: (frame: number) => string;
  }[];
  loop: boolean;
  playing: boolean;
}> = ({ animations, loop, playing }) => {
  const loader = new TextureLoader();
  const [state, setState] = useState<{ current: number; frame: number }>({
    current: 0,
    frame: 0,
  });

  const textures = useMemo(() => {
    const animationTextures: {
      [key: number]: Texture[];
    } = [];
    for (let j = 0; j < animations.length; j++) {
      const textures = [];
      for (let i = 0; i < animations[j].frames; i++) {
        const texture = loader.load(animations[j].resolve(i));
        texture.magFilter = NearestFilter;

        textures.push(texture);
      }

      animationTextures[j] = textures;
    }

    return animationTextures;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setState(({ current, frame }) => {
          if (frame + 1 === animations[current].frames) {
            if (!(current + 1 === animations.length)) {
              return {
                current: current + 1,
                frame: 0,
              };
            }
          } else {
            return {
              current,
              frame: frame + 1,
            };
          }
          return { current, frame };
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <meshBasicMaterial
      args={[{ transparent: true }]}
      map={textures[state.current][state.frame]}
    />
  );
};

export default Playlist;
