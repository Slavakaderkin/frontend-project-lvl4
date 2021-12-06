import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '../components/Sidebar.jsx';
import Chat from '../components/Chat.jsx';
import getModal from '../components/modals/index.js';
import { fetchData } from '../services/index.js';

const renderModal = (modal) => {
  if (!modal.type) {
    return null;
  }

  const Component = getModal(modal.type);
  return <Component extra={modal.extra} />;
};

const MainPage = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="row h-100">
      <Sidebar />
      <Chat />
      {renderModal(modal)}
    </div>
  );
};

export default MainPage;
