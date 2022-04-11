import create from "zustand";
import { createSelectorHooks } from "auto-zustand-selectors-hook";
import produce from "immer";
import { CardTypes } from "./types/cards/card_types";

export interface ICard {
  type: CardTypes;
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
  turn: number;

  deck: {
    cards: number;
    explosions: number;
    skips: number;
  };
  decrementDeck: () => void;
  decrementExplosions: () => void;
  decrementSkips: () => void;
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
      cards: [],
    },
  ],
  turn: 0,
  pickupCard: (player, card) => {
    set(
      produce<GameState>((state) => {
        state.players[player].cards = [...state.players[player].cards, card];
      })
    );
  },

  deck: {
    cards: 100,
    explosions: 2,
    skips: 1,
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
}));

const useStore = createSelectorHooks(useStoreBase);
export default useStore;
