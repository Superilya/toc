import { useReducer, useContext, useEffect, useCallback } from "react";
import { TocContext } from "../contexts/toc";
import { tocSlice } from "../slices/toc";
import type { Page } from "../types/api";

type ApiResponse = {
  entities: {
    pages: {
      [pageId: string]: Page;
    };
  };
  topLevelIds: Array<Page["id"]>;
};

const getTailByPageId = (
  pageId: Page["id"],
  pages?: Record<Page["id"], Page>,
): Array<Page["id"]> => {
  const result: Array<Page["id"]> = [];

  if (!pages) {
    return [];
  }

  let targetPage = pages[pageId];

  while (targetPage) {
    result.unshift(targetPage.id);

    targetPage = pages[targetPage.parentId];
  }

  return result;
};

export const useTocData = (activePage?: Page["id"]) => {
  const [state, dispatch] = useReducer(
    tocSlice.reducer,
    tocSlice.getInitialState(),
  );

  useEffect(() => {
    if (activePage) {
      dispatch(
        tocSlice.actions.setActivePageByTail(
          getTailByPageId(activePage, state.payload?.pages),
        ),
      );
    }
  }, [activePage, state.payload?.pages]);

  const fetchData = useCallback(async () => {
    try {
      dispatch(tocSlice.actions.fetchStart());

      const res = await fetch("/idea/2023.1/HelpTOC.json");
      const data: ApiResponse = await res.json();

      dispatch(
        tocSlice.actions.fetchSuccess({
          pages: data.entities.pages,
          topLevelIds: data.topLevelIds,
        }),
      );
    } catch (err) {
      dispatch(tocSlice.actions.fetchError());
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    state,
    dispatch,
  };
};

export const useTocViewData = () => {
  const { state } = useContext(TocContext);

  return {
    topLevelIds: state.filtredIds || state.payload?.topLevelIds,
    isLoading: state.isLoading,
  };
};

export const useTocItemData = (pageId: Page["id"]) => {
  const { state, dispatch } = useContext(TocContext);
  const activePageTail = state.activePageTail;

  return {
    isOpen: Array.isArray(activePageTail) && activePageTail.includes(pageId),
    isActive: state.activePage === pageId,
    page: state.payload?.pages[pageId],
    setActivePage: (activePage: Page["id"]) => {
      window.history.pushState({}, "", `/${activePage}`);

      dispatch(tocSlice.actions.setActivePage(activePage));
    },
    setActivePageByTail: (activePageTail: Array<Page["id"]>) => {
      const activePage = activePageTail[activePageTail.length - 1];

      window.history.pushState({}, "", `/${activePage}`);
      dispatch(tocSlice.actions.setActivePageByTail(activePageTail));
    },
    setActiveTail: (activePageTail: string[]) => {
      dispatch(tocSlice.actions.setActiveTail(activePageTail));
    },
  };
};

export const useTocFilterData = () => {
  const { state, dispatch } = useContext(TocContext);

  return {
    setFilter: useCallback(
      (text: string) => {
        const pages = state.payload?.pages;

        if (!pages || !text) {
          dispatch(tocSlice.actions.setFiltredIds());

          return;
        }

        // TODO merge included pages
        const filtredIds = Object.values(pages)
          .filter(({ title }) =>
            title.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
          )
          .map(({ id }) => id);

        dispatch(tocSlice.actions.setFiltredIds(filtredIds));
      },
      [dispatch, state.payload?.pages],
    ),
  };
};
