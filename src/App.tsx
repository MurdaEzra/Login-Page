import React , { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentPerformance from './pages/student/Performance';
import StudentAssignments from './pages/student/Assignments';
import StudentFees from './pages/student/FeeStatement';
import StudentHelp from './pages/student/Help';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherClasses from './pages/teacher/Classes';
import TeacherAssignments from './pages/teacher/Assignments';
import TeacherIssues from './pages/teacher/Issues';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAttendance from './pages/admin/TeacherAttendance';
import AdminIssues from './pages/admin/Issues';
import AdminOverview from './pages/admin/SchoolOverview';
import { AuthProvider } from './context/AuthContext';
export function App() {
  return <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* Student Routes */}
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/performance" element={<StudentPerformance />} />
            <Route path="/student/assignments" element={<StudentAssignments />} />
            <Route path="/student/fees" element={<StudentFees />} />
            <Route path="/student/help" element={<StudentHelp />} />
            {/* Teacher Routes */}
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/teacher/classes" element={<TeacherClasses />} />
            <Route path="/teacher/assignments" element={<TeacherAssignments />} />
            <Route path="/teacher/issues" element={<TeacherIssues />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/attendance" element={<AdminAttendance />} />
            <Route path="/admin/issues" element={<AdminIssues />} />
            <Route path="/admin/overview" element={<AdminOverview />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>;
}