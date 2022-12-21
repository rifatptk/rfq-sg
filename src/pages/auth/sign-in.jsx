import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react';
import { authContext } from '@/context/authContext';
import { useContext, useState } from 'react';
import BarLoader from 'react-spinners/BarLoader';

export function SignIn() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: true,
  });

  function submitHandler(e) {
    e.preventDefault();
    doLogin(credentials);
  }

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const { doLogin, loading } = useContext(authContext);
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        alt="background"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <form onSubmit={submitHandler}>
            <CardBody className="flex flex-col gap-4">
              <Input
                required
                type="email"
                label="E-mail"
                name="email"
                size="lg"
                onChange={onChangeHandler}
              />
              <Input
                required
                type="password"
                label="Password"
                name="password"
                size="lg"
                onChange={onChangeHandler}
              />
              <div className="-ml-2.5">
                <Checkbox
                  label="Remember Me"
                  name="remember"
                  defaultChecked
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      remember: e.target.checked,
                    })
                  }
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Sign In
              </Button>
              <div className="my-2">
                <BarLoader width="100%" loading={loading} color="#36d7b7" />
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
