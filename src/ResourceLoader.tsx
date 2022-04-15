import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import cardJSON from "../public/card.json";
import { AsepriteAtlas } from "./types/aseprite";

const paths = [(cardJSON as unknown as AsepriteAtlas).meta.image];

const ResouceLoader = () => {
  useMemo(() => {
    useLoader(TextureLoader, paths);
  }, []);

  return <></>;
};

export default ResouceLoader;
