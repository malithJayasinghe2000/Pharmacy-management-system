import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../css/SupplierAccount.css'

const SupplierAccount = () => {
  const [supplier, setSupplier] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSupplier = async () => {
//       const supId = localStorage.getItem('supId');
//       if (!supId) {
//         setErrorMessage('No supplier found');
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:8070/supplier/getReg/${supId}`);
//         setSupplier(response.data);
//         console.log('ss',response.data)
//       } catch (error) {
//         setErrorMessage(error.response.data.message);
//       }
//     };

//     fetchSupplier();
//     console.log('sup',supplier)
    
//   }, []);

    
  return (
    <div id='supplier-account'>
      <h1 id='supplier-account-head'>Supplier Account</h1>
      
      {/* {supplier && Array.isArray(supplier) && supplier.map((sup, i) => (
        <table key={i}>
          <tbody>
            <tr>
              <td>{sup.email}</td>
              <td>{sup.name}</td>
              <td>{sup.phone}</td>
            </tr>
          </tbody>
        </table>
      ))}
      
      {errorMessage && <p>{errorMessage}</p>} */}
      <button id='addnew-products-btn' onClick={()=>navigate('/addProducts')} >Add new Products</button>
      <button id='view-products-btn' onClick={()=>navigate('/viewProducts')} >view Products</button>
      {/* <button id='view-orders-btn' onClick={()=>navigate('/viewReports')} >view Orders</button> */}
      
    </div>
  ); 
};

export default SupplierAccount;
