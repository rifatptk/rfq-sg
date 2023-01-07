import { BASE_URL } from '@/apiConfigs';
import { nationalities } from '@/constants';
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
import { toast } from 'react-toastify';

const AddNewUser = () => {
  const token = localStorage.getItem('token');

  const [userInfo, setUserInfo] = useState({
    picture: '',
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
    fetch(BASE_URL + '/api/admin/create/user', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          e.target.reset();
          toast.success(data.msg);
        } else {
          const errors = Object.values(data.mappedErrors).map(
            (el) => `${el.msg}`
          );
          toast.error(
            <div>
              <h3 className="font-bold">Errors</h3>
              {errors.map((err, i) => (
                <p>
                  <small key={i} className="capitalize">
                    {i + 1}. {err}
                  </small>
                </p>
              ))}
            </div>
          );
        }
      });
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
              <label
                htmlFor="picture"
                className="col-span-2 cursor-pointer w-fit"
                title="Click to change."
              >
                <img
                  src={
                    userInfo.picture
                      ? URL.createObjectURL(userInfo.picture)
                      : '/img/add-avatar.png'
                  }
                  alt="profile-pic"
                  className="w-[160px] h-[160px] rounded-full object-cover ring-4"
                />

                <p className="text-center mt-3 rounded-lg border">
                  Profile picture
                </p>
              </label>
              <input
                name="picture"
                type="file"
                accept="image/*"
                className="hidden"
                id="picture"
                onChange={(e) =>
                  userInfoChangeHandler({
                    target: { name: e.target.name, value: e.target.files[0] },
                  })
                }
              />
              <Input
                name="email"
                type="email"
                label="Email"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                name="password"
                type="password"
                label="Password"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                name="firstName"
                label="First Name"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                name="middleName"
                label="Middle Name"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                name="surName"
                label="Sur Name"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                name="title"
                label="Title"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                name="phone"
                label="Tel:"
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
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
                <Option value="Indian">Indian</Option>
                <Option value="Pakistani">Pakistani</Option>
                <Option value="Bangladeshi">Bangladeshi</Option>
                <Option value="" className="font-bold border-b">
                  All
                </Option>
                {nationalities.map((el, i) => (
                  <Option key={i} value={el}>
                    {el}
                  </Option>
                ))}
              </Select>
              <Input
                name="nationalId"
                label="NID No."
                size="lg"
                onChange={userInfoChangeHandler}
              />
              <Input
                name="address"
                label="Address"
                size="lg"
                onChange={userInfoChangeHandler}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
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
