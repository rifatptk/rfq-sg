import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Switch,
  Tooltip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  // Select,
  // Option,
  Checkbox,
} from '@material-tailwind/react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { ProfileInfoCard, MessageCard } from '@/widgets/cards';
import { conversationsData } from '@/data';
import RiMap from '@/components/RiMap';
import { useState } from 'react';
import { BASE_URL } from '@/apiConfigs';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import HashLoader from 'react-spinners/HashLoader';

export function Profile() {
  // const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  const { userId } = useParams();
  const {
    isLoading,
    error,
    data: user,
    refetch,
  } = useQuery(['user', userId], () =>
    fetch(`${BASE_URL}/api/admin/singleUser/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json())
  );
  console.log('single-user', user);

  //edit profile info=========
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [profileInfo, setProfileInfo] = useState({
    firstName: '',
    middleName: '',
    surName: '',
    title: '',
    phone: '',
    nationalId: '',
    passportId: '',
    address: '',
  });

  console.log(profileInfo);

  function onProfileInfoChangeHandler(e) {
    const { name, value } = e.target;
    setProfileInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  //edit profile info---------

  // settings===============
  const [isActive, setisActive] = useState(true);
  function isActiveChangeHandler(e) {
    setisActive(e.target.checked);
  }

  const [permissions, setPermissions] = useState([]);
  function permissionChangeHandler(e) {
    e.target.checked
      ? setPermissions([...permissions, e.target.value])
      : setPermissions(permissions.filter((p) => p !== e.target.value));
  }
  const updateSettings = (e) => {
    e.preventDefault();
  };
  //settings----------------

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          {user && (
            <>
              <div className="mb-10 ">
                <div className="flex items-center gap-6">
                  <Avatar
                    src="/img/bruce-mars.jpeg"
                    alt="bruce-mars"
                    size="xl"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {`${user?.profile?.firstName || 'No Name'} ${
                        user?.profile?.middleName || ''
                      } ${user?.profile?.surName || ''}`}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {user?.user.roles.join(' | ')}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 ">
                {/* profile info */}
                <ProfileInfoCard
                  title="Profile Information"
                  description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                  details={{
                    name: `${user?.profile?.firstName || 'No Name'} ${
                      user?.profile?.middleName || ''
                    } ${user?.profile?.surName || ''}`,
                    title: user?.profile?.title || 'Not Set',
                    status: user?.user.active ? 'Active' : 'Inactive',
                    geoFenceStatus: user?.user.geofence,
                    phone: user?.profile?.phone || 'Empty',
                    email: user?.user.email,
                    NID: user?.profile?.nationalId || 'Empty',
                    Passport: user?.profile?.passportId || 'Empty',
                    social: (
                      <div className="flex items-center gap-4">
                        <i className="fa-brands fa-facebook text-blue-700" />
                        <i className="fa-brands fa-twitter text-blue-400" />
                        <i className="fa-brands fa-instagram text-purple-500" />
                      </div>
                    ),
                  }}
                  action={
                    <Button
                      variant="text"
                      size="sm"
                      className="rounded"
                      onClick={handleOpen}
                    >
                      <Tooltip content="Edit Profile">
                        <div className="flex items-end gap-2">
                          <span>Edit</span>
                          <PencilSquareIcon className="h-5 w-5" />
                        </div>
                      </Tooltip>
                    </Button>
                  }
                />
                {/* Emergency contacts & settings */}
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Emergency Contacts
                  </Typography>
                  <ul className="flex flex-col gap-6">
                    {user.emergency ? (
                      <MessageCard {...user.emergency} />
                    ) : (
                      'No emergency contacts found!'
                    )}
                  </ul>
                  {/* {!user.emergency && (
                    <Button className="mt-5 block">Add New</Button>
                  )} */}
                  {/* settings */}
                  <div className="px-4 mt-10">
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Settings
                    </Typography>

                    <form
                      onSubmit={updateSettings}
                      className="space-y-10 bg-gray-100 rounded-lg shadow-inner p-5 "
                    >
                      <div>
                        <h5>Status</h5>
                        <Switch
                          id="isActive"
                          label="Active"
                          checked={isActive}
                          onChange={isActiveChangeHandler}
                        />
                      </div>
                      <div>
                        <h5>Tick Desired Permisions</h5>
                        <div className="flex flex-col">
                          <Checkbox
                            label="ADMIN"
                            id="admin"
                            value="ADMIN"
                            checked={permissions.includes('ADMIN')}
                            onChange={permissionChangeHandler}
                          />
                          <Checkbox
                            label="MANAGER"
                            id="manager"
                            value="MANAGER"
                            onChange={permissionChangeHandler}
                          />
                          <Checkbox
                            label="USER"
                            id="user"
                            value="USER"
                            onChange={permissionChangeHandler}
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-fit">
                        Update
                      </Button>
                    </form>
                  </div>
                </div>
              </div>

              {/* geofence */}
              <div className="px-4 pb-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Geofence
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  Location & Geofence
                </Typography>
                <div className="mt-6">
                  <RiMap
                    geofence={
                      user.location || {
                        lat: 26.0289243,
                        long: 88.4682187,
                        radius: 200,
                      }
                    }
                    refetch={refetch}
                    userId={userId}
                    token={token}
                  />
                </div>
              </div>
            </>
          )}
          {isLoading && (
            <div className="w-fit mx-auto py-5">
              <HashLoader color="#36d7b7" />
            </div>
          )}
          {error && (
            <div className="w-fit mx-auto py-5 font-bold text-red-500">
              &#9888; Error Fetching Data!
            </div>
          )}
        </CardBody>
      </Card>
      {/* modal */}
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogHeader className="text-base md:text-xl">
          Edit User Profile.
        </DialogHeader>
        <DialogBody divider className="grid md:grid-cols-2 gap-2 md:gap-4 ">
          <Input
            label="First Name"
            name="firstName"
            size="md"
            value={profileInfo.firstName}
            onChange={onProfileInfoChangeHandler}
          />
          <Input
            label="Middle Name"
            name="middleName"
            size="md"
            value={profileInfo.middleName}
            onChange={onProfileInfoChangeHandler}
          />
          <Input
            label="Sur Name"
            name="surName"
            size="md"
            value={profileInfo.surName}
            onChange={onProfileInfoChangeHandler}
          />
          <Input
            label="Title"
            name="title"
            size="md"
            value={profileInfo.title}
            onChange={onProfileInfoChangeHandler}
          />

          <Input
            label="Phone"
            name="phone"
            size="md"
            value={profileInfo.phone}
            onChange={onProfileInfoChangeHandler}
          />
          <Input
            label="Address"
            name="address"
            size="md"
            value={profileInfo.address}
            onChange={onProfileInfoChangeHandler}
          />
          <Input
            label="Passport No."
            name="passportId"
            size="md"
            value={profileInfo.passportId}
            onChange={onProfileInfoChangeHandler}
          />
          <Input
            label="NID"
            name="nationalId"
            size="md"
            value={profileInfo.nationalId}
            onChange={onProfileInfoChangeHandler}
          />
          {/* <Select
            label="Select Nationality"
            name="nationality"
            value={profileInfo.nationality}
            onChange={(selected) =>
              setProfileInfo({ ...profileInfo, nationality: selected })
            }
          >
            <Option value="american">American</Option>
            <Option value="british">British</Option>
            <Option value="bangladeshi">Bangladeshi</Option>
            <Option value="indian">Indian</Option>
          </Select> */}
        </DialogBody>
        <DialogFooter className="py-2">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Profile;
