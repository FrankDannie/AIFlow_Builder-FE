import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import { Routes, Route, Navigate } from 'react-router-dom';
import WorkflowEditorPage from './pages/WorkflowEditorPage/WorkflowEditorPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/workflow/:id" element={<WorkflowEditorPage />} />
    </Routes>
  );
}
