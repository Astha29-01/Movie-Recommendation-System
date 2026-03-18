import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import RecommendPage from './components/RecommendPage';
import MovieDNAPage from './components/MovieDnaPage';
import HistoryPage from './components/HistoryPage';
import MovieBFFPage from './components/MovieBFFPage';

// Placeholder for future dedicated pages
const Placeholder = ({ title }) => <div className="p-10 text-3xl font-bold text-white">{title}</div>;

export default function App() {
  const [auth, setAuth] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setAuth(false);
  };

  // If not authenticated, only show AuthPage
  if (!auth) {
    return (
      <Routes>
        <Route path="*" element={<AuthPage setAuth={setAuth} />} />
      </Routes>
    );
  }

  // Dashboard Layout for Authenticated Users
  return (
    <div className="flex min-h-screen bg-[#0b0f19]">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">
      <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/recommend" element={<RecommendPage />} />
      <Route path="/dna" element={<MovieDNAPage />} />
      <Route path="/bff" element={<MovieBFFPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
      </main>
    </div>
  );
}