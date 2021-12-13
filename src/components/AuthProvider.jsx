import React, { useState } from 'react';

import authContext from '../contexts/authContext.jsx';

const getUser = () => {
  const user = localStorage.getItem('userId');

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const logIn = (data) => {
    setUser(data);
    localStorage.setItem('userId', JSON.stringify(data));
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('userId');
  };

  return (
    <authContext.Provider
      value={{
        user,
        logIn,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
