// src/components/UserOrders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/order/orders', {
          headers: {
            'Authorization': `${localStorage.getItem('token')}` // Assuming you store your JWT token in localStorage
          }
        });
        setOrders(response.data.orders);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              <h2>Order ID: {order._id}</h2>
              <p>Recipient: {order.recipientName}</p>
              <p>Address: {order.address}</p>
              <p>WhatsApp Number: {order.whatsappNumber}</p>
              <p>Proof of Transfer: {order.proofOfTransfer}</p>
              <h3>Items:</h3>
              <ul>
                {order.items.map(item => (
                  <li key={item.product}>
                    <p>Title: {item.title}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserOrder;
