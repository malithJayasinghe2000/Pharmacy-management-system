import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ViewProducts.css'

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [deletedProductId, setDeletedProductId] = useState('');
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8070/product/viewProducts')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, [deletedProductId, updatedProduct]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/product/deleteProduct/${id}`)
      .then(res => setDeletedProductId(id))
      .catch(err => console.log(err));
  };

  const handleEdit = (product) => {
    setUpdatedProduct(product);
    setEditing(true);
  };

  const handleUpdate = (id, updatedProduct) => {
    axios.put(`http://localhost:8070/product/updateProduct/${id}`, updatedProduct)
      .then(res => {
        setUpdatedProduct(null);
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const handleCancel = () => {
    setUpdatedProduct(null);
    setEditing(false);
  };

  return (
    <div id='view-products'>
      <h2 id='view-products-head'>Products</h2>
      {Array.isArray(products) && products.length > 0 ? (
        <table id='view-product-table'>
          <thead id='view-product-table-head'>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id='view-product-table-body'>
            {products.map(product => (
              <tr key={product._id}>
                {editing && updatedProduct?._id === product._id ? (
                  <>
                    <td><input type="text" defaultValue={updatedProduct.product_name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, product_name: e.target.value })} /></td>
                    <td><input type="text" defaultValue={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} /></td>
                    <td><input type="text" defaultValue={updatedProduct.medicine_type} onChange={(e) => setUpdatedProduct({ ...updatedProduct, medicine_type: e.target.value })} /></td>
                    <td><input type="text" defaultValue={updatedProduct.description} onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} /></td>
                    <td>
                      <button id='view-product-save-btn' onClick={() => handleUpdate(updatedProduct._id, updatedProduct)}>Save</button>
                      <button id='view-product-cancel-btn' onClick={() => handleCancel()}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{product.product_name}</td>
                    <td>{product.price}</td>
                    <td>{product.medicine_type}</td>
                    <td>{product.description}</td>
                    <td>
                      <button id='view-product-update-btn' onClick={() => handleEdit(product)}>Update</button>
                      <button id='view-product-delete-btn' onClick={() => handleDelete(product._id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductsList;
