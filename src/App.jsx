import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Button, Navbar } from 'react-bootstrap';
import AuthProvider from './components/AuthProvider.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MainPage from './pages/MainPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import useAuth from './hooks/auth.jsx';

import store from './store';

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
