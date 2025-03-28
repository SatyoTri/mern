import React from "react";
import './main.css';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero-section container-fluid ">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-6 text-center text-md-left">
          <h1 className="title">Stylish Hoodies Collection</h1>
          <p className="description">
           Discover the latest in hoodie fashion with our trendsetting collection. Ideal for casual and chic looks.
          </p>
           <Link to="/product" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
        <div className="col-md-6 text-center">
          <img
            className="img-fluid"
            src="./assets/home.png"
            alt="New Season"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
