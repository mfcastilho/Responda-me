import React, {createContext, useState} from "react";


interface UserLoggedContextType{
     isLogged: boolean;
     setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
     userLoggedName: string | undefined;
     setUserLoggedName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const UserLoggedContext = createContext<UserLoggedContextType>({
     isLogged: false,
     // eslint-disable-next-line @typescript-eslint/no-empty-function
     setIsLogged: ()=> {},
     userLoggedName: undefined,
     // eslint-disable-next-line @typescript-eslint/no-empty-function
     setUserLoggedName: ()=> {}
});



export function UserLoggedProvider(props:any){

     const [isLogged, setIsLogged] = useState<boolean>(false);
     const [userLoggedName, setUserLoggedName] = useState<string | undefined>(undefined);

     return(
          <UserLoggedContext.Provider value={{isLogged, setIsLogged, userLoggedName, setUserLoggedName}}>
               {props.children}
          </UserLoggedContext.Provider>
     );
}