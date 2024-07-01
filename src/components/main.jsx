import React from "react";
import './main.css';

const Home = () => {
  return (
    <div className="hero-section">
      <div className="content-container">
        <div className="text-container">
          <h1 className="title">New Season Arrivals</h1>
          <p className="description">
            Discover the latest trends with our new arrivals. Perfect for any occasion.
          </p>
          <button className="btn btn-primary">Shop Now</button>
        </div>
        <div className="image-container">
          <img
            className="hero-image"
            src="./assets/hero_image.png"
            alt="New Season"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
