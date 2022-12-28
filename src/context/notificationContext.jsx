import { BASE_URL } from '@/apiConfigs';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const notificationContext = createContext({
  connected: false,
});

const AuthProvider = ({ children }) => {
  const socket = io(BASE_URL);

  useEffect(() => {
    socket.on('connect', (skt) => {
      console.log('socket connected');

      socket.emit('usermsg', 'this is user message!');
      socket.on('usermsg', (msg) => {
        console.log(msg);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <notificationContext.Provider
    // value={}
    >
      {children}
    </notificationContext.Provider>
  );
};

export { notificationContext };
export default AuthProvider;
