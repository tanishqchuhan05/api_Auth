import React from "react";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "/default-movie.jpg"; 

  const baseUrl = process.env.REACT_APP_API_URL?.replace(/\/api\/$/, ""); 

  if (imagePath.startsWith("/uploads")) {
    return `${baseUrl}${imagePath}`; 
  }

  if (imagePath.startsWith("http")) {
    return imagePath; 
  }

  return `${baseUrl}/uploads/${imagePath}`;
};

const OrderCard = ({ order }) => {


  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0">
        {/* Movie Poster */}
        <div className="col-md-4">
          <img
            src={getImageUrl(order?.movieId?.image)} 
            alt={order?.movieId?.title}
            className="img-fluid rounded-start"
            style={{ height: "180px", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-movie.jpg"; 
            }}
          />
        </div>

        {/* Order Details */}
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{order?.movieId?.title}</h5>
            <p className="card-text"><strong>Tickets:</strong> {order?.quantity} Ticket(s)</p>
            <p className="card-text"><strong>Transaction ID:</strong> {order?.transactionId}</p>
            <p className="card-text"><strong>Total Amount:</strong> ₹{order?.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
