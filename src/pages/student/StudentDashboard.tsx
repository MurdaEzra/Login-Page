import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import { BarChartIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const StudentDashboard: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'student') {
    return <Navigate to="/" />;
  }
  const studentData = user as any;
  return <DashboardLayout title="Student Dashboard">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, {user.name}
        </h2>
        <p className="text-gray-600">
          Grade: {studentData.grade} | Division: {studentData.division}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col items-center justify-center text-center">
            <BarChartIcon className="h-12 w-12 text-amber-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Dashboard Overview</h3>
            <p className="text-gray-600">
              Welcome to your student dashboard. Use the sidebar menu to
              navigate through different sections.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <div className="space-y-2">
            <a href="/student/performance" className="block p-3 bg-amber-50 rounded-md text-amber-700 hover:bg-amber-100 transition-colors">
              View Academic Performance
            </a>
            <a href="/student/assignments" className="block p-3 bg-amber-50 rounded-md text-amber-700 hover:bg-amber-100 transition-colors">
              Check Assignments
            </a>
            <a href="/student/fees" className="block p-3 bg-amber-50 rounded-md text-amber-700 hover:bg-amber-100 transition-colors">
              View Fee Statement
            </a>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Upcoming</h3>
          <div className="space-y-3">
            <div className="border-b border-gray-100 pb-2">
              <div className="font-medium">Math Quiz</div>
              <div className="text-sm text-gray-600">Tomorrow, 10:00 AM</div>
            </div>
            <div className="border-b border-gray-100 pb-2">
              <div className="font-medium">Science Project Due</div>
              <div className="text-sm text-gray-600">Friday, 2:00 PM</div>
            </div>
            <div>
              <div className="font-medium">Parent-Teacher Meeting</div>
              <div className="text-sm text-gray-600">Next Week, Monday</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default StudentDashboard;