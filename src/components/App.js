import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Repositories from './repositories';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p>
            Github API Exercise
          </p>
        </header>
        <Route path="/" exact component={Repositories} />
      </div>
    </BrowserRouter>
  );
};

export default App;
