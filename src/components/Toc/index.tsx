import { useTocData } from "../../hooks/toc";
import { TocContextProvider } from "../../contexts/toc";
import { Page } from "../../types/api";
import { TocView } from "../TocView";

type Props = {
  activePage?: Page["id"];
};

export const Toc = ({ activePage }: Props) => {
  const { state, dispatch } = useTocData(activePage);

  return (
    <TocContextProvider value={{ state, dispatch }}>
      <TocView />
    </TocContextProvider>
  );
};
