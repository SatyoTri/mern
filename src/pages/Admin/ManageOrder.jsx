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

  const handleShippingStatusUpdate = async (id, shippingStatus) => {
    try {
      const response = await fetch(`https://backend-ecommerce-theta-one.vercel.app/order/shipping-status/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shippingStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update shipping status');
      }

      const data = await response.json();
      setCheckouts(checkouts.map(checkout =>
        checkout._id === id ? { ...checkout, shippingStatus } : checkout
      ));
      alert('Shipping status updated:', data.checkout);
    } catch (error) {
      console.error('Error updating shipping status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://backend-ecommerce-theta-one.vercel.app/order/checkouts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete checkout');
      }

      setCheckouts(checkouts.filter(checkout => checkout._id !== id));
      alert('Checkout deleted successfully');
    } catch (error) {
      console.error('Error deleting checkout:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Order</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Recipient Name</th>
            <th scope="col">Address</th>
            <th scope="col">WhatsApp Number</th>
            <th scope="col">Proof of Transfer</th>
            <th scope="col">Shipping Status</th>
            <th scope="col">Items</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {checkouts.map((checkout) => (
            <tr key={checkout._id}>
              <td>{checkout._id}</td>
              <td>{checkout.recipientName}</td>
              <td>{checkout.address}</td>
              <td>{checkout.whatsappNumber}</td>
              <td>
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
              </td>
              <td>{checkout.shippingStatus}</td>
              <td>
                <ul className="list-group">
                  {checkout.items.map((item) => (
                    <li key={item._id} className="list-group-item">
                      <p><strong>Product:</strong> {item.title}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Size:</strong> {item.size}</p>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button
                  onClick={() => handleComplete(checkout._id)}
                  className="btn btn-success btn-sm"
                >
                  Complete
                </button>
                <div className="mt-3">
                  <label htmlFor="shippingStatus">Update Shipping Status:</label>
                  <select
                    id="shippingStatus"
                    className="form-control form-control-sm"
                    onChange={(e) => handleShippingStatusUpdate(checkout._id, e.target.value)}
                    value={checkout.shippingStatus}
                  >
                    <option value="Pending">Pending</option>
                    <option value="On Process">On Process</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <button
                  onClick={() => handleDelete(checkout._id)}
                  className="btn btn-danger btn-sm mt-3"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageOrder;
