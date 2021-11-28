import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Button, Navbar } from 'react-bootstrap';

import LoginPage from './pages/LoginPage.jsx';
import MainPage from './pages/MainPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import useAuth from './hooks/index.jsx';
import authContext from './contexts/index.jsx';

import store from './store';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
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

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <Navbar bg="white" className="border-bottom justify-content-between">
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          <LogOutButton />
        </Navbar>

        <Switch>
          <PrivateRoute exact path="/">
            <MainPage />
          </PrivateRoute>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  </Provider>
);

export default App;
