import { MeshBasicMaterial, NearestFilter, Texture } from "three";
import Animatable from "../generics/Animatiable";
import Client from "../main";

class Animation implements Animatable {
  currentFrame = 0;
  private frames;
  private loop = false;
  private playing = false;
  private ticks = 0;

  private loadedTextures: Texture[] = [];
  private materials: MeshBasicMaterial[] = [];

  /**
   * @param frames number of frames
   * @param currentFrame 0 indexed starting frame
   * @param resolve given a path-safe frame, what would the path be?
   */
  constructor(
    frames: number,
    currentFrame: number,
    resolve: (frame: number) => string,
    loop = false
  ) {
    this.frames = frames;
    this.currentFrame = currentFrame;

    this.loop = loop;

    for (var frame = 0; frame < this.frames; frame++) {
      this.loadedTextures.push(Client.textureLoader.load(resolve(frame)));
      this.loadedTextures[frame].magFilter = NearestFilter;

      this.materials.push(
        new MeshBasicMaterial({
          map: this.loadedTextures[frame],
          transparent: true,
        })
      );
    }
  }

  animate(delta: number) {
    this.ticks += delta;

    if (this.playing && this.ticks >= 0.1) {
      this.ticks = 0;

      if (this.currentFrame + 1 === this.frames) {
        if (this.loop) {
          this.currentFrame = 0;
        }
      } else {
        this.currentFrame += 1;
      }
    }
  }

  play() {
    this.playing = true;
  }

  pause() {
    this.playing = false;
  }

  reset() {
    this.currentFrame = 0;
  }

  ended() {
    if (this.currentFrame === this.frames - 1 && !this.loop) {
      return true;
    } else {
      return false;
    }
  }

  material() {
    return this.materials[this.currentFrame];
  }

  isPlaying() {
    return this.playing;
  }

  static pathSafeFrame(frame: number) {
    return frame + 1;
  }
}

export default Animation;
