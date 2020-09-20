import React, {useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {Button, Divider, Grid, List, ListItem} from '@material-ui/core';
import SignedIn from './SignedIn';
import NotSignedIn from './NotSignedIn';
import {LoginUtil} from './LoginUtil';
import Account from './Account';
import Alias from './Alias'; 
import CreateAlias from './CreateAlias'; 
import AllAliases from './AllAliases';
import Login from './Login'; 
import ForgotPassword from './ForgotPassword';
import VerifyCode from './VerifyCode';
import ForgotPasswordSet from './ForgotPasswordSet';
import SignUp from './SignUp'; 
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

  return (
    <Router>
      <Switch>
        <Route exact path={['/forgotPassword', '/changePassword']}>
          <ForgotPassword />
        </Route>
        <Route exact path={["/forgotPasswordSet", '/changePasswordSet']}>
          <ForgotPasswordSet />
        </Route>
        <PrivateRoute exact path="/signedin">
          <SignedIn />
        </PrivateRoute>
        <Route path="/notsignedin">
          <NotSignedIn />
        </Route>
        <PrivateRoute exact path="/alias/:aliasId">
          <Alias />
        </PrivateRoute>
        <PrivateRoute exact path="/createAlias">
          <CreateAlias />
        </PrivateRoute>
        <PrivateRoute exact path = "/allAliases">
          <AllAliases />
        </PrivateRoute>
        <PrivateRoute exact path="/account">
          <Account />
        </PrivateRoute>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/verifyCode">
          <VerifyCode />
        </Route>
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