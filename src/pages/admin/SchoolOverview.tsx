import React from 'react';
import { Navigate } from 'react-router-dom';
import { SchoolIcon, CalendarIcon, TrendingUpIcon, CreditCardIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const SchoolOverview: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  return <DashboardLayout title="School Overview">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          School Overview
        </h2>
        <p className="text-gray-600">
          Key metrics and information about the school
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <CalendarIcon className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-lg font-semibold">Upcoming Events</h3>
          </div>
          <ul className="space-y-4">
            <li className="pb-4 border-b border-gray-100">
              <div className="font-medium">Parent-Teacher Meeting</div>
              <div className="text-sm text-gray-600">
                May 15, 2023 • 2:00 PM
              </div>
              <div className="text-xs text-gray-500 mt-1">Main Hall</div>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <div className="font-medium">End of Term Exams</div>
              <div className="text-sm text-gray-600">Jun 10-20, 2023</div>
              <div className="text-xs text-gray-500 mt-1">All Classrooms</div>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <div className="font-medium">Sports Day</div>
              <div className="text-sm text-gray-600">
                Jun 25, 2023 • 9:00 AM
              </div>
              <div className="text-xs text-gray-500 mt-1">School Grounds</div>
            </li>
            <li>
              <div className="font-medium">School Closing Day</div>
              <div className="text-sm text-gray-600">Jul 7, 2023</div>
              <div className="text-xs text-gray-500 mt-1">Term End</div>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
              Add New Event
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <TrendingUpIcon className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-lg font-semibold">Performance</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Average Grade</span>
                <span className="font-medium">B+</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-600 h-2 rounded-full" style={{
                width: '85%'
              }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Target: A-</span>
                <span>85% of target</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Attendance</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-600 h-2 rounded-full" style={{
                width: '92%'
              }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Target: 95%</span>
                <span>97% of target</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Teacher Satisfaction</span>
                <span className="font-medium">88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-600 h-2 rounded-full" style={{
                width: '88%'
              }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Target: 90%</span>
                <span>98% of target</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Student Satisfaction</span>
                <span className="font-medium">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-600 h-2 rounded-full" style={{
                width: '82%'
              }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Target: 85%</span>
                <span>96% of target</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <CreditCardIcon className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-lg font-semibold">Fee Collection</h3>
          </div>
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-1">
              Total Collection Progress
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-amber-600 h-4 rounded-full flex items-center justify-center text-xs text-white" style={{
              width: '85%'
            }}>
                85%
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded-md">
              <span>Total Fees (Annual)</span>
              <span className="font-medium">KSh 9.7M</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-md">
              <span>Collected</span>
              <span className="font-medium text-green-600">KSh 8.2M</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-md">
              <span>Outstanding</span>
              <span className="font-medium text-amber-600">KSh 1.5M</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-md">
              <span>Fee Defaulters</span>
              <span className="font-medium">127 Students</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default SchoolOverview;