import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../../api/api';
import { Table, Button } from 'react-bootstrap';
import ProductForm from './ProductForm';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const handleAddProduct = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchProducts();
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Admin Dashboard</h2>
        <Button variant="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.image}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditProduct(product._id)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteProduct(product._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ProductForm
        show={showForm}
        handleClose={handleCloseForm}
        editProduct={editProduct}
        onSuccess={fetchProducts}
      />
    </div>
  );
};

export default AdminDashboard;
