import { BASE_URL } from '@/apiConfigs';
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
  const [isAuth, setIsAuth] = useState(true);
  const [loading, setloading] = useState(false);
  const [userId, setuserId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
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
