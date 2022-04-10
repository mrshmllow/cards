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
import cardChances from "./cards/card_chances";
import { CardTypes } from "./cards/card_types";
import Tooltip from "./hover";

class Deck implements MultiMesh, Animatable, Hoverable, Clickable {
  cards: Card[];
  cardsLeft: number;

  geometry: PlaneGeometry;
  mesh: Mesh<PlaneGeometry>;
  animations: AnimationManager;

  tooltip = new Tooltip("Deck", "Click to pickup a card");
  explosionsLeft = 2;
  defusesLeft = 1;

  constructor() {
    this.cards = [new Card(CardTypes.explosion)];

    this.cardsLeft = 5 * 2 + 4;

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
      Client.refreshMeshes = true;
    }

    let num = Math.floor(Math.random() * this.cardsLeft + 1);

    console.log(num, this.cardsLeft);

    // 1 comes from players - 1
    if (num <= 1) {
      this.cardsLeft -= 1;
      this.explosionsLeft -= 1;
      return new Card(CardTypes.explosion);
    } else {
      num = Math.floor(Math.random() * 101);

      const chances = Object.keys(cardChances);
      for (let i = 0; i < chances.length; i++) {
        const value = chances[i];

        if (num <= +value) {
          const a =
            cardChances[value][Math.random() % cardChances[value].length];

          console.log(a);

          // CardTypes[cardChances[value][Math.random() % cardChances[value].length]]
        }
      }

      this.cardsLeft -= 1;
      return new Card(CardTypes.future);
    }

    // return this.cards.shift();
  }

  getMeshes() {
    const meshes: Mesh[] = [];

    if (this.cardsLeft !== 0) {
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
      return new Tooltip(
        this.tooltip.header,
        `Click to pickup a card. There are ${this.cardsLeft} cards left. There are ${this.explosionsLeft} bombs, and ${this.defusesLeft} defuses left.`
      );
    } else {
      return false;
    }
  }
}

export default Deck;
