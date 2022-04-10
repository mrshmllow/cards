import { Mesh } from "three";
import Animatable from "../generics/Animatiable";
import MultiMesh from "../generics/MultiMesh";
import Client from "../main";
import Deck from "./deck";
import Tooltip from "./hover";
import Opponent from "./opponent";
import Player from "./player";

class Game implements MultiMesh, Animatable {
  players: [Player, Opponent] = [new Player(), new Opponent()];
  deck = new Deck();

  constructor() {}

  getMeshes() {
    const meshes: Mesh[] = [...this.deck.getMeshes()];

    // this.players.forEach((player) => meshes.push(...player.getHandMeshes()));
    meshes.push(...this.players[0].getHandMeshes());

    return meshes;

    // return this.deck.getMeshes();
  }

  click(uuid: string) {
    // this.players.forEach((player) => player.click(uuid));
    this.players[0].click(uuid);

    if (this.deck.click(uuid)) {
      const next = this.deck.getNextCard();
      Client.refreshTooltips = true;

      if (next) {
        this.players[0].addCard(next);
        Client.refreshMeshes = true;
      }
    }
  }

  hover(uuid: string): Tooltip | false {
    const deck = this.deck.hover(uuid);
    const player = this.players[0].hover(uuid);

    if (deck !== false) {
      return deck;
    } else if (player !== false) {
      return player;
    }
    return false;
  }

  animate(delta: number) {
    // this.players.forEach((player) => player.animate(delta));
    this.players[0].animate(delta);
    // this.deck.animate(delta);
  }
}

export default Game;
