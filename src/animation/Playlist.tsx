import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import { DoubleSide, NearestFilter, Texture, TextureLoader } from "three";
import { IAnimation } from "../types/cards/card_animations";

const Playlist: React.FC<{
  animations: IAnimation[];
  depthResolve?: () => string;
  loop: boolean;
  playing: boolean;
}> = ({ animations, loop, playing, depthResolve }) => {
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
        const texture = useLoader(TextureLoader, animations[j].resolve(i));
        texture.magFilter = NearestFilter;

        textures.push(texture);
      }

      animationTextures[j] = textures;
    }

    return animationTextures;
  }, []);

  const defaultDepth = useMemo(() => {
    if (depthResolve) {
      const depth = useLoader(TextureLoader, depthResolve());
      depth.magFilter = NearestFilter;
      return depth;
    }
    return undefined;
  }, []);

  const depthTextures = useMemo(() => {
    const depthMaps: {
      [key: number]: Texture[];
    } = [];
    for (let j = 0; j < animations.length; j++) {
      const depthTextures = [];

      for (let i = 0; i < animations[j].frames; i++) {
        if (animations[j].depthResolve !== undefined) {
          const texture = useLoader(
            TextureLoader,
            animations[j].depthResolve!(i)
          );
          texture.magFilter = NearestFilter;

          depthTextures.push(texture);
        }
      }

      depthMaps[j] = depthTextures;
    }
    return depthMaps;
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (playing) {
          setState(({ current, frame }) => {
            if (frame + 1 === animations[current].frames) {
              if (!(current + 1 === animations.length)) {
                return {
                  current: current + 1,
                  frame: 0,
                };
              } else {
                if (loop) {
                  return {
                    current: 0,
                    frame: 0,
                  };
                }
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
      },
      animations[state.current].speed ? animations[state.current].speed : 100
    );

    return () => clearInterval(interval);
  }, [state.current]);

  return (
    <>
      <meshLambertMaterial
        args={[{ transparent: true, side: DoubleSide, alphaTest: 0.1 }]}
        map={textures[state.current][state.frame]}
        alphaMap={
          animations[state.current].depthResolve !== undefined
            ? depthTextures[state.current][state.frame]
            : defaultDepth
        }
      />
    </>
  );
};

export default Playlist;
