import { BASE_URL } from '@/apiConfigs';
// import { notify } from '@/utils/notify';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const notificationContext = createContext({
  notificationArrived: false,
  setnotificationArrived: () => {},
});

const NotificationProvider = ({ children }) => {
  const [notificationArrived, setnotificationArrived] = useState(false);

  useEffect(() => {
    const toastTypes = {
      IN_AREA: 'success',
      NOT_IN_ARE: 'error',
      NOT_RESPONDING: 'warning',
    };
    const socket = io(BASE_URL);

    socket.on('connect', () => {
      console.log('Socket connection established!');
      toast[toastTypes['IN_AREA']]('Socket connection established!');
    });

    socket.on('notification', (notification) => {
      console.log(notification);
      setnotificationArrived(true);
      // toast[toastTypes]('');
      // notify();
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
