import React from 'react';
import { Navigate } from 'react-router-dom';
import { ClipboardListIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const Assignments: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'student') {
    return <Navigate to="/" />;
  }
  const studentData = user as any;
  // Filter assignments by status
  const completedAssignments = studentData.assignments?.filter((a: any) => a.status === 'Completed') || [];
  const pendingAssignments = studentData.assignments?.filter((a: any) => a.status === 'Pending') || [];
  return <DashboardLayout title="Assignments">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Assignments</h2>
        <p className="text-gray-600">View and manage your assignments</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <ClockIcon className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-lg font-semibold">Pending Assignments</h3>
          </div>
          {pendingAssignments.length === 0 ? <p className="text-gray-500 text-center py-4">
              No pending assignments
            </p> : <div className="space-y-4">
              {pendingAssignments.map((assignment: any) => <div key={assignment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">
                      {assignment.title}
                    </span>
                    <span className="text-sm text-amber-600">
                      {assignment.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>{assignment.subject}</span>
                    <span className="mx-2">•</span>
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  <div className="mt-2">
                    <button className="bg-amber-600 hover:bg-amber-700 text-white py-1 px-3 rounded text-sm transition-colors">
                      Submit Assignment
                    </button>
                  </div>
                </div>)}
            </div>}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold">Completed Assignments</h3>
          </div>
          {completedAssignments.length === 0 ? <p className="text-gray-500 text-center py-4">
              No completed assignments
            </p> : <div className="space-y-4">
              {completedAssignments.map((assignment: any) => <div key={assignment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">
                      {assignment.title}
                    </span>
                    <span className="text-sm text-green-600">
                      {assignment.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>{assignment.subject}</span>
                    <span className="mx-2">•</span>
                    <span>Submitted: {assignment.dueDate}</span>
                  </div>
                  {assignment.grade && <div className="mt-1 text-sm font-medium text-gray-700">
                      Grade: {assignment.grade}
                    </div>}
                </div>)}
            </div>}
        </div>
      </div>
    </DashboardLayout>;
};
export default Assignments;