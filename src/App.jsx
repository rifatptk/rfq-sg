import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Auth } from '@/layouts';
import { authContext } from './context/authContext';
import { useContext } from 'react';

function App() {
  const { isAuth } = useContext(authContext);
  console.log(isAuth);

  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="/dashboard/*" element={<Dashboard />} />
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
