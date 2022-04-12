import create from "zustand";
import { createSelectorHooks } from "auto-zustand-selectors-hook";
import produce from "immer";
import { CardTypes } from "./types/cards/card_types";

export interface ICard {
  type: CardTypes;
  known?: boolean;
}

export interface Player {
  cards: ICard[];
}

interface GameState {
  tooltip: {
    title: string;
    text: string;
  } | null;
  setTooltip: (title: string, text: string) => void;
  clearTooltip: () => void;

  players: [Player, Player];
  pickupCard: (player: number, card: ICard) => void;
  placeOnDeck: (player: number, card: number) => void;
  turn: number;
  nextTurn: () => void;

  deck: {
    cards: number;
    explosions: number;
    skips: number;
    next: CardTypes[];
  };
  decrementDeck: () => void;
  decrementExplosions: () => void;
  decrementSkips: () => void;
  addNext: (types: CardTypes[]) => void;
  shiftNext: () => void;
}

const useStoreBase = create<GameState>((set) => ({
  tooltip: {
    text: "",
    title: "",
  },
  setTooltip: (title: string, text: string) =>
    set(
      produce<GameState>((state) => {
        state.tooltip = {
          text: text,
          title: title,
        };
      })
    ),
  clearTooltip: () => {
    set((state) => (state.tooltip = null));
  },

  players: [
    {
      cards: [],
    },
    {
      cards: [
        {
          type: CardTypes.future,
        },
      ],
    },
  ],
  placeOnDeck: (player, card) => {
    set(
      produce<GameState>((state) => {
        state.players[player].cards.splice(card, 1);
      })
    );
  },

  turn: 0,
  nextTurn: () => {
    set((state) => {
      if (state.turn + 1 === state.players.length) {
        state.turn = 0;
      } else {
        state.turn += 1;
      }
      return state;
    });
  },

  pickupCard: (player, card) => {
    set(
      produce<GameState>((state) => {
        state.players[player].cards = [...state.players[player].cards, card];
      })
    );
  },

  deck: {
    cards: 30,
    explosions: 1,
    skips: 1,
    next: [],
  },
  decrementDeck: () => {
    set(
      produce<GameState>((state) => {
        state.deck.cards -= 1;
      })
    );
  },
  decrementExplosions: () => {
    set(
      produce<GameState>((state) => {
        state.deck.explosions -= 1;
      })
    );
  },
  decrementSkips: () => {
    set(
      produce<GameState>((state) => {
        state.deck.skips -= 1;
      })
    );
  },
  addNext: (type) => {
    set(
      produce<GameState>((state) => {
        state.deck.next = [...state.deck.next, ...type];
      })
    );
  },

  shiftNext: () => {
    set(
      produce<GameState>((state) => {
        console.info("popping!!!");
        state.deck.next.shift();
      })
    );
  },
}));

const useStore = createSelectorHooks(useStoreBase);
export default useStore;
