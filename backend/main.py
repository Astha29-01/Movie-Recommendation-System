from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import pickle
import requests
import os
from dotevn import load_dotenv

# 1. Initialize the App
app = FastAPI(title="MovieBot API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
TMDB_API_KEY = os.getenv("TMDB_API_KEY")

# 2. Load the ML Models
try:
    movies_dict = pickle.load(open('movies.pkl', 'rb'))
    movies = pd.DataFrame(movies_dict) 
    similarity = pickle.load(open('similarity.pkl', 'rb'))
    print("Machine learning assets loaded.")
except Exception as e:
    print(f"Critical Error Loading Assets: {e}")

# 3. Define the Request Structure
class RecommendationRequest(BaseModel):
    movie_title: str

# 4. TMDB Metadata Helper Function
def fetch_tmdb_metadata(title):
    try:
        url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={title}"
        response = requests.get(url)
        data = response.json()

        if data['results']:
            movie_data = data['results'][0]
            poster_path = movie_data.get('poster_path')
            
            return {
                "image": f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else "https://via.placeholder.com/500x750?text=No+Poster",
                "rating": round(movie_data.get('vote_average', 0), 1),
                "genre": "Matches Profile"
            }
    except Exception as e:
        print(f"TMDB Fetch Error: {e}")
        
    return {
        "image": "https://via.placeholder.com/500x750?text=Poster+Not+Found",
        "rating": "N/A",
        "genre": "Unknown"
    }

# 5. The Main Recommendation Endpoint (Now Case-Insensitive!)
@app.post("/api/recommend")
async def get_recommendations(request: RecommendationRequest):
    try:
        # Convert both the search query and the database titles to lowercase to find a match
        search_query = request.movie_title.lower().strip()
        matched_movies = movies[movies['title'].str.lower().str.strip() == search_query]
        
        # If the resulting list is empty, the movie doesn't exist in the dataset
        if matched_movies.empty:
            raise HTTPException(status_code=404, detail="Movie not found in the database.")
            
        # Get the index of the first matched movie
        movie_index = matched_movies.index[0]
        
        distances = similarity[movie_index]
        movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:5]
        
        results = []
        for i in movies_list:
            target_index = i[0]
            title = str(movies.iloc[target_index].title)
            
            # Fetch live data from TMDB for each recommended movie
            tmdb_data = fetch_tmdb_metadata(title)
            
            results.append({
                "id": int(movies.iloc[target_index].movie_id),
                "title": title,
                "rating": str(tmdb_data["rating"]),
                "genre": tmdb_data["genre"],
                "image": tmdb_data["image"]
            })
            
        return results

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6. Health Check Endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "Active", "model_loaded": True}