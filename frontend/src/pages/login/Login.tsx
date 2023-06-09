import React, { useState} from "react";
import "./login.css";
import axios from "axios";
import UserInfos from "../../interfaces/UserInfos";
import { useNavigate } from "react-router-dom";


const baseURL = "http://localhost:3000/api/v1";

function Login(){

     const [userInfos, setUserInfos] = useState<UserInfos>({email:"", password:""});
     const navigate = useNavigate();
     
     async function handleSubmit(e: React.SyntheticEvent){
          e.preventDefault();
          try {
               const response = await axios.post(`${baseURL}/login`, userInfos);
               const {token, user} = response.data;
               console.log(user);
               localStorage.setItem("userLoggedToken", token);
               localStorage.setItem("userLoggedInfos", user);
               localStorage.setItem("userIsLogged", "true");
               navigate("/");

          } catch (error) {
               console.log(error);
          }

     }


     return(
          <div className="login">
               
               <form onSubmit={handleSubmit} className="login-form">
                    <h2>Login</h2>
                    <input type="email" placeholder="E-mail" value={userInfos.email} onChange={(e)=> setUserInfos({...userInfos, email:e.target.value})} />
                    <input type="password" placeholder="Senha" value={userInfos.password} onChange={(e)=> setUserInfos({...userInfos, password:e.target.value})} />
                    <button>Entrar</button>
                    <a href="/cadastrar">Não tem conta? Cadastre-se</a>
               </form>
          </div>
     );
}

export default Login;