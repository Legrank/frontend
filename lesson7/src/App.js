import React from 'react'
import { Game } from './features/game/game'
import {Pixiroot} from './features/pixiroot/pixiroot'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Pixiroot />
        <Game />
      </header>
    </div>
  );
}

export default App;
