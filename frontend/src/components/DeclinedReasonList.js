import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/declineReason.css'

const DeclinedReasonList = () => {
  const [declinedReasons, setDeclinedReasons] = useState([]);

  useEffect(() => {
    // Fetch the declined reasons from the server
    axios
      .get('http://localhost:8070/decline/all-decline-reasons')
      .then((response) => {
        setDeclinedReasons(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div id='declined-reason-div'>
      <h2 id='declined-reason-head'>Declined Reasons</h2>
      <table id='declined-reason-table'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Supplier Name</th>
            <th>Product Name</th>
            <th>Decline Date</th>
            <th>Decline Reason</th>
          </tr>
        </thead>
        <tbody>
          {declinedReasons.map((reason) => (
            <tr key={reason._id}>
              <td>{reason.orderId}</td>
              <td>{reason.supplierName}</td>
              <td>{reason.productName}</td>
              <td>{reason.declineDate}</td>
              <td>{reason.declineReason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default DeclinedReasonList;
