import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import apiService from "../../Services/adminMovieService";
import { showToast } from "../../components/Toast";
import Swal from "sweetalert2";

const AdminMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    genre: "",
    category: "",
    releaseDate: "",
    price: "",
    poster_path: null,
  });
  const [editingMovie, setEditingMovie] = useState(null); // State to hold the movie being edited

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const moviesData = await apiService.fetchMovies();
      setMovies(moviesData);
      showToast("Movies fetched successfully", "success");
    } catch (error) {
      showToast("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = async () => {
    try {
      if (!newMovie.title || !newMovie.description || !newMovie.releaseDate || !newMovie.price) {
        showToast("Please fill in all required fields.", "error");
        return;
      }
  
      const movieData = { ...newMovie };
      const addedMovie = await apiService.addMovie(movieData); // Call the add movie API
      setMovies((prevMovies) => [...prevMovies, addedMovie]);
      setShowModal(false);
      resetNewMovie();
      showToast("Movie added successfully!");
    } catch (error) {
      showToast("Failed to add movie.");
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewMovie((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie); // Set the movie to be edited
    setNewMovie(movie); // Pre-fill the movie data in the modal
    setShowModal(true); // Show the modal
  };

  const handleUpdateMovie = async () => {
    try {
      if (!newMovie.title || !newMovie.description || !newMovie.releaseDate || !newMovie.price) {
        showToast("Please fill in all required fields.", "error");
        return;
      }

      const movieData = { ...newMovie };
      const updatedMovie = await apiService.updateMovie(editingMovie._id, movieData); // Call the update API
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === updatedMovie._id ? updatedMovie : movie
        )
      );
      setShowModal(false);
      resetNewMovie();
      showToast("Movie updated successfully!");
    } catch (error) {
      showToast("Failed to update movie.");
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
      if (!result.isConfirmed) return;

      await apiService.deleteMovie(movieId);
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== movieId)
      );
      Swal.fire("Deleted!", "Movie has been deleted.", "success");
    } catch (error) {
      showToast("Failed to delete movie.", "error");
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
    setEditingMovie(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">🎬 Movie Management</h2>
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}
          >
            ➕ Add New Movie
          </button>
        </div>

        <div className="row">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie._id}
                className={`col-lg-3 col-md-4 col-sm-6 mb-4 ${movie.isDeleted ? "opacity-50" : ""}`}
              >
                <div className="card h-100 shadow-sm border-0 rounded d-flex flex-column">
                  <img
                    src={movie.image.startsWith("http") ? movie.image : `${process.env.REACT_APP_IMAGE_URL}${movie.image}`}
                    alt={movie.title}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "500px" }}
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      <strong>Release:</strong>{" "}
                      {movie.releaseDate
                        ? new Date(movie.releaseDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p className="card-text">
                      <strong>Price:</strong> ₹{movie.price}
                    </p>
                    <button
                      className="btn btn-primary btn-sm mt-auto"
                      onClick={() => handleEditMovie(movie)} // Edit button
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => handleDeleteMovie(movie._id)}
                    >
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

        {/* Edit Movie Modal */}
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingMovie ? "Edit Movie" : "Add New Movie"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="title"
                    placeholder="Title"
                    value={newMovie.title}
                    onChange={handleInputChange}
                  />
                  <textarea
                    className="form-control mb-2"
                    name="description"
                    placeholder="Description"
                    value={newMovie.description}
                    onChange={handleInputChange}
                  ></textarea>
                  <input
                    type="date"
                    className="form-control mb-2"
                    name="releaseDate"
                    value={newMovie.releaseDate}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    className="form-control mb-2"
                    name="price"
                    placeholder="Price (₹)"
                    value={newMovie.price}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="imageURL"
                    placeholder="Enter Image URL"
                    value={newMovie.image}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="genre"
                    placeholder="Genre"
                    value={newMovie.genre}
                    onChange={handleInputChange}
                  />
                  <select
                    className="form-control mb-2"
                    name="category"
                    value={newMovie.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    <option value="Now Playing">Now Playing</option>
                    <option value="Latest Movies">Latest Movies</option>
                    <option value="Upcoming Movies">Upcoming Movies</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={editingMovie ? handleUpdateMovie : handleAddMovie}
                  >
                    Submit
                  </button>
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
