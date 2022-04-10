import { LinearFilter, TextureLoader } from "three";

export const CorrectlyLoad = (img: string) => {
  const texture = new TextureLoader().load(img);
  texture.magFilter = LinearFilter;

  return texture;
};
