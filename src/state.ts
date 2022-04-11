import create from "zustand";
import { createSelectorHooks } from "auto-zustand-selectors-hook";
import produce from "immer";
import { CardTypes } from "./types/card_types";

export interface Card {
  type: CardTypes;
}

export interface Player {
  cards: Card[];
}

interface GameState {
  tooltip: {
    title: string;
    text: string;
  } | null;
  setTooltip: (title: string, text: string) => void;
  clearTooltip: () => void;

  players: [Player, Player];
  pickupCard: (player: number, card: Card) => void;
  turn: number;

  deck: {
    cards: number;
  };
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
    cards: 0,
  },
}));

const useStore = createSelectorHooks(useStoreBase);
export default useStore;
