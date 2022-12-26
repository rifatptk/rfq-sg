import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Auth } from '@/layouts';
import { authContext } from './context/authContext';
import { useContext, useEffect } from 'react';
import { notify } from './utils/notify';
import { Notifications, Profile, Tables } from './pages/dashboard';
import AddNewUser from './pages/dashboard/AddNewUser';

function App() {
  const { isAuth } = useContext(authContext);

  useEffect(() => {
    notify();
  }, []);

  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Tables />} />
            <Route path="users" element={<Tables />} />
            <Route path="users/:userId" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="add-user" element={<AddNewUser />} />
            <Route path="*" element={<Navigate to="users" replace />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/dashboard/users" replace />}
          />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
