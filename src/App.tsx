import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { ScrollContainer } from './components/ScrollContainer';
import { Toc } from './components/Toc';
import { useTocData } from './hooks/tocData';

const theme = {
  fg: "#BF4F74",
  bg: "white"
};

function App() {
  const { state, start } = useTocData();

  console.log('statestatestate', JSON.stringify(state, null, 2));

  useEffect(() => {
    console.log('gg');
    start();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ScrollContainer>
        <Toc pages={state.data.pages} topLevelIds={state.data.topLevelIds}/>
      </ScrollContainer>
    </ThemeProvider>
  );
}

export default App;
