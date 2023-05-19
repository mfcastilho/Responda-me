import "../App.css";
import Header from './components/header';
import RoutesApp from './RoutsApp';
import { UserLoggedProvider } from "./components/userLoggedProvider/UserLoggedProvider";

function App() {

     const user:any = localStorage.getItem("userLoggedInfos")

     return (
          <UserLoggedProvider>
               <div className="App">
                    <Header userLogged={user} />
                    <RoutesApp/>              
               </div>
          </UserLoggedProvider>
          
     )
}

export default App;
