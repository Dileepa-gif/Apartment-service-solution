import React from 'react';
import '../../App.css';
import { sidebardata } from './sidebardata';
import './sidebar.css'; 

function Sidebar() {
  return (
     // <div className="b">
    <div className="Sidebar">
        <ul className='sidebarlist'>
        {sidebardata.map((val, key) => {
        return(
            <li
                key={key}
                className="row"
                
                id={window.location.pathname == val.link ? "active" : ""}
                //id={window.location.pathname == val.}
                onClick={() => {
                    window.location.pathname = val.link;
                }}
            >
                <div id="icon"> {val.icon}</div>
                <div id="title">{val.title}</div>
            </li>
        );
        })}
        </ul>
        </div>
        //</div>
  );
    }


export default Sidebar;