import { BASE_URL } from '@/apiConfigs';
import { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
// import { toast } from 'react-toastify';
// import { notify } from '@/utils/notify';

const notificationContext = createContext({
  notificationArrived: false,
  setnotificationArrived: () => {},
});

const NotificationProvider = ({ children }) => {
  const [notificationArrived, setnotificationArrived] = useState(false);

  useEffect(() => {
    // const toastTypes = {
    //   IN_AREA: 'success',
    //   NOT_IN_ARE: 'error',
    //   NOT_RESPONDING: 'warning',
    // };
    const socket = io(BASE_URL);

    socket.on('connect', () => {
      console.log('Socket connection established!');
    });

    socket.on('showNotification', (notification) => {
      console.log('showNotification: ', notification);
      // setnotificationArrived(true);
    });

    socket.on('demo', (msg) => {
      console.log('Demo: ', msg);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected!');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <notificationContext.Provider
      value={{ notificationArrived, setnotificationArrived }}
    >
      {children}
    </notificationContext.Provider>
  );
};

export { notificationContext };
export default NotificationProvider;
