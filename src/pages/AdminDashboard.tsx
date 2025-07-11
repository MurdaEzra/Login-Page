import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { UsersIcon, AlertCircleIcon, ClockIcon, SchoolIcon } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import supabase from '../context/supabaseClient';
const AdminDashboard: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  const [issues, setIssues] = useState<any[]>([]);


useEffect(() => {
  const fetchIssues = async () => {
    const { data, error } = await supabase
      .from('issues')
      .select(`
        id,
        subject,
        question,
        created_at,
        student_id,
        profiles (name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching issues:', error.message);
    } else {
      setIssues(data);
    }
  };

  fetchIssues();
}, []);

  const adminData = user as any;
  const statistics = adminData.statistics || {};
  const divisions = statistics.divisions || {};
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Admin Dashboard" />
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome, {user.name}
          </h2>
          <p className="text-gray-600">School Administration Dashboard</p>
        </div>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 lg:col-span-1">
            <div className="flex flex-col">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Total Students
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {statistics.totalStudents}
              </div>
            </div>
          </div>
          {Object.entries(divisions).map(([division, count]) => <div key={division} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 lg:col-span-1">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-500 mb-1">
                  {division}
                </div>
                <div className="text-2xl font-bold text-gray-800">{count as number}</div>
              </div>
            </div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Teacher Attendance */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-amber-600 mr-2" />
                <h3 className="text-lg font-semibold">Teacher Attendance</h3>
              </div>
              <div className="text-sm text-gray-600">Today</div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time In
                    </th>
                    <th className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Out
                    </th>
                    <th className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(adminData.teacherAttendance || []).map((record: any) => <tr key={record.id}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.name}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.timeIn}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.timeOut || '—'}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.timeOut ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {record.timeOut ? 'Checked Out' : 'Present'}
                        </span>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
          {/* Issues Section */}
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <AlertCircleIcon className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold">Issues & Requests</h3>
            </div>
            <div className="space-y-3">
              

          {issues.map(issue => (
  <div key={issue.id} className="p-3 bg-gray-50 rounded-md">
    <div className="flex justify-between">
      <div>
        <span className="font-medium text-gray-800">
          {issue.subject}
        </span>
        <p className="text-sm text-gray-600 mt-1">{issue.question}</p>
        <div className="text-xs text-gray-500 mt-1">
          From: {issue.profiles?.name || 'Unknown'} ({issue.profiles?.email || 'No email'})
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-800">
          New
        </span>
        <span className="text-xs text-gray-500 mt-1">
          {new Date(issue.created_at).toLocaleString()}
        </span>
      </div>
    </div>
    <div className="flex mt-2 space-x-2">
      <button className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded">
        View Details
      </button>
      {/* Optional: Add resolve logic */}
      <button className="text-xs bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded">
        Mark as Resolved
      </button>
    </div>
  </div>
))}

            </div>
          </div>
          {/* School Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 lg:col-span-2">
            <div className="flex items-center mb-4">
              <SchoolIcon className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold">School Overview</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-700 mb-2">
                  Upcoming Events
                </h4>
                <ul className="text-sm space-y-2">
                  <li className="flex justify-between">
                    <span>Parent-Teacher Meeting</span>
                    <span className="text-gray-500">May 15</span>
                  </li>
                  <li className="flex justify-between">
                    <span>End of Term Exams</span>
                    <span className="text-gray-500">Jun 10</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sports Day</span>
                    <span className="text-gray-500">Jun 20</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-700 mb-2">Performance</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Average Grade</span>
                      <span className="font-medium">B+</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className="bg-amber-600 h-1.5 rounded-full" style={{
                      width: '85%'
                    }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Attendance</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className="bg-amber-600 h-1.5 rounded-full" style={{
                      width: '92%'
                    }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-700 mb-2">
                  Fee Collection
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Collected</span>
                    <span className="font-medium">KSh 8.2M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Outstanding</span>
                    <span className="font-medium">KSh 1.5M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-amber-600 h-1.5 rounded-full" style={{
                    width: '85%'
                  }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    85% collection rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default AdminDashboard;