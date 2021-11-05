import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { Button, Navbar } from 'react-bootstrap';

import LoginPage from './LoginPage.jsx';
import MainPage from './MainPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

import useAuth from '../hooks/index.jsx';
import authContext from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);

  const logIn = (token) => {
    setLoggedIn(true);
    localStorage.setItem('userId', token);
  };

  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('userId');
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route path={path}>
      {auth.loggedIn ? children : <Redirect to="/login" />}
    </Route>
  );
};

const LogOutButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
};

const App = () => {
  const auth = useAuth();
  return (
    <AuthProvider>
      <Router>
        <Navbar bg="white" className="shadow-sm justify-content-between">
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          <LogOutButton />
        </Navbar>

        <Switch>
          <PrivateRoute exact path="/">
            <MainPage />
          </PrivateRoute>
          <Route exact path="/login">
            {auth.loggedIn ? <Redirect to="/" /> : <LoginPage />}
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
