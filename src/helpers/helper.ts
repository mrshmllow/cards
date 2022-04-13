import useStore, { ICard } from "../state";
import { CardTypes } from "../types/cards/card_types";
import rawNext from "./rawNext";

const { decrementDeck, decrementExplosions, shiftNext, players } =
  useStore.getState();

export const getNextCard = (
  next: ICard[],
  cards: number,
  forPlayer: number
): ICard => {
  decrementDeck();

  if (next.length !== 0) {
    shiftNext();

    // if (next[0].knownBy) {
    //   next[0].knownBy.push(forPlayer);
    // } else {
    //   next[0].knownBy = [forPlayer];
    // }

    return next[0];
  }

  let num = Math.floor(Math.random() * cards + 1);

  if (num <= players.length) {
    decrementDeck();
    decrementExplosions();

    return {
      type: CardTypes.explosion,
      knownBy: [forPlayer],
    };
  } else {
    return rawNext(forPlayer);
  }
};
