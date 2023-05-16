import React, {createContext, useState} from "react";


interface UserLoggedContextType{
     isLogged: boolean;
     setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserLoggedContext = createContext<UserLoggedContextType>({
     isLogged: false,
     // eslint-disable-next-line @typescript-eslint/no-empty-function
     setIsLogged: ()=> {},
});

export function UserLoggedProvider(props:any){

     const [isLogged, setIsLogged] = useState<boolean>(false);


     return(
          <UserLoggedContext.Provider value={{isLogged, setIsLogged}}>
               {props.children}
          </UserLoggedContext.Provider>
     );
}