import React from 'react';
import logo from './logo.svg';
import Toolbar from './layout/toolbar'
import Burger from './layout/burger'
import Home from './components/home'
import './App.css';

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Burger />
      <div className="toolbar-filler"></div> {/* filler for fixed toolbar */}
      <header className="App-header">
        <Home />
      </header>
    </div>
  );
}

export default App;
