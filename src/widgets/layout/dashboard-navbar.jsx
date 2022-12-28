import { useLocation, Link } from 'react-router-dom';
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import { Cog6ToothIcon, Bars3Icon } from '@heroicons/react/24/solid';
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from '@/context';
import { useQuery } from 'react-query';
import { BASE_URL } from '@/apiConfigs';
import { useContext, useEffect, useState } from 'react';
import { BellIcon, ClockIcon } from '@heroicons/react/24/outline';
import { HashLoader } from 'react-spinners';
import { notificationContext } from '@/context/notificationContext';
import { toast } from 'react-toastify';
import moment from 'moment/moment';

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split('/').filter((el) => el !== '');

  const token = localStorage.getItem('token');

  const { data } = useQuery('users', () =>
    fetch(`${BASE_URL}/api/admin/user`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json())
  );

  const [input, setinput] = useState('');

  function filterSearchedUsers() {
    const filteredUsers = data?.users.filter((user) => {
      return JSON.stringify(user).toLowerCase().includes(input.toLowerCase());
    });

    return filteredUsers;
  }

  function renderFullname(user) {
    return `${user.profile?.firstName || 'No Name'} ${
      user?.profile?.middleName || ''
    } ${user?.profile?.surName || ''}`;
  }

  function fetchUnreadNotifications(page) {
    const notifications = fetch(`${BASE_URL}/api/admin/notification/unread`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

    return notifications;
  }

  const {
    isLoading,
    error,
    data: unreadNotifications,
    refetch,
  } = useQuery('unreadNotifications', fetchUnreadNotifications, {
    // Set the interval to 5 seconds (5000 milliseconds)
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
  });
  // console.log(unreadNotifications);
  const { notificationArrived, setnotificationArrived } =
    useContext(notificationContext);

  useEffect(() => {
    if (notificationArrived) {
      refetch({ force: true });
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
    <Navbar
      color={fixedNavbar ? 'white' : 'transparent'}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? 'sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5'
          : 'px-0 py-1'
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? 'mt-1' : ''
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            {page && (
              <Link to={`/${layout}/${page}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                >
                  {page}
                </Typography>
              </Link>
            )}
          </Breadcrumbs>
        </div>
        <div className="flex items-center">
          <div className="relative mr-auto md:mr-4 md:w-56">
            <Input
              label="Type here"
              value={input}
              onChange={(e) => setinput(e.target.value)}
            />
            {input && (
              <div className="absolute overflow-x-hidden overflow-y-auto right-0 top-12 max-h-[400px] w-[300px] divide-y-2 bg-gray-100 border shadow-lg rounded-lg z-10">
                {filterSearchedUsers().map((user, i) => (
                  <Link
                    to={`/dashboard/users/${user.user._id}`}
                    onClick={(e) => setinput('')}
                    title="Click to see details"
                    key={i}
                    className="text-gray-600 px-5 py-2 block hover:bg-gray-300"
                  >
                    <div className="text-sm">{renderFullname(user)}</div>
                    <div className="text-[12px]">{user.user.email}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <Menu>
            <MenuHandler className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-200 ml-4">
              <div className="">
                <BellIcon className="h-6 w-6 text-blue-gray-500" />
                {!!unreadNotifications?.unreadNotificatin.length && (
                  <div className="absolute top-0 right-0 bg-red-500 text-[12px] w-5 h-5 rounded-full grid place-items-center">
                    {unreadNotifications.unreadNotificatin.length}
                  </div>
                )}
              </div>
            </MenuHandler>
            <MenuList className="w-max max-h-[400px] ">
              {unreadNotifications?.unreadNotificatin.map((notification, i) => (
                <MenuItem key={i} className="flex items-center gap-3">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-normal"
                    >
                      <strong>{notification.name}</strong> is{' '}
                      {notification.geofence}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-1 text-xs font-normal opacity-60"
                    >
                      <ClockIcon className="h-3.5 w-3.5" />{' '}
                      {moment(new Date(notification.createdAt)).fromNow()}
                    </Typography>
                  </div>
                </MenuItem>
              ))}
              {unreadNotifications?.unreadNotificatin.length && (
                <Button
                  size="sm"
                  className="my-3 block mx-auto"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
              {isLoading && (
                <div className="w-fit mx-auto py-5">
                  <HashLoader color="#36d7b7" />
                </div>
              )}
              {error && (
                <div className="text-red-500 py-5 w-full text-center">
                  &#9888; Error Fetching Data!
                </div>
              )}
              {!unreadNotifications?.unreadNotificatin.length && (
                <div className="py-5 w-full text-center">
                  &#9888; No new notifications!
                </div>
              )}
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = '/src/widgets/layout/dashboard-navbar.jsx';

export default DashboardNavbar;
