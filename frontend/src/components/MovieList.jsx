import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("now_playing");

  // Wrap fetchMovies with useCallback to prevent unnecessary re-renders
  const fetchMovies = useCallback(() => {
    setLoading(true);
    setError("");

    axios
      .get(`http://localhost:7001/api/movies?category=${filter}`)
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch movies. Please try again.");
        setLoading(false);
      });
  }, [filter]); // ✅ Dependency added

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]); // ✅ Dependency added

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Movies</h2>

      {/* Filter Buttons */}
      <div className="mb-3">
        <button
          className={`btn ${filter === "now_playing" ? "btn-primary" : "btn-outline-primary"} me-2`}
          onClick={() => setFilter("now_playing")}
        >
          Now Playing
        </button>
        <button
          className={`btn ${filter === "latest" ? "btn-primary" : "btn-outline-primary"} me-2`}
          onClick={() => setFilter("latest")}
        >
          Latest Movies
        </button>
        <button
          className={`btn ${filter === "upcoming" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFilter("upcoming")}
        >
          Upcoming Movies
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Movie Cards */}
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4 col-lg-3 mb-4" key={movie._id}>
            <div className="card h-100 d-flex flex-column">
              <img
                src={movie.poster_path ? movie.poster_path : "https://via.placeholder.com/150"}
                className="card-img-top img-fluid"
                alt={movie.title}
                style={{ height: "500px", objectFit: "cover" }}
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  <strong>Genre:</strong> {movie.genre} <br />
                  <strong>Rating:</strong> {movie.rating}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
