import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { Button, Navbar } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import MainPage from './pages/MainPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import useAuth from './hooks/auth.jsx';

const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route path={path}>
      {auth.user ? children : <Redirect to="/login" />}
    </Route>
  );
};

const App = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <>
      <Router>
        <Navbar bg="white" className="border-bottom justify-content-between">
          <Navbar.Brand as={Link} to="/">{t('header.logo')}</Navbar.Brand>
          {auth.user ? <Button onClick={auth.logOut}>{t('header.logOutButton')}</Button> : null}
        </Navbar>

        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <PrivateRoute exact path="/">
            <MainPage />
          </PrivateRoute>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
