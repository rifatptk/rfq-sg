import { BASE_URL } from '@/apiConfigs';
import { createContext, useState, useLayoutEffect } from 'react';
import { toast } from 'react-toastify';

const authContext = createContext({
  isAuth: false,
  userId: '',
  role: '',
  loading: false,
  doLogin: () => {},
  doLogout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true);
  const [loading, setloading] = useState(true);
  const [userId, setuserId] = useState(null);

  const token = localStorage.getItem('token');
  useLayoutEffect(() => {
    if (token) {
      fetch(`${BASE_URL}/api/admin/check/token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setIsAuth(true);
          } else {
            toast.error(data.msg);
            doLogout();
          }
          setloading(false);
        })
        .catch((err) => {
          toast.error('Something went wrong!');
          console.log(err);
          setloading(false);
        });
    } else {
      setIsAuth(false);
      setloading(false);
    }
  }, [token]);

  function doLogin(credentials) {
    setloading(true);

    fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          setuserId(data.userId);
        } else {
          toast.error(data.msg);
        }
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        toast.error('Something went wrong!');
      });
  }

  function doLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuth(false);
  }
  return (
    <authContext.Provider
      value={{ isAuth, loading, doLogin, doLogout, userId }}
    >
      {children}
    </authContext.Provider>
  );
};

export { authContext };
export default AuthProvider;
