import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow
} from "mdb-react-ui-kit";
import { Navbar, Footer } from '../../components';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://backend-ecommerce-theta-one.vercel.app/order/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleComplete = async (id) => {
    try {
      const response = await fetch(`https://backend-ecommerce-theta-one.vercel.app/order/complete/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if needed
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark order as completed');
      }

      const data = await response.json();
      setOrders(orders.filter(order => order._id !== id));
      alert('Order marked as completed');
    } catch (error) {
      console.error('Error marking order as completed:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
      case 'On Process': // Handle 'On Process' status similarly to 'Pending'
        return '#ffc107'; // Yellow
      case 'Shipped':
        return '#17a2b8'; // Blue
      case 'Delivered':
        return '#28a745'; // Green
      default:
        return '#6c757d'; // Grey
    }
  };

  // Function to add a new order to the list
  const addNewOrder = (newOrder) => {
    setOrders([newOrder, ...orders]);
  };

  return (
    <>
      <Navbar />
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" xl="6">
              {orders.length === 0 ? (
                <p>No orders found</p>
              ) : (
                orders.map((order) => (
                  <MDBCard key={order._id} className="mb-3 border-top border-bottom border-3 border-color-custom">
                    <MDBCardBody className="p-5">
                      <p className="lead fw-bold mb-5" style={{ color: "#17a2b8" }}>
                        Purchase Receipt
                      </p>

                      <MDBRow>
                        <MDBCol className="mb-3">
                          <p className="small text-muted mb-1">Date</p>
                          <p>{new Date(order.createdAt).toLocaleString()}</p>
                        </MDBCol>
                        <MDBCol className="mb-3">
                          <p className="small text-muted mb-1">Order No.</p>
                          <p>{order._id}</p>
                        </MDBCol>
                      </MDBRow>

                      <div className="mx-n5 px-5 py-4" style={{ backgroundColor: "#f2f2f2" }}>
                        {order.items.map((item) => (
                          <div key={item._id} className="mb-3 border-bottom pb-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6>{item.title}</h6>
                              </div>
                              <div className="text-end">
                                <p className="mb-1">Size: {item.size}</p>
                                <p className="mb-0">Quantity: {item.quantity}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="lead fw-bold mb-4 pb-2" style={{ color: "#17a2b8" }}>
                        Tracking Order
                      </p>

                      <MDBRow>
                        <MDBCol lg="12">
                          <div className="horizontal-timeline">
                            <ul className="list-inline items d-flex justify-content-between">
                              <li className="list-inline-item items-list">
                                <p className="py-1 px-2 rounded text-white" style={{ backgroundColor: getStatusColor(order.shippingStatus) }}>
                                  {order.shippingStatus}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </MDBCol>
                      </MDBRow>

                      {order.shippingStatus === 'Delivered' && (
                        <p className="mt-3">If the order has been received, click the button (COMPLETE)</p>
                      )}
                      {order.shippingStatus !== 'Completed' && (
                        <button
                          onClick={() => handleComplete(order._id)}
                          className="btn btn-success mt-3 w-100"
                          disabled={order.shippingStatus === 'Pending' || order.shippingStatus === 'On Process' || order.shippingStatus === 'Shipped' }
                        >
                          Complete
                        </button>
                      )}

                      <p className="mt-4 pt-2 mb-0">
                        Need any help?{" "}
                        <a href="/contact" style={{ color: "#17a2b8" }}>
                          Contact us
                        </a>
                      </p>
                    </MDBCardBody>
                  </MDBCard>
                ))
              )}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
    </>
  );
}

export default Order;
