import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'

import Main from '../Main/Main'
import { routes } from '../../routes'

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
          <Switch>
              {routes.map(({ path, exact = false, title, Component }, i) =>
                  <Route
                      key={i}
                      path={path}
                      exact={true}
                      render={(props) => (
                          (path === '/signin') ? <Component {...props}/> : <Main RootComponent={Component} title={title} {...props} />
                      )}
                  />
              )}
          </Switch>
      </div>
    );
  }
}

export default App;
