import React from "react";
import { useTocViewData } from "../../hooks/toc";
import { TocFilter } from "../TocFilter";
import { TocItem } from "../TocItem";

export const TocView = () => {
  const { isLoading, topLevelIds } = useTocViewData();

  return (
    <>
      {isLoading && <div>Loading</div>}
      {!isLoading && (
        <>
          <TocFilter />
          {Array.isArray(topLevelIds) &&
            topLevelIds.map((pageId) => (
              <TocItem key={pageId} pageId={pageId} />
            ))}
        </>
      )}
    </>
  );
};
