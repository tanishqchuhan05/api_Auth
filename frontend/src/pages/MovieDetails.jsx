import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaRegBookmark, FaArrowLeft } from "react-icons/fa";
import BookingModal from "../components/BookingModal";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7001/api/movies/${id}`,
          {
            withCredentials: true,
          }
        );

        const movieData = response.data;

        // Assign random rating and votes if missing
        movieData.rating =
          movieData.rating || (Math.random() * (10 - 5) + 5).toFixed(1);
        movieData.votes =
          movieData.votes || Math.floor(Math.random() * (1000 - 200) + 200);

        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details. Please try again.");
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) {
    return <div className="text-center text-danger mt-4">{error}</div>;
  }

  if (!movie) {
    return <div className="text-center text-white mt-4">Loading...</div>;
  }

  return (
    <div
      className="movie-details-container position-relative d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        color: "#fff",
        backgroundImage: `url(${
          movie.image.startsWith("/uploads")
            ? `http://localhost:7001${movie.image}`
            : movie.image
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
        }}
      ></div>

      {/* Back Button */}
      <button
        className="btn btn-light position-absolute"
        style={{
          top: "20px",
          left: "20px",
          background: "rgba(255, 255, 255, 0.3)",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "50px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={18} className="me-2" /> Back
      </button>

      {/* Content Container */}
      <div className="container position-relative d-flex align-items-center">
        <div className="row w-100">
          {/* Left Side - Movie Details */}
          <div className="col-md-7 text-white">
            <h1 className="fw-bold">
              {movie.title}{" "}
              <span className="text-white-50">
                ({new Date(movie.releaseDate).getFullYear()})
              </span>
            </h1>
            <div className="d-flex align-items-center my-2">
              <FaStar className="text-warning me-1" />
              <span className="fw-bold">{movie.rating} / 10</span>
              <span className="ms-2">{movie.votes} Votes</span>
            </div>
            <p className="lead">{movie.description}</p>
            <h5 className="fw-bold">Ticket Price: ₹{movie.price}</h5>

            {/* Buttons */}
            <div className="d-flex align-items-center">
              <button
                className="btn btn-danger me-3 fw-bold px-4 py-2"
                onClick={() => setShowModal(true)}
              >
                🎟 BOOK NOW
              </button>
              <button className="btn btn-dark d-flex align-items-center text-white">
                <FaRegBookmark size={20} className="me-2" />
                Save
              </button>
            </div>
          </div>

          {/* Right Side - Movie Poster */}
          <div className="col-md-5 d-flex justify-content-end">
            <img
              src={
                movie.image.startsWith("/uploads")
                  ? `http://localhost:7001${movie.image}`
                  : movie.image
              }
              alt={movie.title}
              className="rounded shadow-lg"
              style={{ width: "300px", borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        show={showModal}
        handleClose={() => setShowModal(false)} // Corrected prop name
        selectedMovie={movie} // Corrected prop name
        ticketCount={ticketCount}
        setTicketCount={setTicketCount}
      />
    </div>
  );
};

export default MovieDetails;
