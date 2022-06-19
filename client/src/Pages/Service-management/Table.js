import React from "react";
import { Button } from "react-bootstrap";
import "./Table.css"
//import TopBar from '../../components/topbar';
//import Sidebar from '../../components/sidebar';

const data = [
    { serviceId: "S100545", date: "4/12/12", name: "Floyd Miles", requestedService: "washing", assignedPersonID: "875647895V" },
    { serviceId: "S100768", date: "9/4/12", name: "Devon Lane", requestedService: "Cleaning", assignedPersonID: "895647895V" },
    { serviceId: "S1000789", date: "7/11/19", name: "Camavon Williemson", requestedService: "Cooking", assignedPersonID: "825647895V" },
    { serviceId: "S100784", date: "8/16/13", name: "Kathryne Murphy", requestedService: "Cleaning", assignedPersonID: "885647895V" },
    { serviceId: "S1000525", date: "7/12/17", name: "Bessie Cooper", requestedService: "Cleaning", assignedPersonID: "805647895V" },

]

export default function Table() {
    return (

        <div>



            <div className="App">
               <button className="button"><a href="/Form" className="aa"> Add Service Member</a></button>

           
                
            
                <table>
                    <tr>
                        <th>Service Id</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Requested Service</th>
                        <th>Assigned Person Id</th>
                    </tr>
                    {data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.serviceId}</td>
                                <td>{val.date}</td>
                                <td>{val.name}</td>
                                <td>{val.requestedService}</td>
                                <td>{val.assignedPersonID}</td>
                            </tr>
                        )
                    }
                    )}
                </table>
            </div>
        </div>
    )
}