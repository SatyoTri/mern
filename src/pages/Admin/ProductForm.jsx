import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, getProductById } from '../../api/api';
import { Form, Button, Modal } from 'react-bootstrap';

const ProductForm = ({ show, handleClose, editProduct, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    sizes: '',
    image: null,
  });

  useEffect(() => {
    if (editProduct) {
        const fetchProduct = async () => {
        const response = await getProductById(editProduct);
        setFormData({ ...response.data, image: null });
      };
      fetchProduct();
    } else {
      setFormData({
        title: '',
        price: '',
        description: '',
        category: '',
        image: null,
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    for (const key in formData) {
      productData.append(key, formData[key]);
    }

    try {
      if (editProduct) {
        await updateProduct(editProduct, productData);
      } else {
        await createProduct(productData);
      }
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group><Form.Group controlId="formCategory">
            <Form.Label>Sizes</Form.Label>
            <Form.Control
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            {editProduct ? 'Update Product' : 'Add Product'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;
