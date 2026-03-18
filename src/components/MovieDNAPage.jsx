import { useState, useEffect } from 'react';
import { Fingerprint, Clock, Star, Film, Heart, Loader2 } from 'lucide-react';

const iconMap = {
  Clock: Clock,
  Star: Star,
  Film: Film,
  Heart: Heart
};

export default function MovieDNAPage() {
  const [userStats, setUserStats] = useState([]);
  const [genreDNA, setGenreDNA] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDNAData = async () => {
      try {
        const response = await fetch('/api/dna');
        if (!response.ok) {
          throw new Error('Failed to fetch MovieDNA from the machine learning model.');
        }
        const data = await response.json();
        setUserStats(data.stats);
        setGenreDNA(data.genres);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDNAData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-green-400 gap-4">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="text-xl font-medium text-white">Analyzing your unique taste profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-400">
        <div className="bg-red-400/10 p-6 rounded-2xl border border-red-500/20 text-center max-w-lg">
          <h2 className="text-2xl font-bold mb-2">Connection Error</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white w-full max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center gap-4 mt-4">
        <div className="bg-green-500/20 p-4 rounded-full">
          <Fingerprint className="w-10 h-10 text-green-400" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Your MovieDNA</h1>
          <p className="text-gray-400 mt-1">A deep dive into your cinematic taste profile.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {userStats.map((stat) => {
          const IconComponent = iconMap[stat.iconName] || Star;
          return (
            <div key={stat.id} className="bg-[#161b2a] border border-gray-800 rounded-3xl p-6 flex flex-col gap-4 shadow-lg hover:border-gray-700 transition-colors">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#161b2a] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-lg">
        <h2 className="text-xl font-bold mb-6">Genre Composition</h2>
        <div className="flex flex-col gap-6">
          {genreDNA.map((genre) => (
            <div key={genre.id} className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-gray-300">{genre.name}</span>
                <span className="text-white">{genre.percentage}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${genre.barColor} transition-all duration-1000 ease-out`}
                  style={{ width: `${genre.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}