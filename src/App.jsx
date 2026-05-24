import { useState } from "react";
import "./App.css";

function App() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    if (!movie.trim()) return;

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${movie}`
      );

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Movie Search App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movie..."
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />

        <button onClick={getMovies}>Search</button>
      </div>

      <div className="movie-list">
        {movies.map((item) => (
          <div className="card" key={item.show.id}>
            <img
              src={
                item.show.image
                  ? item.show.image.medium
                  : "https://via.placeholder.com/200x300"
              }
              alt={item.show.name}
            />

            <h3>{item.show.name}</h3>
            <p>{item.show.language}</p>
            <p>{item.show.premiered}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;