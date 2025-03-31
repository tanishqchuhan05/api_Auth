import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import getOrders from "../Services/orderService";
import SweetAlert from "../components/SweetAlert"
import URLS from "../utils/urls";
import { useNavigate } from "react-router-dom";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(); // Use centralized service
        if (data.length === 0) {
          SweetAlert.error("No orders found!", "Oops").then(()=>{
            navigate(URLS.ADMIN.DASHBOARD);
          });
        }
        setOrders(data);
      } catch (error) {
        SweetAlert.error("Error fetching orders:", error).then(()=>{
          navigate(URLS.ADMIN.DASHBOARD);
        });
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>
        {(orders.map((order) => <OrderCard key={order._id} order={order} />)
      )}
    </div>
  );
};

export default Orders;
