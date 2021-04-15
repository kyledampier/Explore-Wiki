import logo from './logo.svg';
import NavBar from './components/NavBar';
import WikiGraph from './components/WikiGraph';
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
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/">
          <WikiGraph />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
