import React, { ReactNode, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { useAuth } from '../context/AuthContext';
import { MenuIcon, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomDashboardHeader: React.FC<{ title: string; onMenuClick?: () => void }> = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden text-gray-600 hover:text-gray-900"
        onClick={onMenuClick} 
      >
        <MenuIcon className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
    </header>
  );
};
<DashboardHeader title="My Dashboard"/>
interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(title);

interface DashboardHeaderProps {
  title: string;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title
}) => {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  <DashboardHeader title="My Dashboard"/>
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CustomDashboardHeader title={title} onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>

              {/* Hamburger for mobile */}
              <button
                className="md:hidden text-gray-600 hover:text-gray-900"
                onClick={() => setSidebarOpen(false)}
              >
                <MenuIcon className="w-6 h-6" />
              </button>

              <DashboardSidebar userRole={user?.role} closeSidebar={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0 border-r border-gray-200 bg-white">
          <DashboardSidebar userRole={user?.role} closeSidebar={() => setSidebarOpen(false)} />
        </div>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
       <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-100 flex items-center">
            <LogOutIcon className="h-5 w-5 text-gray-600" />
            <span className="hidden md:inline ml-1 text-sm">Logout</span>
          </button>
    </div>
  );
};
}

export default DashboardLayout;
