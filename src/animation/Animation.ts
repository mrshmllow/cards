import {
  MeshBasicMaterial,
  NearestFilter,
  Texture,
  TextureLoader,
} from "three";

class Animation {
  currentFrame = 0;
  private frames;
  private loop = false;
  playing = false;
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

    const loader = new TextureLoader();

    for (var frame = 0; frame < this.frames; frame++) {
      this.loadedTextures.push(loader.load(resolve(frame)));
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
}

export default Animation;
