import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Page } from "../types/api";

export type State = {
  payload?: {
    pages: Record<Page["id"], Page>;
    topLevelIds: Array<Page["id"]>;
  };
  filtredIds?: Array<Page["id"]>;
  activePageTail?: Array<Page["id"]>;
  activePage?: Page["id"];
  isLoading: boolean;
  isError: boolean;
};

const initialState: State = {
  isLoading: false,
  isError: false,
};

export const tocSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    fetchSuccess: (state, action: PayloadAction<State["payload"]>) => {
      state.payload = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    fetchError: (state) => {
      state.isError = true;
      state.isLoading = false;
      state.payload = undefined;
    },
    setActiveTail: (state, action: PayloadAction<Array<Page["id"]>>) => {
      state.activePageTail = action.payload;
    },
    setActivePageByTail: (state, action: PayloadAction<Array<Page["id"]>>) => {
      state.activePageTail = action.payload;
      state.activePage = action.payload[action.payload.length - 1];
    },
    setActivePage: (state, action: PayloadAction<Page["id"]>) => {
      state.activePage = action.payload;
    },
    setFiltredIds: (
      state,
      action: PayloadAction<Array<Page["id"]> | undefined>,
    ) => {
      state.filtredIds = action.payload;
    },
  },
});

export type Action = ReturnType<
  | (typeof tocSlice)["actions"]["fetchStart"]
  | (typeof tocSlice)["actions"]["fetchSuccess"]
  | (typeof tocSlice)["actions"]["fetchError"]
  | (typeof tocSlice)["actions"]["setActivePage"]
  | (typeof tocSlice)["actions"]["setActiveTail"]
  | (typeof tocSlice)["actions"]["setActivePageByTail"]
  | (typeof tocSlice)["actions"]["setFiltredIds"]
>;
