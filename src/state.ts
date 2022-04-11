import create from "zustand";
import { createSelectorHooks } from "auto-zustand-selectors-hook";
import produce from "immer";

interface GameState {
  tooltip: {
    title: string;
    text: string;
  };
  setTooltip: (title: string, text: string) => void;
  clearTooltip: () => void;
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
        state.tooltip = {
          text: "",
          title: "",
        };
      })
    );
  },
}));

const useStore = createSelectorHooks(useStoreBase);
export default useStore;
