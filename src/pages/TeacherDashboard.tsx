import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BookOpenIcon, ClipboardListIcon, AlertCircleIcon, UsersIcon, PlusIcon } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';
const TeacherDashboard: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  if (!isAuthenticated || user?.role !== 'teacher') {
    return <Navigate to="/" />;
  }
  const teacherData = user as any;
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Teacher Dashboard" />
      <main className="flex-1 p-4 md:p-6">
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
          {/* Classes Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <UsersIcon className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold">My Classes</h3>
            </div>
            <div className="space-y-2">
              {teacherData.classes?.map((className: string) => <div key={className} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span className="font-medium">Class {className}</span>
                  <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                    View Details
                  </button>
                </div>)}
            </div>
          </div>
          {/* Assignments Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <ClipboardListIcon className="h-5 w-5 text-amber-600 mr-2" />
                <h3 className="text-lg font-semibold">Assignments</h3>
              </div>
              <button onClick={() => setShowAssignmentForm(!showAssignmentForm)} className="p-1 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200">
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            {showAssignmentForm && <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <h4 className="font-medium text-sm mb-2">
                  Create New Assignment
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Title
                    </label>
                    <input type="text" className="w-full text-sm border border-gray-300 rounded p-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Subject
                      </label>
                      <select className="w-full text-sm border border-gray-300 rounded p-2">
                        {teacherData.subjects?.map((subject: string) => <option key={subject} value={subject}>
                            {subject}
                          </option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Class
                      </label>
                      <select className="w-full text-sm border border-gray-300 rounded p-2">
                        {teacherData.classes?.map((className: string) => <option key={className} value={className}>
                            {className}
                          </option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Due Date
                    </label>
                    <input type="date" className="w-full text-sm border border-gray-300 rounded p-2" />
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-amber-600 hover:bg-amber-700 text-white text-sm py-1 px-3 rounded">
                      Create Assignment
                    </button>
                  </div>
                </div>
              </div>}
            <div className="space-y-3">
              {(teacherData.assignments || []).map((assignment: any) => <div key={assignment.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">
                      {assignment.title}
                    </span>
                    <span className="text-sm text-gray-600">
                      {assignment.submissions} submissions
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>{assignment.subject}</span>
                    <span className="mx-2">•</span>
                    <span>Class {assignment.class}</span>
                    <span className="mx-2">•</span>
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                </div>)}
            </div>
          </div>
          {/* Issues Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <AlertCircleIcon className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold">Issues & Requests</h3>
            </div>
            <div className="space-y-3">
              {(teacherData.issues || []).map((issue: any) => <div key={issue.id} className="p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">
                      {issue.title}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${issue.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {issue.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Submitted on: {issue.date}
                  </div>
                </div>)}
              <div className="pt-3">
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                  Report New Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default TeacherDashboard;