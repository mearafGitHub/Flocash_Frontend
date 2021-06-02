
import './App.css';
import FormCheckout from './FormCheckout.js'
import Notify from './Notify'
import React, {Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDom from 'react-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <FormCheckout />
        </Route>
        <Route path="/notify">
          <Notify />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;

