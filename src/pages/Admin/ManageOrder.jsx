import React, { useState, useEffect } from 'react';

const ManageOrder = () => {
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await fetch('https://backend-ecommerce-theta-one.vercel.app/order/checkouts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch checkouts');
        }
        const data = await response.json();
        setCheckouts(data.checkouts);
      } catch (error) {
        console.error('Error fetching checkouts:', error);
      }
    };

    fetchCheckouts();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setCheckouts(checkouts.map(checkout =>
      checkout._id === id ? { ...checkout, status: newStatus } : checkout
    ));
  };

  const handleComplete = async (id) => {
    try {
      const response = await fetch(`https://backend-ecommerce-theta-one.vercel.app/order/complete/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark checkout as completed');
      }

      const data = await response.json();
      setCheckouts(checkouts.map(checkout =>
        checkout._id === id ? { ...checkout, status: 'Completed' } : checkout
      ));
      alert('Checkout marked as completed:', data.checkout);
    } catch (error) {
      console.error('Error marking checkout as completed:', error);
    }   
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Order</h2>
      {checkouts.map((checkout) => (
        <div key={checkout._id} className="card mb-3 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Order #{checkout._id}</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Recipient Name:</strong> {checkout.recipientName}</p>
                <p><strong>Address:</strong> {checkout.address}</p>
                <p><strong>WhatsApp Number:</strong> {checkout.whatsappNumber}</p>
                <p><strong>Proof of Transfer:</strong></p>
                {checkout.proofOfTransfer && (
                  <a
                    href={checkout.proofOfTransfer}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={checkout.proofOfTransfer}
                      alt="Proof of Transfer"
                      className="img-thumbnail"
                      style={{ width: '150px' }}
                    />
                  </a>
                )}
              </div>
              <div className="col-md-6">
                <ul className="list-group mb-3">
                  {checkout.items.map((item) => (
                    <li key={item._id} className="list-group-item">
                      <p><strong>Product:</strong> {item.title}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Size:</strong> {item.size}</p>
                    </li>
                  ))}
                </ul>
                <div className="form-group">
                  <label htmlFor={`status-${checkout._id}`}>Status:</label>
                  <select
                    id={`status-${checkout._id}`}
                    value={checkout.status || ''}
                    onChange={(e) => handleStatusChange(checkout._id, e.target.value)}
                    className="form-control"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <button
                  onClick={() => handleComplete(checkout._id)}
                  className="btn btn-success mt-3 w-100"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageOrder;
