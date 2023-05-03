import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import { ConnectionRefusedError,UniqueConstraintError, ValidationError} from 'sequelize';
import jwt from "jsonwebtoken";


class AuthController {

     // private email: string;
     // private password: string;

     // constructor(email: string, password: string) {
     //      this.email = email;
     //      this.password = password;
     // }

login(req: Request, res:Response){

          try {

               const {email, password} = req.body;
               res.status(200).json({data:email});

               
          } catch (error: unknown) {

               if(error instanceof ConnectionRefusedError){
                    return res.status(500).json({error: true, message: "Sistema indisponível, tente novamente mais tarde!"})
               }
               if(error instanceof UniqueConstraintError){
                    return res.status(400).json(error.parent.message);
               }
               if(error instanceof ValidationError){
                    return res.status(400).json({error: true, message: `${error.errors[0].type} at ${error.errors[0].path}`})
               }              
          }

     }


}

export default AuthController;