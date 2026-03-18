import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';

export default function AuthPage({ setAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    setAuth(true); // Updates the state in App.jsx
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] p-6">
      <div className="w-full max-w-md bg-[#161b2a] rounded-[32px] p-8 shadow-2xl border border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
              <input type="text" placeholder="Full Name" className="w-full bg-[#0b0f19] border border-gray-800 rounded-2xl py-3 px-12 text-white outline-none" required />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
            <input type="email" placeholder="Email" className="w-full bg-[#0b0f19] border border-gray-800 rounded-2xl py-3 px-12 text-white outline-none" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
            <input type="password" placeholder="Password" className="w-full bg-[#0b0f19] border border-gray-800 rounded-2xl py-3 px-12 text-white outline-none" required />
          </div>
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-2xl transition-all">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="w-full text-center text-teal-400 mt-6 hover:underline">
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  );
}