import { useState, ChangeEvent, useMemo } from "react";
import debounce from "lodash/debounce";
import { useTocFilterData } from "../../hooks/toc";

export const TocFilter = () => {
  const [text, setText] = useState("");
  const { setFilter } = useTocFilterData();
  const updateFilter = useMemo(() => debounce(setFilter, 1000), [setFilter]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;

    setText(text);
    updateFilter(text);
  };

  return (
    <div>
      <input value={text} onChange={handleChange} />
    </div>
  );
};
