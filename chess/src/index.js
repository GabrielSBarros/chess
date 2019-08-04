import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import GlobalStyle from './styles/global';


import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { observe } from './Game';


//ReactDOM.render(<App />, document.getElementById('root'));

observe((piecesPosition, pieces) => 
  ReactDOM.render((
    <DndProvider backend={HTML5Backend}>
      <Board piecesPosition={piecesPosition} pieces={pieces}/>
      <GlobalStyle/>
    </DndProvider>
    ),
    document.getElementById('root'),
  )
); 

