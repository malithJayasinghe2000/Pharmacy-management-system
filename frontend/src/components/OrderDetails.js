import { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import viewDeclineReason from './DeclinedReasonList';
import SupplierAccount from './SupplierAccount';
import '../css/OrderDetails.css'



const OrderDetails = () => {
  // <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js" 
  // integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" 
  // crossorigin="anonymous"></script>
  const location = useLocation();
//   const navigate = useNavigate();
  const [declinedOrder, setDeclinedOrder] = useState(null);
 
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const supplierId = location.pathname.split('/').pop();
    axios
      .get(`http://localhost:8070/report/viewReports/${supplierId}`)
      .then((response) => {
        setReports(response.data);
        console.log(supplierId);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [location]);

  const handleAccept = (id) => {
    // Send an HTTP DELETE request to delete the order with the specified ID
    axios
      .delete(`http://localhost:8070/report/deleteReports/${id}`)
      .then((response) => {
        console.log(response.data); // Success message from the server
        // Refresh the order list or perform any other necessary actions
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, display an error message, etc.
      });
  };
  



const handleDecline = async (orderid,id) => {
  const reason = window.prompt('Please enter the reason for decline:');
  if (reason) {
    const declineDate = new Date(); // Use the current date for declineDate

    const declineData = {
      orderid,
      declineDate,
      declineReason: reason,
    };
    console.log(declineData)

    try {
      // Send the decline data to the server using Axios
      const response = await axios.post('http://localhost:8070/decline/decline-reasons', declineData);
      

      // Retrieve the created decline reason data
      const declineReasonData = response.data;

      console.log(response.data)

      // Handle the decline reason data as needed (e.g., display a success message)
      console.log('Decline reason added:', declineReasonData);
    } catch (error) {
      // Handle the error (e.g., display an error message)
      console.error('Error adding decline reason:', error.message);
    }
  }
  axios
      .delete(`http://localhost:8070/report/deleteReports/${id}`)
      .then((response) => {
        console.log(response.data); // Success message from the server
        // Refresh the order list or perform any other necessary actions
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, display an error message, etc.
      });
};




  return (
    <div>
      <SupplierAccount/>
      <br></br>
      <br></br>
      <br></br>
      <h1 id='orders-head'>Orders</h1>
      <table id='order-list-for-supplier'>
        
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Product name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report.order}</td>
              <td>{report.date}</td>
              <td>{report.product_name}</td>
              <td>{report.quantity}</td>
              <td>
                <button id='accept-order' onClick={() => handleAccept(report._id)}>Accept</button>
                <button id='decline-order' onClick={() => handleDecline(report.order,report._id)}>Decline</button>

                <viewDeclineReason declinedOrder={declinedOrder} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default OrderDetails;
