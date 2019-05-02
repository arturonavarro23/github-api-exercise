import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Repositories from './repositories';
import User from './user';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p>
            <Link to="/">
              Github API
            </Link>
          </p>
        </header>
        <Route path="/" exact component={Repositories} />
        <Route path="/user/:name" component={User} />
      </div>
    </BrowserRouter>
  );
};

export default App;
