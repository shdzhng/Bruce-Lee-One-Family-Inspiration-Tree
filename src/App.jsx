import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './constants/styles';
import Graph from '../src/features/';

function App() {
  return (
    <>
      <GlobalStyle />
      <Graph />
    </>
  );
}

export default App;
