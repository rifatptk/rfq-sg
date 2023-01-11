import { Outlet } from 'react-router-dom';
import { Sidenav, DashboardNavbar, Configurator } from '@/widgets/layout';
import { useMaterialTailwindController } from '@/context';

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
      <div className="p-4 xl:ml-[256px]">
        <DashboardNavbar />
        <Configurator />
        <Outlet />
      </div>
    </div>
  );
}

Dashboard.displayName = '/src/layout/dashboard.jsx';

export default Dashboard;
