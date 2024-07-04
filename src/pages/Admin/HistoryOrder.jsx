import React, { useState, useEffect } from 'react';

const HistoryOrder = () => {
  const [historyOrders, setHistoryOrders] = useState([]);

  useEffect(() => {
    const fetchHistoryOrders = async () => {
      try {
        const response = await fetch('https://backend-ecommerce-theta-one.vercel.app/order/history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch history orders');
        }
        const data = await response.json();
        setHistoryOrders(data.historyOrders);
      } catch (error) {
        console.error('Error fetching history orders:', error);
      }
    };

    fetchHistoryOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Order History</h2>
      {historyOrders.map((order) => (
        <div key={order._id} className="card mb-3 shadow-sm">
          <div className="card-header bg-secondary text-white">
            <h5 className="mb-0">Order #{order._id}</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Recipient Name:</strong> {order.recipientName}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>WhatsApp Number:</strong> {order.whatsappNumber}</p>
                <p><strong>Proof of Transfer:</strong></p>
                {order.proofOfTransfer && (
                  <a
                    href={order.proofOfTransfer}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={order.proofOfTransfer}
                      alt="Proof of Transfer"
                      className="img-thumbnail"
                      style={{ width: '150px' }}
                    />
                  </a>
                )}
              </div>
              <div className="col-md-6">
                <ul className="list-group mb-3">
                  {order.items.map((item) => (
                    <li key={item._id} className="list-group-item">
                      <p><strong>Product:</strong> {item.title}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Size:</strong> {item.size}</p>
                        <hr></hr>
                    </li>
                  ))}
                </ul>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Completed At:</strong> {new Date(order.completedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryOrder;
