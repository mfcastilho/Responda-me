
export class User{

     private id: string;
     private name: string;
     private email: string;
     private password?: string;

     constructor(id: string, name:string, email:string){
          this.id = id;  
          this.name = name;
          this.email = email;
     }



     /* -- Getters  -- */

     public getId():string{
          return this.id;
     }

     public getName():string{
          return this.name;
     }

     public getEmail():string{
          return this.email;
     }

     public getPassword():string | undefined {
          return this.password;
     }

     /* -- Setters  -- */
     public setId(id:string){
          this.id = id;
     }

     public setName(name:string){
          this.name = name;
     }

     public setEmail(email:string){
          this.email = email;
     }

     public setPassword(password:string){
          this.password = password;
     }

}