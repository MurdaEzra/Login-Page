import React from 'react';
import { Navigate } from 'react-router-dom';
import { CreditCardIcon, DownloadIcon, PrinterIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
const FeeStatement: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated || user?.role !== 'student') {
    return <Navigate to="/" />;
  }
  const studentData = user as any;
  return <DashboardLayout title="Fee Statement">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Fee Statement</h2>
        <p className="text-gray-600">View and manage your school fees</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <CreditCardIcon className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold">Transaction History</h3>
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center text-sm text-gray-600 hover:text-amber-600">
                <PrinterIcon className="h-4 w-4 mr-1" />
                <span>Print</span>
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-amber-600">
                <DownloadIcon className="h-4 w-4 mr-1" />
                <span>Download</span>
              </button>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Description
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {(studentData.feeStatement || []).map((item: any, index: number) => <tr key={index} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 px-4">{item.date}</td>
                      <td className="py-3 px-4">{item.description}</td>
                      <td className={`py-3 px-4 text-right ${item.amount < 0 ? 'text-green-600' : 'text-gray-800'}`}>
                        {item.amount < 0 ? '-' : ''}KSh{' '}
                        {Math.abs(item.amount).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        KSh {item.balance.toLocaleString()}
                      </td>
                    </tr>)}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Fee Summary</h3>
          <div className="bg-amber-50 rounded p-4 mb-6">
            <div className="text-gray-700 mb-2">Current Balance:</div>
            <div className="text-2xl font-bold text-amber-700">
              KSh {studentData.feeBalance?.toLocaleString()}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Term 1 Fees</span>
              <span className="font-medium">KSh 50,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Term 2 Fees</span>
              <span className="font-medium">KSh 50,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Term 3 Fees</span>
              <span className="font-medium">KSh 50,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Paid</span>
              <span className="font-medium text-green-600">KSh 125,000</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-800 font-medium">
                Outstanding Balance
              </span>
              <span className="font-bold text-amber-600">KSh 25,000</span>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default FeeStatement;