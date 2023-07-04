import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../css/SupplyManager.css'

const SupplyManagerAccount = () => {
  
  const navigate = useNavigate();

  return (
    <div id='supply-manager-account'>
      <h1 id='supply-manager-account-head'>Supply manager Account</h1>
      
      <button id='view-req-btn' onClick={()=>navigate('/registeringRequests')} >View suppliers' register requests</button><br/>
      <button id='view-regSup-btn' onClick={()=>navigate('/registeredSuppliers')} >View registered suppliers</button><br/>
      <button id='add-orders-btn' onClick={()=>navigate('/addOrders')} >Make Orders</button><br/>
      <button id='view-order-btn' onClick={()=>navigate('/viewOrders')} >View Orders</button><br/>
      <button id='view-declineRes-btn' onClick={()=>navigate('/viewDeclineReson')} >View Decline Reasons</button><br/>
      
    </div>
  ); 
};

export default SupplyManagerAccount;
