import { useState, useEffect } from 'react';
import { Clock, Calendar, Star, MoreVertical, PlayCircle, Loader2 } from 'lucide-react';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch('/api/history');
        if (!response.ok) {
          throw new Error('Failed to retrieve your viewing history from the database.');
        }
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-blue-400 gap-4">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="text-xl font-medium text-white">Retrieving your cinematic timeline...</p>
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
        <div className="bg-blue-500/20 p-4 rounded-full">
          <Clock className="w-10 h-10 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Watch History</h1>
          <p className="text-gray-400 mt-1">Review your previously recommended and highly rated films.</p>
        </div>
      </div>

      <div className="bg-[#161b2a] border border-gray-800 rounded-3xl p-6 shadow-lg flex flex-col gap-4">
        {history.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-xl">You have not logged any movies yet.</p>
          </div>
        ) : (
          history.map((movie) => (
            <div key={movie.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-700 group cursor-pointer">
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="relative w-16 h-24 rounded-lg overflow-hidden shrink-0 shadow-md">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold text-gray-100 group-hover:text-teal-400 transition-colors">{movie.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {movie.runtime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0 gap-6 sm:gap-12 pl-22 sm:pl-0">
                <div className="flex flex-col sm:items-end gap-1">
                  <span className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-blue-400" /> {movie.date}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(movie.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <button className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}