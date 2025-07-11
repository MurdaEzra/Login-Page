import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { HelpCircleIcon, MessageSquareIcon, PhoneIcon, MailIcon } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import supabase from '../../context/supabaseClient';
const Help: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  if (!isAuthenticated || user?.role !== 'student') {
    return <Navigate to="/" />;
  }
  const[subject, setSubject] = useState('');
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (question.trim() && subject) {
    const { data, error } = await supabase.from('issues').insert([
      {
        student_id: user?.id,
        subject,
        question,
      }
    ]);

    if (!error) {
      setSubmitted(true);
      setQuestion('');
      setSubject('');
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } else {
      console.error('Submission error:', error.message);
    }
  }
};
  return <DashboardLayout title="Get Help">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Need Help?</h2>
        <p className="text-gray-600">Get support from our technicians.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <MessageSquareIcon className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-lg font-semibold">Ask a Question</h3>
          </div>
          {submitted ? <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
              <p className="font-medium">Thank you for your question!</p>
              <p className="text-sm mt-1">
                An Admin will respond to your issue shortly.
              </p>
            </div> : <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select id="subject" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-amber-500 focus:border-amber-500"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  required>
                  <option value="">Select a subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Question
                </label>
                <textarea id="question" className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-amber-500 focus:border-amber-500" rows={5} placeholder="Type your question here..." value={question} onChange={e => setQuestion(e.target.value)} required></textarea>
              </div>
              <div>
                <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                  Submit Question
                </button>
              </div>
            </form>}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <HelpCircleIcon className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-lg font-semibold">Contact Information</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <PhoneIcon className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">School Office</p>
                <p className="text-gray-600">+254 728 135 200</p>
                <p className="text-sm text-gray-500">
                  Mon-Fri, 8:00 AM - 5:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <MailIcon className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-gray-600">ezranyamwange2@gmail.com</p>
                <p className="text-sm text-gray-500">
                  We respond within 24 hours
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100">
              <h4 className="font-medium mb-2">FAQs</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-amber-600 hover:text-amber-700">
                    How do I check my grades?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-amber-600 hover:text-amber-700">
                    When are school fees due?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-amber-600 hover:text-amber-700">
                    How to submit assignments online?
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default Help;