import React from 'react';
import { Navigate } from 'react-router-dom';
import { BookOpenIcon, ClipboardListIcon, HelpCircleIcon, CreditCardIcon, AlertCircleIcon } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';
const StudentDashboard: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'student') {
    return <Navigate to="./StudentDashboard" />;
  }
  const studentData = user as any;
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader title="Student Dashboard" />
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome, {user.name}
          </h2>
          <p className="text-gray-600">
            Grade: {studentData.grade} | Division: {studentData.division}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Performance Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <BookOpenIcon className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold">Academic Performance</h3>
            </div>
            <div className="space-y-4">
              {Object.entries(studentData.performance || {}).map(([subject, grade]) => <div key={subject} className="flex justify-between items-center">
                    <span className="text-gray-700">{subject}</span>
                    <span className="font-semibold">{grade as string}</span>
                  </div>)}
            </div>
          </div>
          {/* Assignments Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <ClipboardListIcon className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold">Assignments</h3>
            </div>
            <div className="space-y-4">
              {(studentData.assignments || []).map((assignment: any) => <div key={assignment.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">
                      {assignment.title}
                    </span>
                    <span className={`text-sm ${assignment.status === 'Completed' ? 'text-green-600' : 'text-amber-600'}`}>
                      {assignment.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>{assignment.subject}</span>
                    <span className="mx-2">•</span>
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  {assignment.grade && <div className="mt-1 text-sm font-medium text-gray-700">
                      Grade: {assignment.grade}
                    </div>}
                </div>)}
            </div>
          </div>
          {/* Fee Statement Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <CreditCardIcon className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold">Fee Statement</h3>
            </div>
            <div className="mb-4">
              <div className="bg-amber-50 rounded p-3 flex justify-between items-center">
                <span className="text-gray-800 font-medium">
                  Current Balance:
                </span>
                <span className="text-lg font-bold text-amber-700">
                  KSh {studentData.feeBalance?.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="overflow-auto max-h-48">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-medium text-gray-600">
                      Date
                    </th>
                    <th className="text-left py-2 font-medium text-gray-600">
                      Description
                    </th>
                    <th className="text-right py-2 font-medium text-gray-600">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(studentData.feeStatement || []).map((item: any, index: number) => <tr key={index} className="border-b border-gray-100 last:border-0">
                        <td className="py-2">{item.date}</td>
                        <td className="py-2">{item.description}</td>
                        <td className={`py-2 text-right ${item.amount < 0 ? 'text-green-600' : 'text-gray-800'}`}>
                          {item.amount < 0 ? '-' : ''}KSh{' '}
                          {Math.abs(item.amount).toLocaleString()}
                        </td>
                      </tr>)}
                </tbody>
              </table>
            </div>
          </div>
          {/* Help Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <HelpCircleIcon className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold">Need Help?</h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Have questions about your coursework or need academic support?
                Our teachers are here to help.
              </p>
              <div>
                <textarea className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-amber-500 focus:border-amber-500" rows={3} placeholder="Type your question here..."></textarea>
              </div>
              <div>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                  Submit Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default StudentDashboard;