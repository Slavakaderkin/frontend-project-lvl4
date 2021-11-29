import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Sidebar from '../components/Sidebar.jsx';
import Chat from '../components/Chat.jsx';
import { fetchData } from '../services/index.js';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="row h-100">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default MainPage;
