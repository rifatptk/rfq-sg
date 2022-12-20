import { BASE_URL } from '@/apiConfigs';
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
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
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setloading] = useState(false);
  const [userId, setuserId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    }
  }, [token]);

  function doLogin(credentials) {
    setloading(true);

    axios
      .post(`${BASE_URL}/api/admin/login`, credentials)
      .then((res) => {
        setloading(false);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        setuserId(res.data.userId);
        setIsAuth(true);
      })
      .catch((err) => {
        setloading(false);
        toast.error('Sorry, Invalid Credentials!');
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
