import React from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';

import socketContext from '../contexts/socketContext.jsx';
import { addMessage } from '../store/slices/messagesSlice.js';

const SocketProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  socket.on('newMessage', (msg) => {
    dispatch(addMessage({ msg }));
  });

  const sendMessage = (msg) => {
    socket.emit('newMessage', msg, (response) => {
      console.log(response.status);
    });
  };

  return (
    <socketContext.Provider value={{ sendMessage }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
