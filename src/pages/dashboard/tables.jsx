import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Tooltip,
} from '@material-tailwind/react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { BASE_URL } from '@/apiConfigs';
import { useQuery } from 'react-query';
import { HashLoader } from 'react-spinners';
import { DataGrid } from '@mui/x-data-grid';
import TableToolbar from '@/components/TableToolbar';

export function Tables() {
  const token = localStorage.getItem('token');

  const {
    isLoading,
    error,
    data: users,
  } = useQuery(
    'users',
    () =>
      fetch(`${BASE_URL}/api/admin/user`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    {
      refetchInterval: 5000,
      refetchOnWindowFocus: false,
    }
  );
  function getFullName(params) {
    const { firstName, middleName, surName } = params.row.profile;
    return `${firstName} ${middleName} ${surName}`;
  }
  function renderGeofence(params) {
    const { geofence } = params.row.user;

    const indicators = {
      NOT_RESPONDING: (
        <Tooltip
          content="No response"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <XCircleIcon className="w-8 text-gray-500" />
          {/* <small className="text-[10px]">No Response</small> */}
        </Tooltip>
      ),
      IN_AREA: (
        <Tooltip
          content="In area"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <CheckCircleIcon className="w-8 text-green-500" />
          {/* <small className="text-[10px]">In Area</small> */}
        </Tooltip>
      ),
      NOT_IN_AREA: (
        <Tooltip
          content="Out of area"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <ExclamationTriangleIcon className="w-8 text-red-500" />
          {/* <small className="text-[10px]">Out Of Area</small> */}
        </Tooltip>
      ),
    };

    return (
      <div className="flex items-center gap-2">{indicators[geofence]} </div>
    );
  }

  const userColumns = [
    {
      field: 'user',
      headerName: 'User',
      minWidth: 240,
      flex: 1,
      valueGetter: getFullName,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full object-cover shrink-0"
              src={params.row.profile.avatar || '/img/add-avatar.png'}
              alt="avatar"
            />
            <div>
              <p className="font-semibold"> {getFullName(params)}</p>
              <small>{params.row.user.email}</small>
            </div>
          </div>
        );
      },
    },

    {
      field: 'geofence',
      headerName: 'Geofence',
      width: 80,
      align: 'center',
      valueGetter: (params) => params.row.user.geofence,
      renderCell: renderGeofence,
    },
    {
      field: 'address',
      headerName: 'Address',
      minWidth: 120,
      flex: 1,
      valueGetter: (params) => params.row.profile.address,
      renderCell: (params) => <small>{params.row.profile.address}</small>,
    },
    {
      field: 'tel',
      headerName: 'TEL',
      minWidth: 150,
      valueGetter: (params) => params.row.profile.phone,
    },
    {
      field: 'nid',
      headerName: 'NID',
      minWidth: 150,
      valueGetter: (params) => params.row.profile.nationalId,
    },
    {
      field: 'passport',
      headerName: 'Passport',
      minWidth: 150,
      valueGetter: (params) => params.row.profile.passportId,
    },
    {
      field: 'action',
      headerName: '',
      minWidth: 120,
      renderCell: (params) => (
        <Link to={`/dashboard/users/${params.row.user._id}`}>
          <Button size="sm">View/Edit</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0 pt-0 ">
          {!!users && (
            <DataGrid
              getRowId={(el) => el.user._id}
              rows={users?.users}
              columns={userColumns}
              rowsPerPageOptions={[5, 10, 20, 25, 50, 75, 100]}
              autoHeight
              density="standard"
              components={{ Toolbar: TableToolbar }}
              sx={{
                border: 'none',
                p: 2,
                '& .MuiDataGrid-row .MuiDataGrid-cell': {
                  borderBottom: 'none',
                },
              }}
            />
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

export default Tables;
