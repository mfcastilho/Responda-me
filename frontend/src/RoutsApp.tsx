import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";


function RoutesApp(){
     return(
          <BrowserRouter>
               <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Home/>} />
               </Routes>
          </BrowserRouter>
     
     );
}

export default RoutesApp;