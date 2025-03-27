import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import movieListService from "../Services/movieListService";

const MovieList = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All Movies");
  const navigate = useNavigate();


  const getImageUrl = (imagePath) => {
  if (!imagePath) return "/default-movie.jpg"; // Fallback image

  const baseUrl = process.env.REACT_APP_API_URL?.replace(/\/api\/$/, "");

  if (imagePath.startsWith("/uploads")) {
    return `${baseUrl}${imagePath}`; // Ensures correct URL
  }

  if (imagePath.startsWith("http")) {
    return imagePath; // Already a full URL
  }

  return `${baseUrl}/uploads/${imagePath}`;
};


  // Fetch movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieListService.getAllMovies();
        console.log("Movies fetched in Movielist", data)
        setMovies(data);
        setFilteredMovies(data);
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
      }
    };

    fetchMovies();
  }, []);

  // Filter movies when searchQuery changes
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

  // Filter movies by category
  const filterMovies = (category) => {
    setActiveFilter(category);
    setFilteredMovies(
      category === "All Movies"
        ? movies
        : movies.filter((movie) => movie.category.trim() === category)
    );
  };

  // Navigate to movie details page
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
                className="card shadow-sm"
                onClick={() => handleMovieClick(movie._id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={getImageUrl(movie.image)}
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
