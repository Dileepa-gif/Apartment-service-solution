import profileimage from "../images/ci_settings-filled.png";
import settingimage from "../images/Group.png";
import logoutimage from "../images/bx_log-out.png";
import homeimage from "../images/Vector.png";
import React from 'react';
import '../../App.css';
import './topbar.css'; 

function TopBar() {
    return (
        <nav class='navBox'>
        <div className='navMenu'>
          <a href="#profile"><img src={profileimage}/></a>
          <a href="#HOME"><img src={homeimage}/></a>
          <a href="#setting"><img src={settingimage}/></a>
          <a href="#logout"><img src={logoutimage}/></a>
        </div>
      </nav>

    );

}

export default TopBar;