import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './main.css'

import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://backend-ecommerce-theta-one.vercel.app/products");
        const products = await response.json();
        setData(products);
        setFilter(products);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        if (componentMounted) {
          setLoading(false);
        }
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filter.slice(indexOfFirstItem, indexOfLastItem);

  const Loading = () => {
    return (
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-4">
              <Skeleton height={592} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ShowProducts = () => {
     return (
    <div className="row">
      {currentItems.map((product) => (
        <div key={product._id} className="col-md-4 col-sm-6 col-xs-6 mb-4">
          <div className="card h-100">
            <Link to={"/product/" + product._id}>
              <img
                className="card-img-top"
                src={product.image}
                alt="Product"
                style={{ height: "300px", objectFit: "cover" }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Rp. {product.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  };

  const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination justify-content-center">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Products</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="buttons text-center py-3">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>
            All
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("man")}>
            Men's Hoodie
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("women")}>
            Women's Hoodie
          </button>
        </div>
        {loading ? <Loading /> : <ShowProducts />}
        <Pagination itemsPerPage={itemsPerPage} totalItems={filter.length} paginate={handlePageChange} />
      </div>
    </div>
  );
};

export default Products;
