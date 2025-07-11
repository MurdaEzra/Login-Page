import React from 'react';
import { Navigate } from 'react-router-dom';
import { AlertCircleIcon, PlusIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const Issues: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'teacher') {
    return <Navigate to="/" />;
  }
  const teacherData = user as any;
  return <DashboardLayout title="Issues & Requests">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Issues & Requests
          </h2>
          <p className="text-gray-600">Report issues and track their status</p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center">
          <PlusIcon className="h-4 w-4 mr-1" />
          New Issue
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <AlertCircleIcon className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-lg font-semibold">My Issues</h3>
          </div>
          <div className="space-y-4">
            {(teacherData.issues || []).map((issue: any) => <div key={issue.id} className="p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{issue.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Submitted on: {issue.date}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${issue.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {issue.status}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    {issue.status === 'Resolved' ? 'Resolved on: May 15, 2023' : 'Awaiting resolution'}
                  </div>
                  <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Report New Issue</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Type
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-amber-500 focus:border-amber-500">
                <option value="">Select issue type</option>
                <option value="technical">Technical Problem</option>
                <option value="facility">Facility Issue</option>
                <option value="material">Learning Materials</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-amber-500 focus:border-amber-500" placeholder="Brief title of the issue" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-amber-500 focus:border-amber-500" rows={4} placeholder="Describe the issue in detail..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="priority" value="low" className="h-4 w-4 text-amber-600 focus:ring-amber-500" />
                  <span className="ml-2 text-sm text-gray-700">Low</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="priority" value="medium" className="h-4 w-4 text-amber-600 focus:ring-amber-500" checked />
                  <span className="ml-2 text-sm text-gray-700">Medium</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="priority" value="high" className="h-4 w-4 text-amber-600 focus:ring-amber-500" />
                  <span className="ml-2 text-sm text-gray-700">High</span>
                </label>
              </div>
            </div>
            <div>
              <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                Submit Issue
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>;
};
export default Issues;