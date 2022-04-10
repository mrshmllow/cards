import Animatable from "../old/generics/Animatiable";
import Animation from "./Animation";

class AnimationManager implements Animatable {
  animations: {
    [key: string]: Animation;
  };
  playing: string;

  constructor(animations: { [key: string]: Animation }, play: string) {
    this.animations = animations;
    this.playing = play;
  }

  animate(delta: number) {
    this.animations[this.playing].animate(delta);
  }

  current() {
    return this.animations[this.playing];
  }

  change(name: string) {
    this.playing = name;
  }

  play = () => this.current().play();

  pause = () => this.current().pause();
}

export default AnimationManager;
