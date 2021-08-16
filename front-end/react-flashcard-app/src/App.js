import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar'
import AddCard from './components/AddCard';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Study from './components/Study';
import Decks from './components/Decks';
import CreateDeck from './components/CreateDeck';

function App() {
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
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
