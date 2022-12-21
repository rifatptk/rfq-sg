import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Tooltip,
  Typography,
  Input,
} from '@material-tailwind/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { BASE_URL } from '@/apiConfigs';
import { toast } from 'react-toastify';

export function MessageCard({ emergency, userId, refetch, token }) {
  const [data, setData] = useState({
    firstName: emergency?.firstName || '',
    middleName: emergency?.middleName || '',
    surName: emergency?.surName || '',
    relation: emergency?.relation || '',
    phone: emergency?.phone || '',
    title: emergency?.title || '',
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  function updateEmegencyContact(e) {
    e.preventDefault();
    fetch(`${BASE_URL}/api/admin/update/emergency/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        refetch({ force: true });
        toast.success('Updated emergency contact successfully!');
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to update emergency contact!');
      });
  }
  return (
    <>
      {emergency ? (
        <div className="flex items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-4 border">
            <div className="h-10 w-10 rounded-full grid place-items-center bg-gray-500 font-bold uppercase text-xl text-white">
              {emergency.firstName[0]}
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-semibold"
              >
                {`${emergency.firstName || 'No Name'} ${
                  emergency.middleName || ''
                } ${emergency.surName || ''} (${emergency.relation || ''})`}
              </Typography>
              <Typography className="text-xs font-normal text-blue-gray-400">
                Title: {emergency.title} | Tel: {emergency.phone}
              </Typography>
            </div>
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
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <p>No emergency contact found!</p>
          <Button size="sm" className="mt-5 block" onClick={handleOpen}>
            Add
          </Button>
        </div>
      )}

      {/* modal */}
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogHeader className="text-base md:text-xl">
          Edit Emergency Contact
        </DialogHeader>
        <form onSubmit={updateEmegencyContact}>
          <DialogBody divider className="grid md:grid-cols-2 gap-2 md:gap-4 ">
            <Input
              required
              label="First Name"
              name="firstName"
              size="md"
              value={data.firstName}
              onChange={onChangeHandler}
            />
            <Input
              required
              label="Middle Name"
              name="middleName"
              size="md"
              value={data.middleName}
              onChange={onChangeHandler}
            />
            <Input
              required
              label="Sur Name"
              name="surName"
              size="md"
              value={data.surName}
              onChange={onChangeHandler}
            />
            <Input
              required
              label="Title"
              name="title"
              size="md"
              value={data.title}
              onChange={onChangeHandler}
            />

            <Input
              required
              label="Phone"
              name="phone"
              size="md"
              value={data.phone}
              onChange={onChangeHandler}
            />
            <Input
              required
              label="relation"
              name="relation"
              size="md"
              value={data.relation}
              onChange={onChangeHandler}
            />
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
            <Button variant="gradient" color="green" type="submit">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}

MessageCard.displayName = '/src/widgets/cards/message-card.jsx';

export default MessageCard;
