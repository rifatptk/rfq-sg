import { BASE_URL } from '@/apiConfigs';
import { nationalities } from '@/constants';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const AddNewUser = () => {
  const token = localStorage.getItem('token');

  const [userInfo, setUserInfo] = useState({
    avatar: '',
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

  console.log(userInfo);

  function userInfoChangeHandler(e) {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const [isLoading, setIsLoading] = useState(false);

  function createUser(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(userInfo).forEach((entry) => {
      if (entry[1]) formData.append(entry[0], entry[1]);
    });

    fetch(BASE_URL + '/api/admin/create/user', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserInfo({
            avatar: '',
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
          toast.success(data.msg);
        } else {
          const errors = Object.values(data.mappedErrors).map(
            (el) => `${el.msg}`
          );
          toast.error(
            <div>
              <h3 className="font-bold">Errors</h3>
              {errors.map((err, i) => (
                <p key={i}>
                  <small className="capitalize">
                    {i + 1}. {err}
                  </small>
                </p>
              ))}
            </div>
          );
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
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
                className="md:col-span-2 cursor-pointer w-fit mx-auto"
                title="Click to change."
              >
                <img
                  src={
                    userInfo.avatar
                      ? URL.createObjectURL(userInfo.avatar)
                      : '/img/add-avatar.png'
                  }
                  alt="profile-pic"
                  className="w-[160px] h-[160px] rounded-full object-cover ring-4"
                />

                <p className="text-center mt-3 rounded-lg border text-gray-600 py-1">
                  Profile picture
                </p>
              </label>
              <input
                name="avatar"
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
                value={userInfo.email}
                onChange={userInfoChangeHandler}
              />
              <Input
                name="password"
                type="password"
                label="Password"
                size="lg"
                value={userInfo.password}
                onChange={userInfoChangeHandler}
              />
              <Input
                name="firstName"
                label="First Name"
                size="lg"
                onChange={userInfoChangeHandler}
                value={userInfo.firstName}
              />
              <Input
                name="middleName"
                label="Middle Name"
                size="lg"
                onChange={userInfoChangeHandler}
                value={userInfo.middleName}
              />
              <Input
                name="surName"
                label="Sur Name"
                size="lg"
                onChange={userInfoChangeHandler}
                value={userInfo.surName}
              />
              <Input
                name="title"
                label="Title"
                size="lg"
                onChange={userInfoChangeHandler}
                value={userInfo.title}
              />
              <Input
                name="phone"
                label="Tel:"
                size="lg"
                onChange={userInfoChangeHandler}
                value={userInfo.phone}
              />
              <Input
                name="passportId"
                label="Passport No."
                size="lg"
                onChange={userInfoChangeHandler}
                value={userInfo.passportId}
              />
              <select
                name="nationality"
                onChange={userInfoChangeHandler}
                value={userInfo.nationality}
                className="outline-none border border-gray-400 rounded-lg px-3 py-[10px]"
              >
                <option hidden>Select nationality</option>
                <option value="Indian">Indian</option>
                <option value="Pakistani">Pakistani</option>
                <option value="Bangladeshi">Bangladeshi</option>
                <option disabled className="font-bold">
                  All
                </option>
                {nationalities.map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </select>
              <Input
                name="nationalId"
                label="NID No."
                size="lg"
                onChange={userInfoChangeHandler}
                value={userInfo.nationalId}
              />
              <Input
                name="address"
                label="Address"
                size="lg"
                onChange={userInfoChangeHandler}
                value={userInfo.address}
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
      {isLoading && (
        <div className="fixed inset-0 grid place-items-center bg-black/80 z-50 backdrop-blur-[2px]">
          <HashLoader color="#36d7b7" />
        </div>
      )}
    </>
  );
};

export default AddNewUser;
