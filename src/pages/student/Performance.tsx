import React from 'react';
import { Navigate } from 'react-router-dom';
import { BookOpenIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const Performance: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'student') {
    return <Navigate to="/" />;
  }
  const studentData = user as any;
  return <DashboardLayout title="Academic Performance">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Academic Performance
        </h2>
        <p className="text-gray-600">View your grades and academic progress</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <BookOpenIcon className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-lg font-semibold">Subject Grades</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(studentData.performance || {}).map(([subject, grade]) => <div key={subject} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700">{subject}</span>
                  <span className="font-semibold">{grade}</span>
                </div>)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overall Grade</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-amber-600">B+</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Class Rank</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold">8</span>
                <span className="text-gray-500 ml-1">/ 32</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Attendance</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-green-600">95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default Performance;