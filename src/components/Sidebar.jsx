import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Ticket, Fingerprint, LogOut } from 'lucide-react';

export default function Sidebar({ onLogout }) {
  const location = useLocation();
  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Recommendations', path: '/recommend', icon: Ticket },
    { name: 'MovieDNA', path: '/dna', icon: Fingerprint },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-[#161b2a] h-screen sticky top-0 border-r border-gray-800">
      <div className="p-8 text-2xl font-bold text-indigo-400">MovieBot</div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <Link key={link.path} to={link.path} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${location.pathname === link.path ? 'bg-teal-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
            <link.icon size={20} /> {link.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button onClick={onLogout} className="flex items-center gap-3 p-3 text-red-400 hover:bg-gray-800 w-full rounded-xl transition-all">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
}