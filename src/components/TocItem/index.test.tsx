import { TocItem } from ".";
import { render, screen } from "@testing-library/react";
import { TocContextProvider } from "../../contexts/toc";
import { State } from "../../slices/toc";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../App";

test.only("render", () => {
  const state: State = {
    isLoading: false,
    isError: false,
    payload: {
      // @ts-ignore
      pages: {
        ["DSM_Analysis" as string]: {
          id: "DSM_Analysis",
          title: "Dependency Structure Matrix",
          url: "dsm-analysis.html",
          parentId: "Dependencies_Analysis",
          level: 2,
          tabIndex: 0,
          doNotShowWarningLink: true,
        },
      },
    },
  };

  render(
    <ThemeProvider theme={lightTheme}>
      <TocContextProvider value={{ state, dispatch: () => null }}>
        <TocItem pageId="DSM_Analysis" />
      </TocContextProvider>
    </ThemeProvider>,
  );

  const loader = screen.getByText(/Dependency Structure Matrix/i);
  expect(loader).toBeInTheDocument();
});
