import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingModal = ({ show, handleClose, selectedMovie, userId }) => {
    const [ticketCount, setTicketCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);  // Initialize as 0

    const movieTitle = selectedMovie?.title || "Movie Name";
    const ticketPrice = selectedMovie?.price || 0;
    const convenienceFee = 50;  // Fixed convenience fee

    // ✅ FIX: Calculate total amount with convenience fee applied once
    useEffect(() => {
        setTotalAmount(ticketCount * ticketPrice + convenienceFee);
    }, [ticketCount, ticketPrice]);

    const handlePayment = async () => {
        setLoading(true);
        setTimeout(async () => {
            const fakeTransactionId = `TXN${Math.floor(Math.random() * 1000000)}`;
            setTransactionId(fakeTransactionId);

            const token = localStorage.getItem("token");
            if (!token) {
                alert("You need to be logged in to make a payment.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    "http://localhost:7001/api/orders/create",
                    {
                        userId,
                        movieId: selectedMovie?._id,
                        transactionId: fakeTransactionId,
                        quantity: ticketCount,
                        // totalAmount,
                        status: "confirmed",
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.status === 201) {
                    setPaymentSuccess(true);
                    setTimeout(() => {
                        handleClose();
                        window.location.href = "/orders"; // Redirect to orders page
                    }, 5000);
                }
            } catch (error) {
                console.error("Error creating order:", error);
                alert("Failed to place order. Try again.");
            }
            setLoading(false);
        }, 2000);
    };

    return (
        <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-3">
                    <div className="modal-body p-4">
                        {paymentSuccess ? (
                            <div className="text-center" style={{ backgroundColor: "#f7f7f7", padding: "20px", borderRadius: "10px" }}>
                                <h5 className="text-success fw-bold">Payment Successful</h5>
                                <p style={{ color: "black" }}>Movie: <strong>{movieTitle}</strong></p>
                                <p style={{ color: "black" }}>Transaction ID: <strong>{transactionId}</strong></p>
                                <p style={{ color: "black" }}>Redirecting to dashboard in 5s...</p>
                                <button className="btn btn-primary" onClick={() => window.location.href = "/orders"}>
                                    CHECK ORDERS
                                </button>
                            </div>
                        ) : (
                            <>
                                <h5 className="text-center text-danger fw-bold">BOOKING SUMMARY</h5>
                                <div className="d-flex align-items-center mt-3">
                                    <span className="fw-bold fs-5 text-dark">🎬 {movieTitle}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-3 text-dark">
                                    <span className="fw-bold">Tickets:</span>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-light btn-sm" onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}> – </button>
                                        <span className="mx-2 fw-bold">{ticketCount}</span>
                                        <button className="btn btn-light btn-sm" onClick={() => setTicketCount(ticketCount + 1)}> + </button>
                                    </div>
                                </div>
                                <div className="mt-3 text-dark">
                                    <div className="d-flex justify-content-between">
                                        <span>Total Ticket Price</span>
                                        <span className="fw-bold">₹ {ticketCount * ticketPrice}</span> 
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
                                    <button className="btn btn-outline-danger fw-bold flex-grow-1" onClick={handleClose}>
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
