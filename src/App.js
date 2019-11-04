import React from 'react';
import logo from './logo.svg';
import Toolbar from './layout/toolbar'
import Burger from './layout/burger'
import Home from './pages/home'
import ProductDetails from './pages/productDetails'
import ChatPage from './pages/chatPage'
import Messages from './pages/messages'
import './App.css';
import GlobalState from './context/globalState'
import {Switch, Route} from 'react-router'


function App() {
  return (
    <GlobalState>
      <div className="App">
        <Toolbar />
        <Burger />
        <div className="toolbar-filler"></div> {/* filler for fixed toolbar */}
        <header className="App-header">
         <Switch>

          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/chat/:id" component={ChatPage} />
          <Route path="/messages" component={Messages} />
          <Route path="/" component={Home} />
         </Switch>
        </header>
      </div>
    </GlobalState>
  );
}

export default App;
