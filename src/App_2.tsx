import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Body } from './components_2/Body';

import { Menu } from './components_2/Menu';

import './components_2/Menu.css';

function App_2() {

  return (
    <div className="main-app">
      <Router>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Body} />
          <Route path="/create" component={Body} />
          <Route path="/edit" component={Body} />
        </Switch>
      </Router>
    </div>
  );
}

export default App_2;
