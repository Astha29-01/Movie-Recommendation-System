import { useState, useEffect } from 'react';
import { Search, Star, PlayCircle, Loader2 } from 'lucide-react';

export default function RecommendPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('Inception');

  const fetchRecommendations = async (titleToSearch) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movie_title: titleToSearch })
      });
      
      if (!response.ok) {
        throw new Error(`We couldn't find "${titleToSearch}" in the database. Try another movie!`);
      }
      
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations(searchQuery);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchRecommendations(searchQuery);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-teal-400 gap-4">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="text-xl font-medium text-white">We are calculating the perfect recommendations for you...</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white w-full max-w-7xl mx-auto flex flex-col gap-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Top Recommendations</h1>
          <p className="text-gray-400 mt-1">Curated specially for your unique taste profile by your custom model.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Type a movie and press Enter..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full bg-[#161b2a] border border-gray-800 rounded-2xl py-2.5 px-12 text-white focus:border-teal-500 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-400/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="group relative rounded-2xl overflow-hidden bg-[#161b2a] border border-gray-800 shadow-lg hover:shadow-teal-900/20 transition-all hover:-translate-y-2 cursor-pointer duration-300">
            <div className="aspect-[2/3] w-full overflow-hidden relative">
              <img src={movie.image} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/40 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="w-16 h-16 text-teal-400 drop-shadow-lg" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg leading-tight line-clamp-1">{movie.title}</h3>
                <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold">{movie.rating}</span>
                </div>
              </div>
              <span className="text-sm text-teal-300 font-medium">{movie.genre}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}