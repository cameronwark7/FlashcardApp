import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar'
import AddCard from './components/AddCard';
import Homepage from './components/Homepage';
import Auth from './components/Auth';
import Study from './components/Study';
import Decks from './components/Decks';
import CreateDeck from './components/CreateDeck';

import { getDecks } from './actions/decks';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const email = user.result.email;
    const obj = {
      email
    }
    dispatch(getDecks(obj));
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/study">
            <Study />
          </Route>
          <Route exact path="/add-card">
            <AddCard />
          </Route>
          <Route exact path="/decks">
            <Decks />
          </Route>
          <Route exact path="/create-deck">
            <CreateDeck />
          </Route>
          <Route exact path="/login">
            <Auth />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
