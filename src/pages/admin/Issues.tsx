import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AlertCircleIcon, FilterIcon, SearchIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const Issues: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  const [filter, setFilter] = useState('all');
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  const adminData = user as any;
  const issues = adminData.issues || [];
  const filteredIssues = filter === 'all' ? issues : issues.filter((issue: any) => issue.status.toLowerCase() === filter);
  return <DashboardLayout title="Issues & Requests">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Issues & Requests
        </h2>
        <p className="text-gray-600">Manage and resolve reported issues <AlertCircleIcon/></p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input type="text" placeholder="Search issues..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-amber-500 focus:border-amber-500" />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <button className="border border-gray-300 rounded-md p-2 text-gray-500 hover:bg-gray-50">
              <FilterIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-md text-sm ${filter === 'all' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              All
            </button>
            <button onClick={() => setFilter('pending')} className={`px-3 py-1 rounded-md text-sm ${filter === 'pending' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              Pending
            </button>
            <button onClick={() => setFilter('resolved')} className={`px-3 py-1 rounded-md text-sm ${filter === 'resolved' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              Resolved
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {filteredIssues.length === 0 ? <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="text-gray-500">No issues found</div>
          </div> : filteredIssues.map((issue: any) => <div key={issue.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {issue.title}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">
                    From: {issue.name} ({issue.from}) • Submitted on:{' '}
                    {issue.date}
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${issue.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {issue.status}
                </span>
              </div>
              <div className="mt-4 bg-gray-50 rounded-md p-4">
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="space-x-2">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white py-1 px-3 rounded-md text-sm font-medium">
                    {issue.status === 'Resolved' ? 'Reopen Issue' : 'Mark as Resolved'}
                  </button>
                  <button className="bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded-md text-sm font-medium hover:bg-gray-50">
                    Assign
                  </button>
                </div>
                <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                  View Full Details
                </button>
              </div>
            </div>)}
      </div>
    </DashboardLayout>;
};
export default Issues;