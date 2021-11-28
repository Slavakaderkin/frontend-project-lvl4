import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Sidebar from '../components/Sidebar.jsx';
import { fetchData } from '../services/index.js';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="row h-100">
      <Sidebar />
      <main className="col-10 d-flex flex-column flex-fill justify-content-end">
        <div>чат</div>
        <div>инпут</div>
      </main>
    </div>
  );
};

export default MainPage;
