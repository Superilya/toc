import { useTocData, TocContext } from "../../hooks/tocData";
import { Page } from "../../types/api";
import { TocItem } from "../TocItem";

type Props = {
  activePage?: Page["id"];
};

export const Toc = ({ activePage }: Props) => {
  const { isLoading, topLevelIds, state, dispatch } = useTocData(activePage);

  return (
    <TocContext.Provider value={{ state, dispatch }}>
      {isLoading && <div>Loading</div>}
      {!isLoading &&
        Array.isArray(topLevelIds) &&
        topLevelIds.map((pageId) => <TocItem key={pageId} pageId={pageId} />)}
    </TocContext.Provider>
  );
};
