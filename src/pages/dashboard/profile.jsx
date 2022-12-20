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
  Select,
  Option,
  Checkbox,
} from '@material-tailwind/react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { ProfileInfoCard, MessageCard } from '@/widgets/cards';
import { conversationsData } from '@/data';
import RiMap from '@/components/RiMap';
import { useState } from 'react';

export function Profile() {
  //edit profile info=========
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [profileInfo, setProfileInfo] = useState({
    firstName: '',
    middleName: '',
    surName: '',
    title: '',
    geoFenceStatus: '',
    tel: '',
    email: '',
    nationality: '',
    nid: '',
    passport: '',
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
                  Richard Davis
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
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
                'first name': 'Alec M. Thompson',
                title: 'Doctor',
                status: 'active',
                geoFenceStatus: 'Out Of Area',
                tel: '(44) 123 1234 123',
                email: 'alecthompson@mail.com',
                Nationality: 'American',
                NID: '7342-3458-5423469',
                Passport: '4545243-463454',
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
            {/* Emergency contacts */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Emergency Contacts
              </Typography>
              <ul className="flex flex-col gap-6">
                {conversationsData.map((props) => (
                  <MessageCard
                    key={props.name}
                    {...props}
                    action={
                      <Button variant="text" size="sm">
                        Delete
                      </Button>
                    }
                  />
                ))}
              </ul>
              <Button className="mt-5 block mx-auto">Add New</Button>
            </div>
          </div>
          {/* settings */}
          <div className="px-4 mb-5">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Settings
            </Typography>

            <form
              onSubmit={updateSettings}
              className="grid md:grid-cols-2 gap-5 bg-gray-100 rounded-lg shadow-inner p-5 "
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
                <div className="flex gap-6">
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
              <RiMap />
            </div>
          </div>
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
            label="Tel:"
            name="tel"
            size="md"
            value={profileInfo.tel}
            onChange={onProfileInfoChangeHandler}
          />
          <Input
            type="email"
            label="Email"
            name="email"
            size="md"
            value={profileInfo.email}
            onChange={onProfileInfoChangeHandler}
          />
          <Input
            label="Passport No."
            name="passport"
            size="md"
            value={profileInfo.passport}
            onChange={onProfileInfoChangeHandler}
          />
          <Input
            label="NID"
            name="nid"
            size="md"
            value={profileInfo.nid}
            onChange={onProfileInfoChangeHandler}
          />
          <Select
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
          </Select>
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
