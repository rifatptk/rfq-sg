import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Button,
} from '@material-tailwind/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { BASE_URL } from '@/apiConfigs';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import { notificationContext } from '@/context/notificationContext';

const colors = {
  IN_AREA: 'green',
  NOT_IN_AREA: 'red',
  NOT_RESPONDING: 'gray',
};

export function Notifications() {
  const [page, setPage] = useState(1);
  const token = localStorage.getItem('token');

  function fetchNotifications(page) {
    const notifications = fetch(
      `${BASE_URL}/api/admin/notification/all?page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((res) => res.json());

    return notifications;
  }

  const {
    isLoading,
    error,
    data: notifications,
    refetch,
  } = useQuery(['notifications', page], () => fetchNotifications(page), {
    keepPreviousData: true,
  });
  // console.log(notifications);
  const { notificationArrived, setnotificationArrived } =
    useContext(notificationContext);

  useEffect(() => {
    if (notificationArrived) {
      refetch();
      setnotificationArrived(false);
    }
  }, [notificationArrived, setnotificationArrived, refetch]);

  function markAllAsRead() {
    fetch(`${BASE_URL}/api/admin/notification/markallasread`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          refetch({ force: true });
          toast.success('Marked unread notifications as read!');
        } else {
          console.log(data);
          toast.error('Failed to Mark as read!');
        }
      });
  }

  return (
    <div className="mx-auto my-5 flex max-w-screen-lg flex-col gap-8">
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
          <Button size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </CardHeader>
        <CardBody className="flex flex-col gap-2 p-4">
          {notifications && (
            <>
              {notifications.Notifications.map((notification, i) => (
                <Alert
                  key={i}
                  className="p-2"
                  color={colors[notification.geofence]}
                >
                  <div className="flex justify-between items-center">
                    <span>{`${notification.name} is ${notification.geofence}`}</span>
                    <small>
                      {moment(new Date(notification.createdAt)).fromNow()}
                    </small>
                  </div>
                </Alert>
              ))}
              <div className="flex gap-3">
                <Button
                  onClick={() => setPage((prev) => --prev)}
                  disabled={page === 1}
                  size="sm"
                  className="w-fit"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </Button>
                <Button
                  disabled={Math.ceil(notifications.Total / 10) === page}
                  onClick={() => setPage((prev) => ++prev)}
                  size="sm"
                  className="w-fit"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}

          {error && (
            <div className="text-red-500 py-5 w-full text-center">
              &#9888; Error Fetching Data!
            </div>
          )}
          {isLoading && (
            <div className="w-fit mx-auto py-5">
              <HashLoader color="#36d7b7" />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;
