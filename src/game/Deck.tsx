import Animation from "../animation/AnimationComponent";

const Deck: React.FC<{}> = () => {
  return (
    // <mesh>
    //   <planeBufferGeometry args={[18 / 2, 25 / 2]} />

    <Animation
      frames={19}
      currentFrame={0}
      resolve={(frame: number) => `/assets/card/explosion${frame}.png`}
      playing={true}
      loop={true}
    />
    // </mesh>
  );
};

export default Deck;
