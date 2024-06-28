import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = async (productId) => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    try {
      const config = {
        headers: {
          'Authorization': `${token}`
        }
      };
      const response = await axios.post(`http://localhost:5000/cart/add-to-cart/${productId}`, { quantity: 1, size: selectedSize }, config);
      alert("Add to cart success");
      setCart(response.data.cart);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.title}</h1>
              <h3 className="display-6 my-4">Rp.{product.price}</h3>
              <p className="lead">{product.description}</p>
              
              <div className="my-3">
              <label className="form-label">Select Size:</label>
              <div>
                {product.sizes && product.sizes[0].split(',').map((size, index) => (
                  <button
                    key={index}
                    className={`btn btn-outline-dark mx-1 ${selectedSize === size.replace(/"/g, '') ? "btn-dark text-white" : ""}`}
                    onClick={() => setSelectedSize(size.replace(/"/g, ''))}
                  >
                    {size.replace(/"/g, '')}
                  </button>
                ))}
              </div>
            </div>
              
              <button
                className="btn btn-outline-dark"
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      {loading ? <Loading /> : <ShowProduct />}
      <Footer />
    </>
  );
};

export default Product;
