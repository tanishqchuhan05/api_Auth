import React, { useState, useEffect } from "react";
import { processPayment } from "../Services/bookingModalService";

const BookingModal = ({ show, handleClose, selectedMovie, userId }) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const movieTitle = selectedMovie?.title || "Movie Name";
  const ticketPrice = selectedMovie?.price || 0;
  const convenienceFee = 50;

  useEffect(() => {
    if (selectedMovie) {
      setTotalAmount(ticketCount * ticketPrice + convenienceFee);
    }
  }, [ticketCount, ticketPrice, selectedMovie]);

  const handlePayment = () => {
    processPayment({
      userId,
      selectedMovie,
      ticketCount,
      totalAmount,
      setTransactionId,
      setPaymentSuccess,
      setLoading,
      handleClose,
    });
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : "d-none"}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-3">
          <div className="modal-body p-4">
            {paymentSuccess ? (
              <div
                className="text-center p-4 rounded-3"
                style={{ backgroundColor: "#ffffff" }}
              >
                <h5 className="text-success fw-bold">Payment Successful</h5>
                <p className="text-dark fw-bold">
                  Movie: <strong className="text-dark">{movieTitle}</strong>
                </p>
                <p className="text-dark fw-bold">
                  Transaction ID:{" "}
                  <strong className="text-dark">{transactionId}</strong>
                </p>
                <p className="text-dark fw-bold">
                  Redirecting to orders
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.href = "/orders")}
                >
                  CHECK ORDERS
                </button>
              </div>
            ) : (
              <>
                <h5 className="text-center text-danger fw-bold">
                  BOOKING SUMMARY
                </h5>
                <div className="d-flex align-items-center mt-3">
                  <span className="fw-bold fs-5 text-dark">
                    🎬 {movieTitle}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 text-dark">
                  <span className="fw-bold">Tickets:</span>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-light btn-sm"
                      onClick={() =>
                        setTicketCount(Math.max(1, ticketCount - 1))
                      }
                    >
                      {" "}
                      –{" "}
                    </button>
                    <span className="mx-2 fw-bold">{ticketCount}</span>
                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => setTicketCount(ticketCount + 1)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </div>
                <div className="mt-3 text-dark">
                  <div className="d-flex justify-content-between">
                    <span>Total Ticket Price</span>
                    <span className="fw-bold">
                      ₹ {ticketCount * ticketPrice}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Convenience Fee</span>
                    <span>₹ {convenienceFee}</span>
                  </div>
                </div>
                <div className="bg-warning p-2 mt-3 rounded d-flex justify-content-between text-dark">
                  <span className="fw-bold">Amount Payable</span>
                  <span className="fw-bold">₹ {totalAmount}</span>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="btn btn-danger text-white fw-bold flex-grow-1 me-2"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : `PAY NOW ₹ ${totalAmount}`}
                  </button>
                  <button
                    className="btn btn-outline-danger fw-bold flex-grow-1"
                    onClick={handleClose}
                  >
                    CANCEL
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
