import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer, Navbar } from "../components";
import qrPict from "../components/Qr.png"

const CheckoutForm = () => {
    const { state } = useLocation();
    const { totalAmount } = state || { totalAmount: 0 };

    const [formData, setFormData] = useState({
        recipientName: '',
        address: '',
        whatsappNumber: '',
        proofOfTransfer: null
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, proofOfTransfer: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { recipientName, address, whatsappNumber, proofOfTransfer } = formData;

        if (!recipientName || !address || !whatsappNumber) {
            setMessage('All fields are required');
            return;
        }

        const form = new FormData();
        form.append('recipientName', recipientName);
        form.append('address', address);
        form.append('whatsappNumber', whatsappNumber);
        form.append('proofOfTransfer', proofOfTransfer);

        try {
            const response = await axios.post('http://localhost:5000/order/checkout', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error during checkout:', error);
            setMessage('Checkout failed');
        }
    };
    
    const ownerInfo = {
        qrCodeUrl: qrPict, 
        accountNumber: '5775724835' 
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2>Checkout Form</h2>
                <div className="text-center">
                    <h4>Owner's QR Code and Account Number</h4>
                    {ownerInfo.qrCodeUrl && <img src={ownerInfo.qrCodeUrl} alt="QR Code" className="img-fluid mb-3"style={{ maxWidth: '200px' }}/>}
                    <p> Number: {ownerInfo.accountNumber} </p>
                       <h4>Total Amount: Rp. {totalAmount.toLocaleString()}</h4>
                       <p>Please transfer according to the amount above</p>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label className="form-label">Recipient Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="recipientName"
                            value={formData.recipientName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">WhatsApp Number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Proof of Transfer</label>
                        <input
                            type="file"
                            className="form-control"
                            name="proofOfTransfer"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Checkout</button>
                </form>
                {message && <p className="mt-3">{message}</p>}
            </div>
            <Footer />
        </>
    );
};

export default CheckoutForm;
