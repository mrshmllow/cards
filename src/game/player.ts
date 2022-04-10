import { Mesh } from "three";
import Animatable from "../generics/Animatiable";
import { middleOfArray } from "../helpers/math";
import { Card } from "./card";

class Player implements Animatable {
  hand: Card[];

  constructor() {
    this.hand = [];

    this.refreshHandPositions();
  }

  private refreshHandPositions() {
    const middle = middleOfArray(this.hand);
    const gap = 0.5;
    const cardSize = 9 + gap;

    this.hand.forEach((card, index) => {
      if (this.hand.length % 2 === 0) {
        card.setPos((index - middle) * cardSize + cardSize / 2, 0);
      } else {
        card.setPos((index - middle) * cardSize, 0);
      }
    });
  }

  addCard(card: Card) {
    this.hand.push(card);
    this.refreshHandPositions();
  }

  getHandMeshes() {
    const meshes: Mesh[] = [];

    this.hand.forEach((card) => meshes.push(card.getMesh()));

    return meshes;
  }

  animate(delta: number) {
    this.hand.forEach((card) => card.animate(delta));
  }

  click(uuid: string) {
    this.hand.forEach((card) => card.click(uuid));
  }

  hover(uuid: string) {
    for (let i = 0; i < this.hand.length; i++) {
      const card = this.hand[i];
      const tooltip = card.hover(uuid);

      if (tooltip !== false) {
        return tooltip;
      }
    }

    return false;
  }
}

export default Player;
