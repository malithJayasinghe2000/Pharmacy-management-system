import React, { useState, useEffect } from 'react';
import OrderDetails from './OrderDetails';

import '../css/viewOrders.css'

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8070/orders/viewOrders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const handleMakeOrder = async (productId, medicineType) => {
    try {
      // Filter the suppliers by medicine type
      const response = await fetch(`http://localhost:8070/supplier/fetch/${medicineType}`);
      const data = await response.json();
      const filteredData = data.filter(supplier => supplier.medicine_type === medicineType);

      setFilteredSuppliers(filteredData);

      console.log(`Order created for product ID ${productId} and suppliers: `, filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSendOrder = async (supplierId, orderId) => {
  //   try {
  //     const response = await fetch('http://localhost:8070/report/sendOrder', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ supplierId, orderId })
  //     });
  
  //     const data = await response.json();
  //     console.log(`Order sent to supplier with ID ${supplierId} for order ID ${orderId}`, data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  //new
  const handleSendOrder = async (supplierId, orderId) => {
    try {
      const response = await fetch('http://localhost:8070/report/sendOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ supplierId, orderId })
      });
  
      const data = await response.json();
      console.log(`Order sent to supplier with ID ${supplierId} for order ID ${orderId}`, data);
  
      // Fetch the report data for the selected supplier
      const reportResponse = await fetch(`http://localhost:8070/report/viewReports/${supplierId}`);
      const reportData = await reportResponse.json();
      console.log(`Report data for supplier with ID ${supplierId}:`, reportData);
      setSelectedReport(OrderDetails[0]);
      // Display the report data on a separate page or modal
      // const ReportModal = ({ report }) => {
      //   return (
      //     <div>
      //       <h2>Report Details</h2>
      //       <p>Supplier: {report.supplier.name}</p>
      //       <p>Order ID: {report.order._id}</p>
      //       <p>Product Name: {report.product_name}</p>
      //       <p>Quantity: {report.quantity}</p>
      //       <p>Status: {report.status}</p>
      //       <p>Date: {report.date}</p>
      //     </div>
      //   );
      // };
      // ReportModal()

      // ...
    } catch (err) {
      console.error(err);
    }
  };
  
  
  

  return (
    <div>
      <h1 id='view-orders-head'>Orders</h1>
      <table id='view-orders'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Medicine Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody >
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.product_name}</td>
              <td>{order.quantity}</td>
              <td>{order.medicine_type}</td>
              <td>
                <button id='makeOrders' onClick={() => handleMakeOrder(order._id, order.medicine_type)}>
                  Make Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="filtered-supplier">
  <h1 id="filtered-supplier-head">Filtered Suppliers</h1>
  <table id="filtered-supplier-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Medicine Type</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredSuppliers.map((supplier) => (
        <tr key={supplier._id}>
          <td>{supplier.name}</td>
          <td>{supplier.medicine_type}</td>
          <td>
            <button id='send-order-button' onClick={() => handleSendOrder(supplier._id, orders.find(order => order.medicine_type === supplier.medicine_type)._id)}>
              Send Order
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {selectedReport && <OrderDetails report={selectedReport} />}
    </div>
  );
};

export default ViewOrders;