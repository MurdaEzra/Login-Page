import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ClockIcon, FilterIcon, SearchIcon, DownloadIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const TeacherAttendance: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  const adminData = user as any;
  return <DashboardLayout title="Teacher Attendance">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Teacher Attendance
        </h2>
        <p className="text-gray-600">
          Monitor teacher attendance and check-in/out times
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input type="text" placeholder="Search teachers..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-amber-500 focus:border-amber-500" />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <button className="border border-gray-300 rounded-md p-2 text-gray-500 hover:bg-gray-50">
              <FilterIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="border border-gray-300 rounded-md p-2 text-sm focus:ring-amber-500 focus:border-amber-500" />
            <button className="flex items-center bg-amber-600 hover:bg-amber-700 text-white py-2 px-3 rounded-md text-sm font-medium">
              <DownloadIcon className="h-4 w-4 mr-1" />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time In
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Out
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(adminData.teacherAttendance || []).map((record: any) => {
              const timeIn = record.timeIn ? new Date(`2023-01-01 ${record.timeIn}`) : null;
              const timeOut = record.timeOut ? new Date(`2023-01-01 ${record.timeOut}`) : null;
              let totalHours = '';
              if (timeIn && timeOut) {
                const diff = (timeOut.getTime() - timeIn.getTime()) / (1000 * 60 * 60);
                totalHours = diff.toFixed(2);
              }
              return <tr key={record.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.timeIn}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.timeOut || '—'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {totalHours ? `${totalHours} hrs` : '—'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.timeOut ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {record.timeOut ? 'Checked Out' : 'Present'}
                      </span>
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">3</span> of{' '}
            <span className="font-medium">42</span> teachers
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-100 rounded-md p-4 text-center">
            <div className="text-sm text-green-600 mb-1">Present</div>
            <div className="text-2xl font-bold text-green-700">38</div>
            <div className="text-xs text-green-500 mt-1">90.5% of staff</div>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-md p-4 text-center">
            <div className="text-sm text-red-600 mb-1">Absent</div>
            <div className="text-2xl font-bold text-red-700">4</div>
            <div className="text-xs text-red-500 mt-1">9.5% of staff</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-center">
            <div className="text-sm text-blue-600 mb-1">Late Arrivals</div>
            <div className="text-2xl font-bold text-blue-700">7</div>
            <div className="text-xs text-blue-500 mt-1">16.7% of staff</div>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-md p-4 text-center">
            <div className="text-sm text-purple-600 mb-1">Early Departures</div>
            <div className="text-2xl font-bold text-purple-700">3</div>
            <div className="text-xs text-purple-500 mt-1">7.1% of staff</div>
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default TeacherAttendance;