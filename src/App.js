/*global chrome*/
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from 'react-router-dom';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import {Button, Divider, Grid, List, ListItem} from '@material-ui/core';
import SignedIn from './SignedIn';
import NotSignedIn from './NotSignedIn';
import {LoginUtil} from './LoginUtil';
import Account from './Account';
import Alias from './Alias'; 
import CreateAlias from './CreateAlias'; 
import AllAliases from './AllAliases';
import ManageInvites from './ManageInvites';

function App() {

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          LoginUtil.loggedIn() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/notsignedin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  function PrivateRoute2({ children, ...rest }) {
    const [loaded, setLoaded] = React.useState(false);
    const [paid, setPaid] = React.useState(false);

    async function fetchPaid() {
      const userId = JSON.parse(atob(localStorage.getItem("jinnmailToken").split('.')[1])).userId
      const res = await fetch(`${process.env.REACT_APP_API}/user/${userId}`, {
        method: 'GET', 
        headers: {'Authorization': localStorage.getItem("jinnmailToken")},
      })
      const json = await res.json();
      setPaid(json.premium);
      setLoaded(true);
    }

    useEffect(() => {
      fetchPaid()
    }, [])

    if (loaded) {
      return (
        <Route
          {...rest}
          render={({ location }) =>
            paid ? (
              children
            ) : (
              <Redirect to="/checkout" />
            )
          }
        />
      )
    } else {
      return null;
    }
  }

  return (
    <Router>
      <Switch>
        <Route path="/notsignedin">
          <NotSignedIn />
        </Route>
        <PrivateRoute exact path="/signedin">
          <SignedIn />
        </PrivateRoute>
        <PrivateRoute exact path = "/allAliases">
          <AllAliases />
        </PrivateRoute>
        <PrivateRoute exact path="/alias/:aliasId">
          <Alias />
        </PrivateRoute>
        <PrivateRoute exact path="/account">
          <Account />
        </PrivateRoute>
        <PrivateRoute exact path="/invites">
          <ManageInvites />
        </PrivateRoute>
        <Redirect to='/signedin' />
      </Switch>
    </Router>
  );
}

export default App;

{/* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <Counter />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <span>
    <span>Learn </span>
    <a
      className="App-link"
      href="https://reactjs.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      React
    </a>
    <span>, </span>
    <a
      className="App-link"
      href="https://redux.js.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Redux
    </a>
    <span>, </span>
    <a
      className="App-link"
      href="https://redux-toolkit.js.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Redux Toolkit
    </a>
    ,<span> and </span>
    <a
      className="App-link"
      href="https://react-redux.js.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      React Redux
    </a>
  </span>
</header>
</div> */}