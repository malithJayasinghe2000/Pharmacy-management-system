import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import '../css/addNewProducts.css'

function AddNewProducts() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      product_name: productName,
      price: price,
      medicine_type: medicineType,
      description: description,
    };

    axios
      .post('http://localhost:8070/product/addNewProducts', productData)
      .then((res) => {
        console.log(res.data);
        swal('product added')
        // Display success message to user
        setProductName('');
      setPrice('');
      setMedicineType('');
      setDescription('');
      })
      .catch((err) => {
        console.error(err);
        // Display error message to user
      });
  };

  return (
    <form id='add-product-form' onSubmit={handleSubmit}>
        <h1 id='add-product-form-head'>Adding new products</h1>
      <label id='lbl-name'>
        Product Name:
        <input
        required
          type="text"
          id='product-name'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label><br/>
      <label id='lbl-price'>
        Price:
        <input
        required
          type="text"
          id='product-price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label><br/>
      <label id='lbl-medicineType'>Medicine Type:</label>
            <select required id='select-medicine' name="medicine_type" value={medicineType} onChange={(e) => setMedicineType(e.target.value)}>
              <option value="">--Please choose an option--</option>
              <option value="Personal Care Products">Personal Care Products</option>
              <option value="Herbal and Natural Remedies">Herbal and Natural Remedies</option>
              <option value="Vaccines">Vaccines</option>
              <option value="Beauty Products">Beauty Products</option>
            </select><br/>
      <label id='lbl-des'>
        Description:</label>
        <textarea required id='description-text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      <br/>
      <button id='add-product-form-submit' type="submit">Add Product</button>
    </form>
  );
}

export default AddNewProducts;
