import React, {ReactNode} from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { useAuth } from '../context/AuthContext';
interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title
}) => {
  const {
    user
  } = useAuth();
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title={title} />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar userRole={user?.role} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>;
};
export default DashboardLayout;