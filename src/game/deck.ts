import { Mesh, PlaneGeometry } from "three";
import Animation from "../animation/Animation";
import AnimationManager from "../animation/AnimationManager";
import Animatable from "../generics/Animatiable";
import Clickable from "../generics/Clickable";
import Hoverable from "../generics/Hoverable";
import MultiMesh from "../generics/MultiMesh";
import { degrees } from "../helpers/math";
import Client from "../main";
import { Card } from "./card";
import { CardStatus, CardTypes } from "./cards/card_types";
import Tooltip from "./hover";

class Deck implements MultiMesh, Animatable, Hoverable, Clickable {
  cards: Card[];

  geometry: PlaneGeometry;
  mesh: Mesh<PlaneGeometry>;
  animations: AnimationManager;

  tooltip = new Tooltip("Deck", "Click to pickup a card");

  constructor() {
    this.cards = [
      new Card(CardTypes.future, CardStatus.unknown),
      new Card(CardTypes.skip),
      new Card(CardTypes.explosion),
    ];

    this.animations = new AnimationManager(
      {
        default: new Animation(
          1,
          0,
          (frame) => `/assets/card/default${frame}.png`
        ),
      },
      "default"
    );
    this.animations.current().play();

    this.geometry = new PlaneGeometry(18 / 2, 25 / 2);

    this.mesh = new Mesh(this.geometry, this.animations.current().material());
    // this.mesh.position.set(0, 0, -25);
    this.mesh.rotation.set(degrees(-90), 0, 0);
  }

  getNextCard() {
    if (this.cards.length === 1) {
      Client.refresh = true;
    }

    return this.cards.shift();
  }

  getMeshes() {
    const meshes: Mesh[] = [];

    if (this.cards.length !== 0) {
      meshes.push(this.mesh);
    }

    // this.cards.forEach((card) => meshes.push(card.getMesh()));

    return meshes;
  }

  animate(delta: number) {
    this.cards.forEach((card) => card.animate(delta));
  }

  click(uuid: string) {
    return this.mesh.uuid === uuid;
  }

  hover(uuid: string) {
    if (this.mesh.uuid === uuid) {
      return this.tooltip;
    } else {
      return false;
    }
  }
}

export default Deck;
