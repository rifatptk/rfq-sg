import { createContext, useState } from 'react';

const authContext = createContext({
  isAuth: false,
  user: {},
  role: '',
  doLogin: () => {},
  doLogout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  function doLogin() {
    setIsAuth(true);
  }
  function doLogout() {
    setIsAuth(false);
  }
  return (
    <authContext.Provider value={{ isAuth, doLogin, doLogout }}>
      {children}
    </authContext.Provider>
  );
};

export { authContext };
export default AuthProvider;
