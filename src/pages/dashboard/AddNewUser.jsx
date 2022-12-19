import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import React from 'react';

const AddNewUser = () => {
  return (
    <>
      <div className="container mt-10 mx-auto p-4 ">
        <Card className="w-full ">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Add New User
            </Typography>
          </CardHeader>
          <CardBody className="grid md:grid-cols-2 gap-4">
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
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AddNewUser;
