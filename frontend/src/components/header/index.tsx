import React from "react";
import {FaUserCircle} from "react-icons/fa";
import "./style.css";



function Header(){
     return (
          <div className="header-container">
               <header className="header">
                    <a href="/"><h1>Responda-me</h1></a>
                    <a href="/login"><FaUserCircle className="login-user-icon"/></a>
               </header>
          </div>   
     );
}

export default Header;