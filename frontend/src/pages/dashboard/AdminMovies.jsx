import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Icons for actions

const AdminMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:7001/api/admin/movies", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        console.log("Movies Data:", response.data.data); // Debugging: Check API response
        setMovies(response.data.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🎬 Movie Management</h2>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={() => navigate("/admin/addmovie")}>
          ➕ Add New Movie
        </button>
      </div>

      {/* Grid Layout for Movie Cards */}
      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card shadow-sm border-0 rounded movie-card">
                {/* Movie Poster */}
                <img
                  src={movie.poster_path ? movie.poster_path : "https://dummyimage.com/200x300/000/fff&text=No+Image"}
                  className="card-img-top movie-img"
                  alt={movie.title}
                  style={{ height: "500px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://dummyimage.com/200x300/000/fff&text=No+Image";
                  }}
                />

                <div className="card-body text-center">
                  <h5 className="card-title">{movie.title}</h5>
                  
                  {/* Corrected Release Date Field */}
                  <p className="card-text">
                    <strong>Release:</strong> {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : "N/A"}
                  </p>

                  <p className="card-text">
                    <strong>Price:</strong> {movie.price ? `₹${movie.price}` : "N/A"}
                  </p>

                  {/* Buttons (Closer Together) */}
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-warning btn-sm">
                      <FaEdit /> Edit
                    </button>
                    <button className="btn btn-danger btn-sm">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No movies available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminMovies;
