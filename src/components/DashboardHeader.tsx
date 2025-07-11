import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon, BellIcon, UserIcon } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
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
  return <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">
            <Logo size="sm" />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            {title}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <BellIcon className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center">
            <div className="mr-2 flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 text-white">
              <UserIcon className="h-5 w-5" />
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-700">
              {user?.name}
            </span>
          </div>
          <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-100 flex items-center">
            <LogOutIcon className="h-5 w-5 text-gray-600" />
            <span className="hidden md:inline ml-1 text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>;
};
export default DashboardHeader;