import React from 'react';
import { Navigate } from 'react-router-dom';
import { UsersIcon, UserIcon, BookIcon, ChevronRightIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const Classes: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'teacher') {
    return <Navigate to="/" />;
  }
  const teacherData = user as any;
  // Mock data for class details
  const classDetails = {
    '9A': {
      students: 28,
      boys: 15,
      girls: 13,
      averageGrade: 'B'
    },
    '10B': {
      students: 25,
      boys: 12,
      girls: 13,
      averageGrade: 'B+'
    },
    '11C': {
      students: 22,
      boys: 10,
      girls: 12,
      averageGrade: 'A-'
    }
  };
  return <DashboardLayout title="My Classes">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Classes</h2>
        <p className="text-gray-600">Manage your classes and students</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {teacherData.classes?.map((className: string) => <div key={className} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 bg-amber-50 border-b border-amber-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <UsersIcon className="h-6 w-6 text-amber-600 mr-2" />
                  <h3 className="text-xl font-semibold">Class {className}</h3>
                </div>
                <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                  {(classDetails as any)[className]?.students} Students
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <div className="text-sm text-gray-500">Boys</div>
                  <div className="text-xl font-semibold">
                    {(classDetails as any)[className]?.boys}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <div className="text-sm text-gray-500">Girls</div>
                  <div className="text-xl font-semibold">
                    {(classDetails as any)[className]?.girls}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-center col-span-2">
                  <div className="text-sm text-gray-500">Average Grade</div>
                  <div className="text-xl font-semibold">
                    {(classDetails as any)[className]?.averageGrade}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full flex justify-between items-center p-2 text-sm text-amber-600 hover:bg-amber-50 rounded transition-colors">
                  <span className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2" />
                    View Student List
                  </span>
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
                <button className="w-full flex justify-between items-center p-2 text-sm text-amber-600 hover:bg-amber-50 rounded transition-colors">
                  <span className="flex items-center">
                    <BookIcon className="h-4 w-4 mr-2" />
                    Manage Assignments
                  </span>
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>)}
        <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center p-6">
          <button className="text-gray-500 hover:text-amber-600 text-center">
            <div className="text-4xl mb-2">+</div>
            <div className="font-medium">Add New Class</div>
          </button>
        </div>
      </div>
    </DashboardLayout>;
};
export default Classes;