import { useState, useEffect } from 'react';
import { Users, UserPlus, Heart, Swords, Loader2 } from 'lucide-react';

export default function MovieBFFPage() {
  const [activeFriend, setActiveFriend] = useState(null);
  const [sharedFavorites, setSharedFavorites] = useState([]);
  const [genreAlignment, setGenreAlignment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendCompatibility = async () => {
      try {
        const response = await fetch('/api/bff');
        if (!response.ok) {
          throw new Error('Failed to calculate taste compatibility with your friends network.');
        }
        const data = await response.json();
        setActiveFriend(data.friend);
        setSharedFavorites(data.shared);
        setGenreAlignment(data.genres);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriendCompatibility();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-purple-400 gap-4">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="text-xl font-medium text-white">Calculating compatibility algorithms...</p>
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

  if (!activeFriend) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400 gap-4 text-center">
        <Users className="w-16 h-16 text-gray-600 mb-2" />
        <h2 className="text-2xl font-bold text-white">No Friends Connected</h2>
        <p className="max-w-md">Add friends to your network to start comparing your cinematic taste profiles and discover movies together.</p>
        <button className="mt-4 flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl text-white font-bold transition-colors">
          <UserPlus className="w-5 h-5" />
          <span>Find Friends</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 text-white w-full max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        <div className="flex items-center gap-4">
          <div className="bg-purple-500/20 p-4 rounded-full">
            <Users className="w-10 h-10 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Movie BFF</h1>
            <p className="text-gray-400 mt-1">Compare your cinematic taste profile with your friends.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#161b2a] border border-gray-800 hover:border-teal-500 px-4 py-2 rounded-xl transition-colors">
          <UserPlus className="w-5 h-5 text-teal-400" />
          <span className="font-medium">Add Friend</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-[#161b2a] border border-gray-800 rounded-3xl p-8 shadow-lg flex flex-col items-center justify-center gap-6 text-center">
          <h2 className="text-xl font-bold w-full text-left mb-2">Compatibility Score</h2>
          <div className="relative w-48 h-48 rounded-full border-8 border-gray-800 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-8 border-purple-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
                {activeFriend.matchScore}%
              </span>
              <span className="text-sm text-gray-400 mt-2">Match with {activeFriend.name}</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            You and {activeFriend.name} have incredibly similar tastes, making you fantastic movie companions!
          </p>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#161b2a] border border-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-6 h-6 text-teal-400" />
              <h2 className="text-xl font-bold">Movies You Both Love</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {sharedFavorites.map((movie) => (
                <div key={movie.id} className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-md group cursor-pointer">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-sm font-bold truncate">{movie.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#161b2a] border border-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Swords className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold">Genre Alignment</h2>
            </div>
            <div className="flex flex-col gap-5">
              {genreAlignment.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-300">{item.genre}</span>
                    <span className="text-white">{item.alignment}% Match</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden flex">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.alignment}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}