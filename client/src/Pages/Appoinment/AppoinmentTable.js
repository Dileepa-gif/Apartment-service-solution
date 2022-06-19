import {React,useState,useEffect} from "react";
import {Form,Button} from "react-bootstrap";
import {Routes, Route, useNavigate} from 'react-router-dom';
import './AppoinmentTable.css'; 
import axios from "axios"

 function AppoinmentTable(){

    const [data,setData]=useState([])

     useEffect(()=>{
         console.log("called");
            getAppoinmentDetails();

     },[])

const getAppoinmentDetails = async () => {
  await axios
    .get('http://localhost:4000/appointment/')
    .then((res) => {
      console.log(res.data)
      setData(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}
    return(

<>
<h1>Admin side Appoinment</h1>
<div className="app-container">
<table>
    <thead>


        
        <th>ID</th>
        <th>Date</th>
        <th>Name</th>
        <th>NIC</th>
        <th>Mobile</th>
        <th>Exp Date</th>
        <th>OTP</th>

        
    </thead>
    <tbody>
    {
  data.length > 0 ? (
    data.map((item,index) => {
        console.log(item)
      return (
        <>
        <tr>
         <td>{index+1}</td>
        <td>{item.appointmentDate.split('T')[0]}</td>
        <td>{item.appointmentName}</td>
        <td>{item.appointmentNIC}</td>
        <td>{item.mobileNumber}</td>
        <td>{item.expireDate.split('T')[0]}</td>
        </tr>
        </>
      )
    })
  ) : (
    <></>
  )
}
    </tbody>
</table>
</div>
</>

    );
}
export default AppoinmentTable;
