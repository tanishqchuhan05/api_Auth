import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import Navbar from "../../components/UserNavbar";

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

  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Crime"];
  const categories = ["Now Playing", "Latest Movies", "Upcoming Movies"];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:7001/api/admin/movies", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setMovies(response.data.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewMovie((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleAddMovie = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!newMovie.title || !newMovie.description || !newMovie.genre || !newMovie.category || !newMovie.releaseDate || !newMovie.price || !newMovie.poster_path) {
        alert("Please fill in all fields.");
        return;
      }

      const formData = new FormData();
      formData.append("title", newMovie.title);
      formData.append("description", newMovie.description);
      formData.append("genre", newMovie.genre);
      formData.append("category", newMovie.category);
      formData.append("releaseDate", newMovie.releaseDate);
      formData.append("price", newMovie.price);
      formData.append("image", newMovie.poster_path);

      const response = await axios.post("http://localhost:7001/api/admin/addmovie", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setMovies([...movies, response.data.data]);

      setShowModal(false);
      setNewMovie({
        title: "",
        description: "",
        genre: "",
        category: "",
        releaseDate: "",
        price: "",
        poster_path: null,
      });

      alert("Movie added successfully!");
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie. Please try again.");
    }
  };

  return (
    <><Navbar /><div className="container mt-4">
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
              <div className="card shadow-sm border-0 rounded movie-card">
                <img
                  src={movie.image && movie.image.startsWith("http")
                    ? movie.image
                    : `http://localhost:7001${movie.image}`}
                  alt={movie.title}
                  className="card-img-top" />
                <div className="card-body text-center">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    <strong>Release:</strong>{" "}
                    {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : "N/A"}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> {movie.price ? `₹${movie.price}` : "N/A"}
                  </p>
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

                <select className="form-control mb-2" name="genre" value={newMovie.genre} onChange={handleInputChange}>
                  <option value="">Select Genre</option>
                  {genres.map((genre, index) => (
                    <option key={index} value={genre}>{genre}</option>
                  ))}
                </select>

                <select className="form-control mb-2" name="category" value={newMovie.category} onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>

                <input type="date" className="form-control mb-2" name="releaseDate" value={newMovie.releaseDate} onChange={handleInputChange} />
                <input type="number" className="form-control mb-2" name="price" placeholder="Price (₹)" value={newMovie.price} onChange={handleInputChange} />
                <input type="file" className="form-control mb-2" name="poster_path" accept="image/*" onChange={handleInputChange} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleAddMovie}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div></>
  );
};

export default AdminMovies;
