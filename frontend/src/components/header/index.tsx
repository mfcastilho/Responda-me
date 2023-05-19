import React, {useContext, useEffect} from "react";
import {FaUserCircle} from "react-icons/fa";
import "./style.css";
import { UserLoggedContext } from "../userLoggedProvider/UserLoggedProvider";
import UserInfos from "../../interfaces/UserInfos";

type HeaderProps = {
     userLogged: any;
}


const Header: React.FC<HeaderProps> = (props) =>{
     const isLogged = localStorage.getItem("userIsLogged");
     const user:any = localStorage.getItem("userLoggedInfos");
     
     function loggout(){
          localStorage.removeItem("userIsLogged");
          localStorage.removeItem("userLoggedInfos");
          localStorage.removeItem("userLoggedToken");
          
     }

     function quitButton(){
          localStorage.setItem("userIsLogged", "false")
     }

     useEffect(()=>{
          loggout()
          quitButton()
     }, []);
     
     return (
          <div className="header-container">
               <header className="header">
                    <a href="/"><h1>Responda-me</h1></a>
                    <div className="wrapper-header-right-infos">
                         <a href="/login"><FaUserCircle className="login-user-icon"/></a>
                         {isLogged == "true" && <div className="logged">{props.userLogged.name} <button onClick={quitButton}>Sair</button></div>}
                    </div>
                    
               </header>
          </div>   
     );
}

export default Header;