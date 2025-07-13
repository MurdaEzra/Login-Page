import React from 'react';
import { Navigate } from 'react-router-dom';
import { BarChartIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const AdminDashboard: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  const adminData = user as any;
  const statistics = adminData.statistics || {};
  const divisions = statistics.divisions || {};
  return <DashboardLayout title="Admin Dashboard">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, {user.name}
        </h2>
        <p className="text-gray-600">School Administration Dashboard</p>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 lg:col-span-1">
          <div className="flex flex-col">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Total Students
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {statistics.totalStudents}
            </div>
          </div>
        </div>
        {Object.entries(divisions).map(([division, count]) => <div key={division} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 lg:col-span-1">
            <div className="flex flex-col">
              <div className="text-sm font-medium text-gray-500 mb-1">
                {division}
              </div>
              <div className="text-2xl font-bold text-gray-800">{count as number}</div>
            </div>
          </div>)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col items-center justify-center text-center">
            <BarChartIcon className="h-12 w-12 text-amber-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Dashboard Overview</h3>
            <p className="text-gray-600">
              Welcome to the admin dashboard. Use the sidebar menu to navigate
              through different sections.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <TrendingUpIcon className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-lg font-semibold">Performance Summary</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Average Grade</span>
                <span className="font-medium">B+</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-amber-600 h-1.5 rounded-full" style={{
                width: '85%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Attendance</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-amber-600 h-1.5 rounded-full" style={{
                width: '92%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Fee Collection</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-amber-600 h-1.5 rounded-full" style={{
                width: '85%'
              }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <UsersIcon className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-lg font-semibold">Staff Summary</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span>Teaching Staff</span>
              <span className="font-medium">42</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span>Administrative Staff</span>
              <span className="font-medium">15</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span>Support Staff</span>
              <span className="font-medium">28</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span>Total Staff</span>
              <span className="font-medium">85</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default AdminDashboard;