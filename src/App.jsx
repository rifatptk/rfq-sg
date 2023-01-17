import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Auth } from '@/layouts';
import { authContext } from './context/authContext';
import { useContext } from 'react';
import { Notifications, Profile, Tables } from './pages/dashboard';
import AddNewUser from './pages/dashboard/AddNewUser';
import { PuffLoader } from 'react-spinners';

function App() {
  const { isAuth, loading } = useContext(authContext);
  if (loading)
    return (
      <div className="fixed inset-0 grid place-items-center bg-black/80 z-[10000] backdrop-blur-[2px]">
        <PuffLoader color="orange" />
      </div>
    );
  return (
    <>
      {isAuth ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="users" />} />
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
        </Routes>
      ) : (
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
