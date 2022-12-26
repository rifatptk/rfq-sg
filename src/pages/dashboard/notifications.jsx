import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Button,
} from '@material-tailwind/react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
// import { io } from 'socket.io-client';
// import { BASE_URL } from '@/apiConfigs';

export function Notifications() {
  // const socket = io(BASE_URL);

  // useEffect(() => {
  //   socket.on('connection', (skt) => {
  //     console.log('connected');
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [socket]);

  const colors = {
    IN_AREA: 'green',
    NOT_IN_AREA: 'red',
    NOT_RESPONDING: 'gray',
  };

  const icons = {
    IN_AREA: <CheckCircleIcon className="w-6" />,
    NOT_IN_AREA: <ExclamationTriangleIcon className="w-6" />,
    NOT_RESPONDING: <XCircleIcon className="w-6" />,
  };

  const notifications = [
    { time: '12:20', name: 'Sadman', geofence: 'IN_AREA' },
    { time: '02:20', name: 'Majedur', geofence: 'NOT_IN_AREA' },
    { time: '02:22', name: 'Bikash', geofence: 'NOT_RESPONDING' },
    { time: '02:23', name: 'Shakil', geofence: 'IN_AREA' },
    { time: '12:24', name: 'Roben', geofence: 'NOT_IN_AREA' },
  ];

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4 flex justify-between"
        >
          <Typography variant="h5" color="blue-gray">
            Notifications
          </Typography>
          <Button>Mark all as read</Button>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          {notifications.map((notification, i) => (
            <Alert
              key={i}
              color={colors[notification.geofence]}
              icon={icons[notification.geofence]}
            >
              <div className="flex justify-between">
                <span>{`${notification.name} is ${notification.geofence}`}</span>
                <small>{notification.time}</small>
              </div>
            </Alert>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;
