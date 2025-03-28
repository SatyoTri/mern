import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await fetch('https://backend-ecommerce-theta-one.vercel.app/cart/cart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const removeItemFromCart = async (productId) => {
        try {
            const response = await fetch(`https://backend-ecommerce-theta-one.vercel.app/cart/remove-from-cart/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to remove product from cart');
            }
            fetchCartItems(); // Refresh cart after removal
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const updateCartItemQuantity = async (productId, quantity) => {
        try {
            if (quantity === 0) {
                await removeItemFromCart(productId);
                return;
            }
            const response = await fetch(`https://backend-ecommerce-theta-one.vercel.app/cart/update-cart/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ quantity })
            });
            if (!response.ok) {
                throw new Error('Failed to update cart');
            }
            fetchCartItems(); // Refresh cart after update
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const emptyCart = () => {
        return (
            <div className="container text-center my-5">
                <div className="row">
                    <div className="col">
                        <h4 className="display-5">Your Cart is Empty</h4>
                        <Link to="/" className="btn btn-outline-primary mt-4">
                            <i className="fa fa-arrow-left"></i> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    const showCart = () => {
        let subtotal = 0;
        let totalItems = 0;
        const shipping = 10000;

        cartItems.forEach(item => {
            subtotal += item.product.price * item.quantity;
            totalItems += item.quantity;
        });

        const totalAmount = subtotal + shipping;

        return (
            <section className="h-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Item List</h5>
                                </div>
                                <div className="card-body">
                                    {cartItems.map((item) => (
                                        <div key={item.product._id} className="cart-item mb-4">
                                            <div className="row d-flex align-items-center">
                                                <div className="col-lg-3 col-md-12">
                                                    <div className="bg-image rounded" data-mdb-ripple-color="light">
                                                        <img src={item.product.image} alt={item.product.title} className="img-fluid rounded" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 text-center">
                                                    <p>{item.product.title}</p>
                                                </div>
                                                <div className="col-lg-2 col-md-6 text-center">
                                                    <p>{item.size}</p>
                                                </div>
                                                <div className="col-lg-4 col-md-12 d-flex align-items-center justify-content-center">
                                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => updateCartItemQuantity(item.product._id, item.quantity - 1)}>
                                                        <i className="fas fa-minus"></i>
                                                    </button>
                                                    <span className="mx-3">{item.quantity}</span>
                                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => updateCartItemQuantity(item.product._id, item.quantity + 1)}>
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                    <button className="btn btn-danger btn-sm ms-3" onClick={() => removeItemFromCart(item.product._id)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col text-end">
                                                    <strong>Rp. {(item.product.price * item.quantity).toLocaleString()}</strong>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header py-3 bg-light">
                                    <h5 className="mb-0">Order Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Products ({totalItems})
                                            <span>Rp. {subtotal.toLocaleString()}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                            Shipping
                                            <span>Rp. {shipping.toLocaleString()}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div><strong>Total amount</strong></div>
                                            <span><strong>Rp. {totalAmount.toLocaleString()}</strong></span>
                                        </li>
                                    </ul>
                                    <button
                                        className="btn btn-primary btn-lg btn-block"
                                        onClick={() => navigate("/checkout", { state: { totalAmount } })}
                                    >
                                        Go to checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Cart</h1>
                <hr />
                {cartItems.length > 0 ? showCart() : emptyCart()}
            </div>
            <Footer />
        </>
    );
};

export default Cart;
