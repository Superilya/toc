import { render, screen } from "@testing-library/react";
import { TocContextProvider } from "../../contexts/toc";
import { TocView } from ".";
import { State } from "../../slices/toc";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../App";

test("render loader", () => {
  const state: State = {
    isLoading: true,
    isError: false,
  };

  render(
    <ThemeProvider theme={lightTheme}>
      <TocContextProvider value={{ state, dispatch: () => null }}>
        <TocView />
      </TocContextProvider>
    </ThemeProvider>,
  );

  const loader = screen.getByText(/loading/i);
  expect(loader).toBeInTheDocument();
});
