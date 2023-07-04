import React,{useState,useEffect} from "react"
import { saveAs } from 'file-saver';
import { writeFile } from 'xlsx';

import '../css/ViewSupplierreq.css'



import axios  from "axios";

import jsPDF from 'jspdf';
// import {Button} from 'reactstrap'
import html2canvas from 'html2canvas';
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>

 export default function ViewSupplierReq(){
const [suppliers,setSuppliers]=useState([]);
// const[regSup,setRegSup]=useState([]);




useEffect(()=>{
    function getSuppliers(){
        axios.get("http://localhost:8070/supplier/").then((res)=>{
            setSuppliers(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    getSuppliers();


},[])




const handleAccept = (id) => {
    // Fetch the supplier details using the id
    axios.get(`http://localhost:8070/supplier/get/${id}`)
      
      .then(res => {
       
    const {name} = res.data.supplier;
    const {email} = res.data.supplier;
    const {company} = res.data.supplier;
    const {experience} = res.data.supplier;
    const {medicine_type} = res.data.supplier;
    const {phone_number} = res.data.supplier;
    const {password} = res.data.supplier;  
  
        // Create a new object with the required fields
        const newSupplier = { name, email, company, experience, medicine_type, phone_number,password };

        console.log(newSupplier);
  
        // Add the new supplier to the new database
        axios.post('http://localhost:8070/supplier/addRegSuppliers', newSupplier)
          .then(res => {
            console.log(res.data);
            // Remove the accepted supplier from the suppliers array
            const updatedSuppliers = suppliers.filter(supplier => supplier._id !== id);
            setSuppliers(updatedSuppliers);

            // Generate a report of supplier's information
            // const reportHtml = `
            //   <div>
            //     <h1>Supplier Information</h1>
            //     <p><strong>Name:</strong> ${name}</p>
            //     <p><strong>Email:</strong> ${email}</p>
            //     <p><strong>Company:</strong> ${company}</p>
            //     <p><strong>Experience:</strong> ${experience}</p>
            //     <p><strong>Medicine Type:</strong> ${medicine_type}</p>
            //     <p><strong>Phone Number:</strong> ${phone_number}</p>
            //     <p><strong>Password:</strong> ${password}</p>
            //   </div>
            // `;
            console.log(newSupplier)

             // Convert the report HTML to canvas
            //  html2canvas(document.querySelector("div"), {
            //   allowTaint: true,
            //   useCORS: true,
            //   scale: 2,
            // }).then((canvas) => {
            //   // Add the canvas image to the PDF document
            //   // const imgData = canvas.toDataURL("image/png");
            //   const pdf = new jsPDF();
            //   // pdf.addImage(imgData, "PNG", 10, 10);
              
            // pdf.text(60,60,'Name:')
            // pdf.text(60,80,'E-mail:')
            // pdf.text(60,100,'Company:')
            // pdf.text(60,120,'Experience:')
            // pdf.text(60,140,'Medicine Type:')
            // pdf.text(60,160,'Phone Number:')
            // pdf.text(100,60,`${name}`)
            // pdf.text(100,80,`${email}`)
            // pdf.text(100,100,`${company}`)
            // pdf.text(100,120,`${experience}`)
            // pdf.text(100,140,`${medicine_type}`)
            // pdf.text(100,160,`${phone_number}`)
            

              

            //   pdf.save(`${name}_report.pdf`);
            // });

            ///////////////////////////////////////////////////////////////////////
            const xmlData = `
            <data>
              <name>${name}</name>
              <email>${email}</email>
              <company>${company}</company>
              <experience>${experience}</experience>
              <medicineType>${medicine_type}</medicineType>
              <phoneNumber>${phone_number}</phoneNumber>
            </data>
          `;
          
          const blob = new Blob([xmlData], { type: 'text/xml;charset=utf-8' });
          saveAs(blob, `${name}_report.xml`);
          

          
          




            

            

            axios.delete(`http://localhost:8070/supplier/delete/${id}`)
              .then(res => console.log(res.data))
              .catch(err => alert(err.message));
          })
          .catch(err => {
            alert(err.message);
          });
      })
      .catch(err => {
        alert(err.message);
      });
  };

  



  const handleDecline = (id) => {
    axios
    .delete(`http://localhost:8070/supplier/delete/${id}`)
    .then((res) => {
      const updatedSuppliers = suppliers.filter((supplier) => supplier._id !== id);
      setSuppliers(updatedSuppliers);
    })
    .catch((err) => {
      alert(err.message);
    });
  };
  
  
    return (
        <div id="supplier-requests">
      <h1 id="supplier-requests-head">Suppliers' request</h1>
      <table id="supplier-req-table">
        <thead id="supplier-req-table-head">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Experience</th>
            <th>Medicine type</th>
            <th>Contact Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="supplier-req-table-body">
          {suppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td >{supplier.name}</td>
              <td >{supplier.email}</td>
              <td >{supplier.company}</td>
              <td >{supplier.experience}</td>
              <td >{supplier.medicine_type}</td>
              <td >{supplier.phone_number}</td>
              <td ><button id="accept-request" onClick={() => handleAccept(supplier._id)}>Accept</button>
          <button id="decline-request" onClick={() => handleDecline(supplier._id)}>Decline</button></td>
            </tr>
          ))}
        </tbody>
      </table>
     
    
    </div>
    )
    
}