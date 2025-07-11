import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ClipboardListIcon, PlusIcon, FilterIcon, SearchIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const Assignments: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  if (!isAuthenticated || user?.role !== 'teacher') {
    return <Navigate to="/" />;
  }
  const teacherData = user as any;
  return <DashboardLayout title="Assignments">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Assignments</h2>
          <p className="text-gray-600">Create and manage student assignments</p>
        </div>
        <button onClick={() => setShowAssignmentForm(!showAssignmentForm)} className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center">
          <PlusIcon className="h-4 w-4 mr-1" />
          New Assignment
        </button>
      </div>
      {showAssignmentForm && <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4">Create New Assignment</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-amber-500 focus:border-amber-500" placeholder="Assignment title" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-amber-500 focus:border-amber-500">
                  {teacherData.subjects?.map((subject: string) => <option key={subject} value={subject}>
                      {subject}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-amber-500 focus:border-amber-500">
                  {teacherData.classes?.map((className: string) => <option key={className} value={className}>
                      {className}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input type="date" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-amber-500 focus:border-amber-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructions
              </label>
              <textarea className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-amber-500 focus:border-amber-500" rows={4} placeholder="Assignment instructions..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attachments
              </label>
              <div className="border border-gray-300 border-dashed rounded-md p-4 text-center">
                <p className="text-sm text-gray-500">
                  Drag and drop files here, or click to select files
                </p>
                <input type="file" className="hidden" />
                <button className="mt-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded">
                  Select Files
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={() => setShowAssignmentForm(false)} className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium">
                Create Assignment
              </button>
            </div>
          </form>
        </div>}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input type="text" placeholder="Search assignments..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-amber-500 focus:border-amber-500" />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <button className="border border-gray-300 rounded-md p-2 text-gray-500 hover:bg-gray-50">
              <FilterIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Filter by:</span>
            <select className="border border-gray-300 rounded-md p-1 text-sm focus:ring-amber-500 focus:border-amber-500">
              <option value="all">All Classes</option>
              {teacherData.classes?.map((className: string) => <option key={className} value={className}>
                  Class {className}
                </option>)}
            </select>
            <select className="border border-gray-300 rounded-md p-1 text-sm focus:ring-amber-500 focus:border-amber-500">
              <option value="all">All Subjects</option>
              {teacherData.subjects?.map((subject: string) => <option key={subject} value={subject}>
                  {subject}
                </option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submissions
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(teacherData.assignments || []).map((assignment: any) => <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {assignment.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {assignment.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {assignment.submissions} / 25
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-amber-600 hover:text-amber-900 mr-3">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Edit
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>;
};
export default Assignments;