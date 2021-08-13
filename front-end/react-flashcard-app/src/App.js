import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar'
import AddCard from './components/AddCard';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/add-card">
            <AddCard />
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
