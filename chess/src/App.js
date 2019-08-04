import React from 'react';

import Board from './components/Board';
import GlobalStyle from './styles/global';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board/>
      <GlobalStyle/>
    </DndProvider>
  );
}

export default App;
