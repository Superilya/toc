import { createContext, Dispatch, PropsWithChildren } from "react";
import { tocSlice, type State, type Action } from "../slices/toc";

type Value = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const TocContext = createContext<Value>({
  state: tocSlice.getInitialState(),
  dispatch: () => null,
});

export const TocContextProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: Value }>) => {
  return <TocContext.Provider value={value}>{children}</TocContext.Provider>;
};
