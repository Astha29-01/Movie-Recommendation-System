import { Link } from 'react-router-dom';
import { Ticket, Fingerprint, Users, Clock, Settings } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="p-6 text-white font-sans flex flex-col gap-6 w-full">
      {/* Header Section */}
      <div className="mt-4 flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">Welcome Back, Explorer</h1>
          <p className="text-gray-400 text-sm md:text-base">Ready to find your next favorite movie?</p>
        </div>
        <Settings className="w-6 h-6 md:w-8 md:h-8 text-gray-400 cursor-pointer hover:rotate-90 transition-transform" />
      </div>
      
      {/* Main Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Large Recommendation Card */}
        <Link to="/recommend" className="md:col-span-2 bg-[#1e5c5b] rounded-[32px] p-6 min-h-[160px] flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-transform">
          <span className="font-semibold text-xl">Get Recommendations</span>
          <div className="flex justify-between items-end">
            <span className="text-sm text-teal-200">Personalized picks from your ML model</span>
            <div className="bg-teal-400 p-3 rounded-full">
              <Ticket className="w-7 h-7 text-[#1e5c5b]" />
            </div>
          </div>
        </Link>

        {/* MovieDNA Card */}
        <Link to="/dna" className="bg-[#2e7d4c] rounded-[32px] p-6 min-h-[160px] flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-transform">
          <span className="font-semibold text-lg">MovieDNA</span>
          <div className="flex justify-between items-end">
            <span className="text-xs text-green-200 w-2/3">Analyze your taste profile</span>
            <div className="bg-green-400 p-2 rounded-full">
              <Fingerprint className="w-6 h-6 text-[#2e7d4c]" />
            </div>
          </div>
        </Link>

        {/* Movie BFF Card */}
        <Link to="/bff" className="bg-[#554370] rounded-[32px] p-6 min-h-[160px] flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-transform">
          <span className="font-semibold text-lg">Movie BFF</span>
          <div className="flex justify-between items-end">
            <span className="text-xs text-purple-200 w-2/3">Compare results with friends</span>
            <div className="bg-purple-400 p-2 rounded-full">
              <Users className="w-6 h-6 text-[#554370]" />
            </div>
          </div>
        </Link>

        {/* History Card */}
        <Link to="/history" className="bg-[#1c5088] rounded-[32px] p-6 min-h-[160px] flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-transform">
          <span className="font-semibold text-lg">History</span>
          <div className="flex justify-between items-end">
            <span className="text-xs text-blue-200 w-2/3">View past recommendations</span>
            <div className="bg-blue-400 p-2 rounded-full">
              <Clock className="w-6 h-6 text-[#1c5088]" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}