import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import getOrders from "../Services/orderService";


const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(); // Use centralized service
        setOrders(data);
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
