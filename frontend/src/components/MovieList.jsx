import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MovieList = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All Movies");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:7001/api/movies", {
          withCredentials: true,
        });

        console.log("Movies API Response:", response.data);
        setMovies(response.data);
        setFilteredMovies(response.data); // Default to all movies
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again.");
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredMovies(movies);
    }
  }, [searchQuery, movies]);

  const filterMovies = (category) => {
    setActiveFilter(category);
    if (category === "All Movies") {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter((movie) => movie.category.trim() === category));
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Movies</h2>

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center mb-4">
        {["All Movies", "Now Playing", "Latest Movies", "Upcoming Movies"].map((category) => (
          <button
            key={category}
            className={`btn mx-2 ${activeFilter === category ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => filterMovies(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Movie Cards */}
      <div className="row">
        {filteredMovies.length === 0 ? (
          <p className="text-center">No movies found</p>
        ) : (
          filteredMovies.map((movie) => (
            <div key={movie._id} className="col-md-3 mb-4">
              <div
                className="card shadow-sm cursor-pointer"
                onClick={() => handleMovieClick(movie._id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={movie.image.startsWith("/uploads") ? `http://localhost:7001${movie.image}` : movie.image}
                  alt={movie.title}
                  className="card-img-top"
                  style={{ height: "500px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{movie.title}</h5>
                  <p><strong>Release:</strong> {movie.releaseDate}</p>
                  <p><strong>Price:</strong> ₹{movie.price}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieList;
