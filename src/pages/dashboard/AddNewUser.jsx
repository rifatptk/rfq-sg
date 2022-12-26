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
import React, { useState } from 'react';

const AddNewUser = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    surName: '',
    title: '',
    phone: '',
    passportId: '',
    nationality: '',
    nationalId: '',
    address: '',
  });

  function userInfoChangeHandler(e) {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function createUser(e) {
    e.preventDefault();
    console.log(userInfo);
    e.target.reset();
  }
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
          <form onSubmit={createUser}>
            <CardBody className="grid md:grid-cols-2 gap-4">
              <Input
                required
                name="email"
                type="email"
                label="Email"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                required
                name="password"
                type="password"
                label="Password"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                required
                name="firstName"
                label="First Name"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                required
                name="middleName"
                label="Middle Name"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                required
                name="surName"
                label="Sur Name"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                required
                name="title"
                label="Title"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                required
                name="phone"
                label="Tel:"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                required
                name="passportId"
                label="Passport No."
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Select
                label="Select Nationality"
                onChange={(selected) =>
                  userInfoChangeHandler({
                    target: { name: 'nationality', value: selected },
                  })
                }
              >
                <Option value="American">American</Option>
                <Option value="British">British</Option>
                <Option value="Bangladeshi">Bangladeshi</Option>
                <Option value="Indian">Indian</Option>
              </Select>
              <Input
                required
                name="nationalId"
                label="NID No."
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                required
                name="address"
                label="Address"
                size="lg"
                onChange={userInfoChangeHandler}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddNewUser;
