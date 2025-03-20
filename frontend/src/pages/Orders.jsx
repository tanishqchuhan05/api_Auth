import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Get auth token
        const res = await axios.get("http://localhost:7001/api/orders", { // Updated endpoint
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res)
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      )}
    </div>
  );
};

export default Orders;
