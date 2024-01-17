import { create } from "zustand";

import { DragCourseType } from "@/types/item-type";

interface NotStartedStore {
  board: DragCourseType[];
  addImageToBoard: (item: DragCourseType) => void;
  removeItemFromBoard: (id: string) => void;
  setBoard: (board: DragCourseType[]) => void;
}

const useNotStarted = create<NotStartedStore>((set) => ({
  board: [],
  addImageToBoard: (item) => {
    set((state) => {
      const updatedBoard = [item, ...state.board];

      return { ...state, board: updatedBoard };
    });
  },
  removeItemFromBoard: (id) => {
    set((state) => {
      const updatedBoard = state.board.filter((item) => item.id !== id);
      return { ...state, board: updatedBoard };
    });
  },
  setBoard: (board) => set({ board }),
}));

export default useNotStarted;
