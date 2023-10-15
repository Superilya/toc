import React, { useState } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";
import { ScrollContainer } from "./components/ScrollContainer";
import { Toc } from "./components/Toc";
import { AppStyles } from "./styles";

const lightTheme: DefaultTheme = {
  app: {
    backgroundColor: "transparent",
  },
  toc: {
    color: "rgb(25, 25, 28)",
    activeColor: "white",
    activeBackgroundColor: "#6B57FF",
    openBackgroundColor: "rgb(0,0,0, 0.025)",
  },
};

const darkTheme: DefaultTheme = {
  app: {
    backgroundColor: "#19191C",
  },
  toc: {
    color: "white",
    activeColor: "white",
    activeBackgroundColor: "#6B57FF",
    openBackgroundColor: "rgb(255,255,255, 0.025)",
  },
};

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const handleChange = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const tocPageId = window.location.pathname.slice(1) || undefined;

  console.log("tocPageIdtocPageIdtocPageId", tocPageId);

  return (
    <ThemeProvider theme={theme}>
      <AppStyles />
      <div>
        <input type="checkbox" onChange={handleChange} />
        <label>dark theme</label>
      </div>
      <ScrollContainer>
        <Toc activePage={tocPageId} />
      </ScrollContainer>
    </ThemeProvider>
  );
}

export default App;
