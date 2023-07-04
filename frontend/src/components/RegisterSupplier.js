import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import '../css/RegisterSupplier.css'

const RegisterSupplier = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  
    const [supplier, setSupplier] = useState({
      
  
      name: "",
      email:"",
      company:"",
      experience:"",
      medicine_type:"",
      gender:"",
      phone_number:"",
      password:"",
      re_type_pass:"",
      accept_terms:false
  
      
  
    });
  
    const handleChange = (event) => {
      
      
      const {  name, type, checked } = event.target;
      const value = type === "checkbox" ? checked : event.target.value;
      setSupplier((prevSupplier) => ({
        ...prevSupplier, //spread operator is used to create a copy of the existing prevSupplier object in state and then overwrite the property with the given name with the new value retrieved from the event target.
        //spread operator is used to create a new object in state that includes all the properties of the previous state object, with one property ([name]) being overwritten with the new value.
        [name]: value,
      }));

      if (name === 'email') {
        setEmail(event.target.value);
      }

    };
  
    

    const validateForm = () => {
      let formIsValid = true;
  
      // Validate name
      if (!supplier.name) {
        formIsValid = false;
        swal("Please enter your name");
        return formIsValid;
      }
  
      // Validate email
      if (!supplier.email) {
        formIsValid = false;
        swal("Please enter your email");
        return formIsValid;
      } else if (typeof supplier.email !== "undefined") {
        //regular expression for email validation
        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(supplier.email)) {
          formIsValid = false;
          swal("Please enter a valid email address");
          return formIsValid;
        }
      }
  
      // Validate company
      if (!supplier.company) {
        formIsValid = false;
        swal("Please enter your company");
        return formIsValid;
      }
  
      // Validate experience
      if (!supplier.experience) {
        formIsValid = false;
        swal("Please select your experience");
        return formIsValid;
      }
  
      // Validate medicine type
      if (!supplier.medicine_type) {
        formIsValid = false;
        swal("Please select your medicine type");
        return formIsValid;
      }
  
      // Validate gender
      if (!supplier.gender) {
        formIsValid = false;
        swal("Please select your gender");
        return formIsValid;
      }
  
      // Validate phone number
      if (!supplier.phone_number) {
        formIsValid = false;
        swal("Please enter your phone number");
        return formIsValid;
      } else if (typeof supplier.phone_number !== "undefined") {
        //regular expression for phone number validation
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(supplier.phone_number)) {
          formIsValid = false;
          swal("Please enter a valid phone number");
          return formIsValid;
        }
      }
  
      // Validate password
      if (!supplier.password) {
        formIsValid = false;
        swal("Please enter a password");
        return formIsValid;
      } else if (supplier.password.length < 6) {
        formIsValid = false;
        swal("Password must be at least 6 characters long");
        return formIsValid;
      }
  
      // Validate re-typed password
      if (!supplier.re_type_pass) {
        formIsValid = false;
        swal("Please re-type your password");
        return formIsValid;
      } else if (!checkPasswordsMatch()) {
        formIsValid = false;
        swal("Passwords do not match");
        return formIsValid;
      }

      return formIsValid;
      };
  
    

    const checkPasswordsMatch = () => {
      return supplier.password === supplier.re_type_pass;
    };


    const checkEmail = async (email) => {
      try {
        const response = await axios.get(`http://localhost:8070/supplier/check-email/${email}`);
        console.log(response)
        return response.data === 'Email available';
      } catch (err) {
        swal("Email address already exists")
        throw new Error(err.response.data);
      }
    };
  
     const handleSubmit = async (event) => {
      
      
    event.preventDefault();
    const emailAvailable = await checkEmail(email);
    if(!validateForm()){
      return;

    }
    if (!emailAvailable) {
      
      setEmailError('Email address already exists');
      
    return ;
    }
    

    if (!checkPasswordsMatch()) {
      swal("Passwords do not match");
      return;
    }
  
    
    try {
      await axios.post("http://localhost:8070/supplier/add", supplier);
      swal("Supplier registered successfully");
      setSupplier({ name: "", email: "",company: "",experience: "",medicine_type: "", gender: "",phone_number: "",password: "",re_type_pass: "" });
    } catch (error) {
      console.log(error);
      swal("Failed to register supplier");
    }
  };
  
          
  
    return (
      <div id="register-supplier">
        <h2 id="register-supplier-head">Register Supplier</h2>
        <form id="register-supplier-form" onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={supplier.name}
              onChange={handleChange}
              pattern="[A-Za-z ]+"
  title="Please enter a valid name (letters and spaces only)"
              required
            />
            
          </div>
  
          <div >
            <label>E-mail:</label>
            <input
              type="email"
              name="email"
              value={supplier.email}
              // onChange={(e) => {
              //   handleChange();
              //   setEmail(e.target.value);
              // }}
              onChange={handleChange}
              
              {...emailError && <span style={{ color: 'red' }}>{emailError}</span>}
              required
            />
          </div>
  
          <div>
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={supplier.company}
              onChange={handleChange}
              required
            />
          </div>
  
          <div >
            <label>Experience:</label>
            <select required name="experience" value={supplier.experience} onChange={handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="1 year">1 year</option>
              <option value="2 year">2 year</option>
              <option value="More than 2 year">More than 2 year</option>
            </select>
          </div>
  
          <div >
            <label>Medicine Type:</label>
            <select required name="medicine_type" value={supplier.medicine_type} onChange={handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="Personal Care Products">Personal Care Products</option>
              <option value="Herbal and Natural Remedies">Herbal and Natural Remedies</option>
              <option value="Vaccines">Vaccines</option>
              <option value="Beauty Products">Beauty Products</option>
            </select>
          </div>
  
          <div >
            <label>Gender:</label>
            <select required name="gender" value={supplier.gender} onChange={handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
  
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              size="10"
              name="phone_number"
              value={supplier.phone_number}
              onChange={handleChange}
              pattern="[0-9]{10}"
  title="Please enter a valid 10-digit phone number"
  style={{ 
    borderColor: supplier.phone_number && !/^[0-9]{10}$/.test(supplier.phone_number) ? 'red' : '',
    
  }}
              required
            />
          </div>
  
          <div>
            <label>Password:</label>
            <input
            
              type="password"
              name="password"
              value={supplier.password}
              onChange={handleChange}
              required
            />
          </div>
  
          <div >
            <label>Confirm password:</label>
            <input
              type="password"
              name="re_type_pass"
              value={supplier.re_type_pass}
              onChange={handleChange}
              
              required
            />
          </div>
  
          <div>
            <input
              type="checkbox"
              name="accept_terms"
              
              checked={supplier.accept_terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="accept_terms">
              I accept the terms and conditions
            </label>
          </div>
          
          
          <button id="supplier-register-button" type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  
  
  export default RegisterSupplier;