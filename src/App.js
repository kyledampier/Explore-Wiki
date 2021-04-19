import logo from './logo.svg';
import NavBar from './components/NavBar';
import WikiGraph from './components/WikiGraph';
import WikiConnect from './components/WikiConnect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
    <div>
      <NavBar/>
      <Switch>
        <Route path="/search">
          <WikiConnect />
        </Route>
        <Route path="/">
          <WikiGraph />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
