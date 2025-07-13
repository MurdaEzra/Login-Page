import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BookOpenIcon, ClipboardListIcon, CreditCardIcon, HelpCircleIcon, UsersIcon, AlertCircleIcon, BarChartIcon, ClockIcon, SchoolIcon } from 'lucide-react';
import { UserRole } from '../context/AuthContext';
interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}
const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return <NavLink to={to} className={({
     
  }) => `flex items-center px-4 py-3 text-sm transition-colors ${isActive ? 'bg-amber-100 text-amber-800 font-medium border-r-4 border-amber-600' : 'text-gray-700 hover:bg-gray-100'}`}>
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>;
};
interface DashboardSidebarProps {
  userRole?: UserRole;
  closeSidebar: () => void;
}
const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  userRole
}) => {
  const renderNavItems = () => {
    switch (userRole) {
      case 'student':
        return <>
            <NavItem to="/student" icon={<BarChartIcon className="h-5 w-5" />} label="Dashboard" />
            <NavItem to="/student/performance" icon={<BookOpenIcon className="h-5 w-5" />} label="Academic Performance" />
            <NavItem to="/student/assignments" icon={<ClipboardListIcon className="h-5 w-5" />} label="Assignments" />
            <NavItem to="/student/fees" icon={<CreditCardIcon className="h-5 w-5" />} label="Fee Statement" />
            <NavItem to="/student/help" icon={<HelpCircleIcon className="h-5 w-5" />} label="Get Help" />
          </>;
      case 'teacher':
        return <>
            <NavItem to="/teacher" icon={<BarChartIcon className="h-5 w-5" />} label="Dashboard" />
            <NavItem to="/teacher/classes" icon={<UsersIcon className="h-5 w-5" />} label="My Classes" />
            <NavItem to="/teacher/assignments" icon={<ClipboardListIcon className="h-5 w-5" />} label="Assignments" />
            <NavItem to="/teacher/issues" icon={<AlertCircleIcon className="h-5 w-5" />} label="Issues & Requests" />
          </>;
      case 'admin':
        return <>
            <NavItem to="/admin" icon={<BarChartIcon className="h-5 w-5" />} label="Dashboard" />
            <NavItem to="/admin/attendance" icon={<ClockIcon className="h-5 w-5" />} label="Teacher Attendance" />
            <NavItem to="/admin/issues" icon={<AlertCircleIcon className="h-5 w-5" />} label="Issues & Requests" />
            <NavItem to="/admin/overview" icon={<SchoolIcon className="h-5 w-5" />} label="School Overview" />
          </>;
      default:
        return null;
    }
  };
  return <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <nav className="flex flex-col h-full py-4">
        <div className="px-4 mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            NAVIGATION
          </h2>
        </div>
        <div className="flex-1">{renderNavItems()}</div>
      </nav>
    </aside>;
};
export default DashboardSidebar;