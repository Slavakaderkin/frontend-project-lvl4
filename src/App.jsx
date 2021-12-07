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
import SocketProvider from './components/SocketProvider.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MainPage from './pages/MainPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import useAuth from './hooks/auth.jsx';

import store from './store';

const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route path={path}>
      {auth.user ? children : <Redirect to="/login" />}
    </Route>
  );
};

const LogOutButton = () => {
  const auth = useAuth();

  return (
    auth.user
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
};

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Navbar bg="white" className="border-bottom justify-content-between">
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            <LogOutButton />
          </Navbar>

          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute exact path="/">
              <MainPage />
            </PrivateRoute>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </SocketProvider>
    </AuthProvider>
  </Provider>
);

export default App;
