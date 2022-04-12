import create from "zustand";
import { createSelectorHooks } from "auto-zustand-selectors-hook";
import produce from "immer";
import { CardTypes } from "./types/cards/card_types";
import rawNext from "./helpers/rawNext";

export interface ICard {
  type: CardTypes;
  knownBy: number[];
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
    next: ICard[];
  };
  decrementDeck: () => void;
  decrementExplosions: () => void;
  decrementSkips: () => void;
  addNext: (forPlayer: number) => void;
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
    set(
      produce<GameState>((state) => {
        state.tooltip = null;
      })
    );
  },

  players: [
    {
      cards: [],
    },
    {
      cards: [
        {
          type: CardTypes.explosion,
          knownBy: [0],
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
  addNext: (forPlayer) => {
    set(
      produce<GameState>((state) => {
        for (let i = 0; i < 3; i++) {
          if (state.deck.next[i]) {
            !state.deck.next[i].knownBy.includes(1) &&
              state.deck.next[i].knownBy.push(1);
          } else {
            state.deck.next.push(rawNext(forPlayer));
          }
        }
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
