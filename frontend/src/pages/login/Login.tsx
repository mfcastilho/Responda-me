import React from "react";
import "./login.css";


function Login(){
     return(
          <div className="login">
               
               <form action="" className="login-form">
                    <h2>Login</h2>
                    <input type="email" placeholder="E-mail" />
                    <input type="password" placeholder="Senha" />
                    <button>Entrar</button>
               </form>
          </div>
     );
}

export default Login;