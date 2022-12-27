import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Button,
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
      // Set the interval to 5 seconds (5000 milliseconds)
      refetchInterval: 5000,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          {users && (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    'user',
                    'geofence',
                    'status',
                    'tel',
                    'NID',
                    'passport',
                    '',
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.users?.map((data, key) => {
                  const className = `py-3 px-4 ${
                    key === users.users.length - 1
                      ? ''
                      : 'border-b border-blue-gray-50'
                  }`;

                  return (
                    <tr key={key}>
                      <td className={className}>
                        <div className="flex items-center gap-2">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {`${data.profile?.firstName || 'No Name'} ${
                                data.profile?.middleName || ''
                              } ${data.profile?.surName || ''}`}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {data.user.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        {data.user.geofence === 'NOT_RESPONDING' && (
                          <div className="flex items-center gap-2">
                            <XCircleIcon className="w-8 text-gray-500" />
                            <small className="text-[10px]">No Response</small>
                          </div>
                        )}
                        {data.user.geofence === 'IN_AREA' && (
                          <div className="flex items-center gap-2">
                            <CheckCircleIcon className="w-8 text-green-500" />
                            <small className="text-[10px]">In Area</small>
                          </div>
                        )}
                        {data.user.geofence === 'NOT_IN_AREA' && (
                          <div className="flex items-center gap-2">
                            <ExclamationTriangleIcon className="w-8 text-red-500" />
                            <small className="text-[10px]">Out Of Area</small>
                          </div>
                        )}
                      </td>
                      {/* <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data.user.roles[0]}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        Staff
                      </Typography>
                    </td> */}
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={data.user.active ? 'green' : 'blue-gray'}
                          value={data.user.active ? 'active' : 'inactive'}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {data.profile?.phone || 'Empty'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {data.profile?.nationalId || 'Empty'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {data.profile?.passportId || 'Empty'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Link to={`/dashboard/users/${data.user._id}`}>
                          <Button size="sm">View/Edit</Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
