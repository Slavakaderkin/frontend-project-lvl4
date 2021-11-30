import React, { useState } from 'react';

import authContext from '../contexts/authContext.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  console.group();
  console.log(loggedIn);
  console.log(username);
  console.groupEnd();

  const logIn = (data) => {
    setUsername(data.username);
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(true);
  };

  const logOut = () => {
    setUsername(null);
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider
      value={{
        loggedIn,
        username,
        logIn,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
