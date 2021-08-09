import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <p>Homepage</p>
          </Route>
          <Route exact path="/add-card">
            <p>add card</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
