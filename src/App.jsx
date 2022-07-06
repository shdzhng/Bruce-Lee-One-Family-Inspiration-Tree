import React, { useState, useEffect } from 'react';
import { Graph } from './features/graph';
import { GlobalStyle } from './constants/styles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Graph />
    </>
  );
}

export default App;
