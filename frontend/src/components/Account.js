import React, { useEffect, useState } from "react";
import axios from "axios";

const SupplierAccount = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect the user to the login page if no token is found
      window.location.href = "/login";
      return;
    }

    // Fetch the suppliers' details from the server
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:8070/supplier/get/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuppliers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div id="supplier-account">
      <h1 id="supplier-account-head">Supplier Account</h1>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            {supplier.name}: {supplier.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierAccount;
