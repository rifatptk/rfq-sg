import {
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  // UserPlusIcon,
  // PlusCircleIcon,
} from '@heroicons/react/24/solid';
import { Tables, Notifications } from '@/pages/dashboard';
import { SignIn } from '@/pages/auth';
// import AddNewUser from './pages/dashboard/AddNewUser';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <TableCellsIcon {...icon} />,
        name: 'users',
        path: '/users',
        element: <Tables />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: 'notifications',
        path: '/notifications',
        element: <Notifications />,
      },
      // {
      //   icon: <PlusCircleIcon {...icon} />,
      //   name: 'add new user',
      //   path: '/add-user',
      //   element: <AddNewUser />,
      // },
    ],
  },
  {
    title: 'auth pages',
    layout: 'auth',
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: 'sign in',
        path: '/sign-in',
        element: <SignIn />,
      },
      // {
      //   icon: <UserPlusIcon {...icon} />,
      //   name: "sign up",
      //   path: "/sign-up",
      //   element: <SignUp />,
      // },
    ],
  },
];

export default routes;
