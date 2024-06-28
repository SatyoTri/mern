import React, { useState, useEffect } from 'react';

const ManageOrder = () => {
 const [checkouts, setCheckouts] = useState([]);

    useEffect(() => {
        // Function to fetch checkouts
        const fetchCheckouts = async () => {
            try {
                const response = await fetch('http://localhost:5000/order/checkouts', {
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
                // Handle error state
            }
        };

        fetchCheckouts();
    }, []);
    

      return (
        <div className="container mt-5">
            <h2 className="mb-4">Admin Checkouts</h2>
            <div className="list-group">
                {checkouts.map((checkout) => (
                    <div key={checkout._id} className="list-group-item">
                        <h5 className="mb-1">User: {checkout.user}</h5>
                        <p className="mb-1">Recipient Name: {checkout.recipientName}</p>
                        <p className="mb-1">Address: {checkout.address}</p>
                        <p className="mb-1">WhatsApp Number: {checkout.whatsappNumber}</p>
                        <p className="mb-1">Proof of Transfer: {checkout.proofOfTransfer}</p>
                        <ul className="list-group">
                            {checkout.items.map((item) => (
                                <li key={item._id} className="list-group-item">
                                    <p>Product: {item.product.title}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Size: {item.size}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageOrder