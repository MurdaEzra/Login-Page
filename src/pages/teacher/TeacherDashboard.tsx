import React from 'react';
import { Navigate } from 'react-router-dom';
import { BarChartIcon, UsersIcon, ClipboardListIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const TeacherDashboard: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'teacher') {
    return <Navigate to="/" />;
  }
  const teacherData = user as any;
  return <DashboardLayout title="Teacher Dashboard">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, {user.name}
        </h2>
        <p className="text-gray-600">
          Teacher ID: {teacherData.teacherId} | Subjects:{' '}
          {teacherData.subjects?.join(', ')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col items-center justify-center text-center">
            <BarChartIcon className="h-12 w-12 text-amber-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Dashboard Overview</h3>
            <p className="text-gray-600">
              Welcome to your teacher dashboard. Use the sidebar menu to
              navigate through different sections.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Class Summary</h3>
          <div className="space-y-3">
            {teacherData.classes?.map((className: string) => <div key={className} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Class {className}</span>
                <span className="text-sm text-gray-600">25 students</span>
              </div>)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Recent Assignments</h3>
          <div className="space-y-3">
            {(teacherData.assignments || []).slice(0, 3).map((assignment: any) => <div key={assignment.id} className="border-b border-gray-100 pb-2 last:border-0">
                  <div className="font-medium">{assignment.title}</div>
                  <div className="text-sm text-gray-600">
                    {assignment.subject} • Class {assignment.class}
                  </div>
                  <div className="text-xs text-gray-500">
                    Due: {assignment.dueDate}
                  </div>
                </div>)}
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default TeacherDashboard;