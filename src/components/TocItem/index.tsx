import { useMemo, memo } from "react";
import { Transition } from "react-transition-group";
import { useTocItemData } from "../../hooks/tocData";
import { TocItemLabel, TocItemChildren, TocItemChildrenOffset } from "./styles";

type Props = {
  pathTail?: string[];
  pageId: string;
};

export const TocItem = memo(({ pageId, pathTail = [] }: Props) => {
  const {
    isActive,
    page,
    setActivePageByTail,
    setActiveTail,
    setActivePage,
    isOpen,
  } = useTocItemData(pageId);
  const nextPathTail = useMemo(() => {
    return pathTail.concat(pageId);
  }, [pathTail, pageId]);

  if (!page) {
    return null;
  }

  const hasChildren = Array.isArray(page.pages);
  const handleClick = () => {
    if (hasChildren && isOpen && isActive) {
      setActiveTail(pathTail);

      return;
    }

    if (isOpen) {
      setActiveTail(pathTail);
      setActivePage(pageId);

      return;
    }

    setActivePageByTail(nextPathTail);
  };

  return (
    <div>
      <TocItemLabel
        onClick={handleClick}
        isOpen={isOpen}
        hasChildren={hasChildren}
        isActive={isActive}
        offset={nextPathTail.length}
      >
        {page.title}
      </TocItemLabel>
      {Array.isArray(page.pages) && (
        <TocItemChildrenOffset isOpen={isOpen}>
          <Transition in={isOpen} timeout={500}>
            {(state) => (
              <TocItemChildren state={state}>
                {(state === "entered" ||
                  state === "entering" ||
                  state === "exiting") &&
                  page.pages.map((id) => (
                    <TocItem key={id} pageId={id} pathTail={nextPathTail} />
                  ))}
              </TocItemChildren>
            )}
          </Transition>
        </TocItemChildrenOffset>
      )}
    </div>
  );
});
