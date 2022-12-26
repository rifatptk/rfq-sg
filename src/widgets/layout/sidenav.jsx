import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { useMaterialTailwindController, setOpenSidenav } from '@/context';
import { authContext } from '@/context/authContext';
import { useContext } from 'react';
import {
  BellIcon,
  TableCellsIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid';

const icon = {
  className: 'w-5 h-5 text-inherit',
};
const sideNavLinks = [
  {
    icon: <TableCellsIcon {...icon} />,
    name: 'users',
    path: '/users',
  },
  {
    icon: <BellIcon {...icon} />,
    name: 'notifications',
    path: '/notifications',
  },
  {
    icon: <UserPlusIcon {...icon} />,
    name: 'Add new user',
    path: '/add-user',
  },
];

export function Sidenav({ brandImg, brandName }) {
  const { doLogout } = useContext(authContext);
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: 'bg-gradient-to-br from-blue-gray-800 to-blue-gray-900',
    white: 'bg-white shadow-lg',
    transparent: 'bg-transparent',
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === 'dark' ? 'border-white/20' : 'border-blue-gray-50'
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === 'dark' ? 'white' : 'blue-gray'}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li className="mx-3.5 mt-4 mb-2">
            <Typography
              variant="small"
              color={sidenavType === 'dark' ? 'white' : 'blue-gray'}
              className="font-black uppercase opacity-75"
            >
              Dashboard
            </Typography>
          </li>

          {sideNavLinks.map(({ icon, name, path }) => (
            <li key={name}>
              <NavLink to={`/dashboard${path}`}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? 'gradient' : 'text'}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === 'dark'
                        ? 'white'
                        : 'blue-gray'
                    }
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className="font-medium capitalize"
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
          <li className="mx-3.5 mt-20 mb-2">
            <Typography
              variant="small"
              color={sidenavType === 'dark' ? 'white' : 'blue-gray'}
              className="font-black uppercase opacity-75"
            >
              Auth
            </Typography>
          </li>
          <li>
            <Button
              variant="text"
              color="red"
              className="flex items-center gap-4 px-4 capitalize"
              fullWidth
              onClick={() => doLogout()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>

              <Typography
                color="inherit"
                className="font-medium capitalize tracking-wide"
              >
                Logout
              </Typography>
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: '/img/logo-ct.png',
  brandName: 'RFQ - SG',
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
};

Sidenav.displayName = '/src/widgets/layout/sidnave.jsx';

export default Sidenav;
