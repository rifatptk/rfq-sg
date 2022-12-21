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

export function MessageCard({
  firstName,
  middleName,
  surName,
  relation,
  phone,
  title,
  userId,
  _id,
}) {
  const [data, setData] = useState({
    firstName,
    middleName,
    surName,
    relation,
    phone,
    title,
  });
  // console.log(data);

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  function updateEmegencyContact() {
    console.log(userId, _id);
    handleOpen();
  }
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full grid place-items-center bg-gray-500 shadow-lg font-bold uppercase text-xl text-white">
            {firstName[0]}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 font-semibold"
            >
              {`${firstName || 'No Name'} ${middleName || ''} ${
                surName || ''
              } (${relation || ''})`}
            </Typography>
            <Typography className="text-xs font-normal text-blue-gray-400">
              {phone}
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
      {/* modal */}
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogHeader className="text-base md:text-xl">
          Edit Emergency Contact
        </DialogHeader>
        <DialogBody divider className="grid md:grid-cols-2 gap-2 md:gap-4 ">
          <Input
            label="First Name"
            name="firstName"
            size="md"
            value={data.firstName}
            onChange={onChangeHandler}
          />
          <Input
            label="Middle Name"
            name="middleName"
            size="md"
            value={data.middleName}
            onChange={onChangeHandler}
          />
          <Input
            label="Sur Name"
            name="surName"
            size="md"
            value={data.surName}
            onChange={onChangeHandler}
          />
          <Input
            label="Title"
            name="title"
            size="md"
            value={data.title}
            onChange={onChangeHandler}
          />

          <Input
            label="Phone"
            name="phone"
            size="md"
            value={data.phone}
            onChange={onChangeHandler}
          />
          <Input
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
          <Button
            variant="gradient"
            color="green"
            onClick={updateEmegencyContact}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

MessageCard.displayName = '/src/widgets/cards/message-card.jsx';

export default MessageCard;
