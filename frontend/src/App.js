import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./components/Header";

// import {BrowserRouter as Router,Route} from "react-router-dom"
import RegisterSupplier from "./components/RegisterSupplier";
import ViewSupplierReq from "./components/ViewSupplierReq";
import Login from "./components/Login";
import ViewRegSuppliers from "./components/viewRegSuppliers";
import AddNewProducts from "./components/addNewProducts";
import ProductsList from "./components/ViewProducts";
import SupplyManagerAccount from "./components/SupplyManager";
// import SupplierAccount from "./components/Account";
import AddOrder from "./components/AddOrder";
import ViewOrders from "./components/ViewOrders";

import SupplierAccount from "./components/SupplierAccount";
import OrderDetails from "./components/OrderDetails";
import DeclinedReasonList from "./components/DeclinedReasonList";
// import SideBar from "./components/sideBar";

// import LoginSupplier from "./components/loginSupplier";
// import Account from "./components/Account";


function App(){
  return (
    
    <Router>
      <div className="App">
      {/* <Login/> */}
      <Header/>
      {/* <SideBar/> */}
      
      <Routes>
        
      <Route path="/" element={<Login />} />
      <Route  path="/SupplierAccount" element={<SupplierAccount/>} />
      <Route  path="/addProducts" element={<AddNewProducts/>} />
      <Route  path="/viewProducts" element={<ProductsList/>} />
      <Route  path="/register" element={<RegisterSupplier/>} />
      <Route  path="/supplyManager" element={<SupplyManagerAccount/>} />
      <Route  path="/registeringRequests" element={<ViewSupplierReq/>} />
      <Route  path="/registeredSuppliers" element={<ViewRegSuppliers/>} />
      <Route  path="/addOrders" element={<AddOrder/>} />
      <Route  path="/viewOrders" element={<ViewOrders/>} />
      {/* <Route  path="/viewReports/:supplierId" element={<OrderDetails/>} /> */}
      <Route path="/viewReports/:supplierId" element={<OrderDetails  />} />
      <Route path="/viewDeclineReson" element={<DeclinedReasonList  />} />
      {/* <Route path="/viewReports/:supplierId" component={OrderDetails} /> */}


      {/* <Route path="/viewReports/:supplierId" component={ViewReports} /> */}



      
      {/* <Route exact path="/" component={Login} /> */}
        
      
        </Routes>
      
    
        
        {/* <Header/>
        <RegisterSupplier/>
        <ViewSupplierReq/>
        <Login/>
        <ViewRegSuppliers/>
        <AddNewProducts/>
        <ProductsList/> */}
        
       
      </div>
      </Router>
    
  )
}

export default App;
