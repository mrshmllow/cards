import { Mesh, PlaneGeometry } from "three";
import SingleMesh from "../generics/SingleMesh";
import Animatable from "../generics/Animatiable";
import Animation from "../animation/Animation";
import AnimationManager from "../animation/AnimationManager";
import Clickable from "../generics/Clickable";
import { CardStatus, CardTypes } from "./cards/card_types";
import Hoverable from "../generics/Hoverable";
import Tooltip from "./hover";
import cardLore from "./cards/card_lore";

export class Card implements SingleMesh, Animatable, Clickable, Hoverable {
  private geometry: PlaneGeometry;
  private mesh: Mesh<PlaneGeometry>;

  private animations: AnimationManager;

  type: CardTypes;
  status: CardStatus;

  tooltip!: Tooltip;

  constructor(type: CardTypes, status: CardStatus = CardStatus.known) {
    this.type = type;
    this.status = status;

    // card is 18 - 24
    this.animations = new AnimationManager(
      {
        default: new Animation(
          1,
          0,
          (frame) => `/assets/card/default${frame}.png`
        ),
        unturn: new Animation(
          6,
          0,
          (frame) => `/assets/card/unturn${frame}.png`
        ),
        explosion: new Animation(
          19,
          0,
          (frame) => `/assets/card/explosion${frame}.png`
        ),
        future: new Animation(
          1,
          0,
          (frame) => `/assets/card/future${frame}.png`
        ),
        skip: new Animation(4, 0, (frame) => `/assets/card/skip${frame}.png`),
      },
      this.status === CardStatus.known ? "unturn" : "default"
    );
    this.animations.current().play();

    this.geometry = new PlaneGeometry(18 / 2, 25 / 2);
    // this.geometry = new BoxGeometry(5, 5, 5);

    this.mesh = new Mesh(this.geometry, this.animations.current().material());
    this.mesh.position.setZ(25);

    this.refreshTooltip();
  }

  click(uuid: string) {
    if (uuid === this.mesh.uuid) {
      if (this.status === CardStatus.unknown) {
        this.animations.change("unturn");
        this.animations.play();
        this.status = CardStatus.known;
        this.refreshTooltip();
      }
    }
  }

  private refreshTooltip() {
    let lore =
      cardLore[
        this.status === CardStatus.known
          ? CardTypes[this.type]
          : CardTypes[CardTypes.default]
      ];

    this.tooltip = new Tooltip(lore.title, lore.text);
  }

  hover(uuid: string): Tooltip | false {
    if (this.mesh.uuid === uuid) {
      return this.tooltip;
    } else {
      return false;
    }
  }

  setPos(x: number, y: number, z: number = this.mesh.position.z) {
    this.mesh.position.set(x, y, z);
  }

  animate(delta: number) {
    this.animations.animate(delta);

    if (
      this.animations.current().ended() &&
      this.animations.playing === "unturn"
    ) {
      let animation = "";
      if (this.type === CardTypes.explosion) {
        animation = "explosion";
      } else if (this.type === CardTypes.future) {
        animation = "future";
      } else if (this.type === CardTypes.skip) {
        animation = "skip";
      }

      this.animations.change(animation);
      this.animations.play();
    }

    this.mesh.material = this.animations.current().material();
  }

  getMesh() {
    return this.mesh;
  }

  getType() {
    return this.type;
  }
}
