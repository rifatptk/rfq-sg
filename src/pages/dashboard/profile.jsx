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
} from '@material-tailwind/react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { ProfileInfoCard, MessageCard } from '@/widgets/cards';
import { platformSettingsData, conversationsData } from '@/data';
import RiMap from '@/components/RiMap';
import { useState } from 'react';

export function Profile() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
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

            {/* switches */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Settings
              </Typography>
              <div className="flex flex-col gap-12">
                {platformSettingsData.map(({ title, options }) => (
                  <div key={title}>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      {title}
                    </Typography>
                    <div className="flex flex-col gap-6">
                      {options.map(({ checked, label }) => (
                        <Switch
                          key={label}
                          id={label}
                          label={label}
                          defaultChecked={checked}
                          labelProps={{
                            className: 'text-sm font-normal text-blue-gray-500',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* projects */}
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
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit User Profile.</DialogHeader>
        <DialogBody divider className="grid md:grid-cols-2 gap-4">
          <Input label="First Name" size="lg" />
          <Input label="Last Name" size="lg" />
          <Input label="Title" size="lg" />
          <Select label="Select Status">
            <Option>Active</Option>
            <Option>Inactive</Option>
          </Select>
          <Input label="Surname" size="lg" />
          <Input label="Tel:" size="lg" />
          <Input type="email" label="Email" size="lg" />
          <Input label="Passport" size="lg" />
          <Input label="NID" size="lg" />
          <Select label="Select Nationality">
            <Option>American</Option>
            <Option>British</Option>
            <Option>Bangladesh</Option>
            <Option>Indian</Option>
          </Select>
        </DialogBody>
        <DialogFooter>
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
