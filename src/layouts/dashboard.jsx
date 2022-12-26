import { Routes, Route } from 'react-router-dom';

import { Sidenav, DashboardNavbar, Configurator } from '@/widgets/layout';
import { useMaterialTailwindController } from '@/context';
import { Notifications, Profile, Tables } from '@/pages/dashboard';
import AddNewUser from '@/pages/dashboard/AddNewUser';

export function Dashboard() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        brandImg={
          sidenavType === 'dark' ? '/img/logo-ct.png' : '/img/logo-ct-dark.png'
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />

        <Routes>
          <Route path="/users" element={<Tables />} />
          <Route path="/users/:userId" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/add-user" element={<AddNewUser />} />
        </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = '/src/layout/dashboard.jsx';

export default Dashboard;
