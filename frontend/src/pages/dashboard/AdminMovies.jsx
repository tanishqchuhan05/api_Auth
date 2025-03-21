// AdminMovies.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import apiService from "../../Services/adminMovieService"; // Import the centralized API service

const AdminMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    genre: "",
    category: "",
    releaseDate: "",
    price: "",
    poster_path: null,
  });

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const moviesData = await apiService.fetchMovies(); // Use centralized service
      setMovies(moviesData);
    } catch (error) {
      alert("Failed to fetch movies.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewMovie((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleAddMovie = async () => {
    try {
      if (Object.values(newMovie).some((field) => !field)) {
        alert("Please fill in all fields.");
        return;
      }

      const addedMovie = await apiService.addMovie(newMovie); // Use centralized service
      setMovies((prevMovies) => [...prevMovies, addedMovie]);
      setShowModal(false);
      resetNewMovie();
      alert("Movie added successfully!");
    } catch (error) {
      alert("Failed to add movie.");
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
      if (!confirmDelete) return;

      await apiService.deleteMovie(movieId); // Use centralized service
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
      alert("Movie deleted successfully!");
    } catch (error) {
      alert("Failed to delete movie.");
    }
  };

  const resetNewMovie = () => {
    setNewMovie({
      title: "",
      description: "",
      genre: "",
      category: "",
      releaseDate: "",
      price: "",
      poster_path: null,
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">🎬 Movie Management</h2>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            ➕ Add New Movie
          </button>
        </div>

        <div className="row">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card h-100 shadow-sm border-0 rounded d-flex flex-column">
                  <img
                    src={movie.image.startsWith("http") ? movie.image : `http://localhost:7001${movie.image}`}
                    alt={movie.title}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "500px" }}
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      <strong>Release:</strong>{" "}
                      {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : "N/A"}
                    </p>
                    <p className="card-text">
                      <strong>Price:</strong> ₹{movie.price}
                    </p>
                    <button className="btn btn-danger btn-sm mt-auto" onClick={() => handleDeleteMovie(movie._id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No movies available.</p>
          )}
        </div>

        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Movie</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input type="text" className="form-control mb-2" name="title" placeholder="Title" value={newMovie.title} onChange={handleInputChange} />
                  <textarea className="form-control mb-2" name="description" placeholder="Description" value={newMovie.description} onChange={handleInputChange}></textarea>
                  <input type="date" className="form-control mb-2" name="releaseDate" value={newMovie.releaseDate} onChange={handleInputChange} />
                  <input type="number" className="form-control mb-2" name="price" placeholder="Price (₹)" value={newMovie.price} onChange={handleInputChange} />
                  <input type="file" className="form-control mb-2" name="poster_path" accept="image/*" onChange={handleInputChange} />
                  <input type="text" className="form-control mb-2" name="genre" placeholder="Genre" value={newMovie.genre} onChange={handleInputChange} />
                  <select className="form-control mb-2" name="category" value={newMovie.category} onChange={handleInputChange}>
                    <option value="">Select Category</option>
                    <option value="Now Playing">Now Playing</option>
                    <option value="Latest">Latest</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={handleAddMovie}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminMovies;
