import useStore, { ICard } from "../state";
import cardChances from "../types/cards/card_chances";
import { CardTypes } from "../types/cards/card_types";

const {
  decrementDeck,
  decrementExplosions,
  deck: { cards },
  shiftNext,
  players,
} = useStore.getState();

export const getNextCard = (next: CardTypes[]): ICard => {
  if (next.length !== 0) {
    shiftNext();
    return {
      type: next[0],
      known: true,
    };
  }

  let num = Math.floor(Math.random() * cards + 1);

  if (num <= players.length) {
    decrementDeck();
    decrementExplosions();

    return {
      type: CardTypes.explosion,
      known: true,
    };
  } else {
    const weights: number[] = [];

    for (let i = 0; i < cardChances.length; i++) {
      const value = cardChances[i];

      weights[i] = value.chance + (weights[i - 1] || 0);
    }

    const random = Math.random() * weights[weights.length - 1];

    for (let i = 0; i < cardChances.length; i++) {
      const value = cardChances[i];

      if (weights[i] > random) {
        return {
          type: value.cards[
            Math.floor(Math.random() * value.cards.length)
          ] as CardTypes,
        };
      }
    }

    decrementDeck();
    console.warn(
      "There is something wrong with time and space. Gave a future card as a fallback!!"
    );
    return {
      type: CardTypes.future,
    };
  }
};
