import React from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';

import socketContext from '../contexts/socketContext.jsx';
import { addMessage } from '../store/slices/messagesSlice.js';
import {
  addChannel,
  setCurrentChannelId,
  changeName,
  removeChannel,
} from '../store/slices/channelsSlice.js';

const SocketProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  socket.on('newMessage', (msg) => {
    dispatch(addMessage({ msg }));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel({ channel }));
    dispatch(setCurrentChannelId(channel.id));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(changeName({ channel }));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(removeChannel({ id }));
  });

  const sendMessage = (msg) => {
    socket.emit('newMessage', msg, (response) => {
      console.log(response.status);
    });
  };

  const createChannel = (channel) => {
    socket.emit('newChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  const deleteChannel = (channel) => {
    socket.emit('removeChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  return (
    <socketContext.Provider value={{
      sendMessage,
      createChannel,
      renameChannel,
      deleteChannel,
    }}
    >
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
