import e, {Request, Response} from 'express';
import {Result, validationResult} from 'express-validator';
import { ConnectionRefusedError,UniqueConstraintError,ValidationError} from 'sequelize';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as makeId }from 'uuid';
import UserModel from "../models/UserModel";
import {User} from "../classes/User";




class AuthController {

   
     public async login(req: Request, res:Response){

          try {

               const {email, password} = req.body;
               const resultValidation: Result = validationResult(req);

               if(!resultValidation.isEmpty()){
                    const errors = resultValidation.array().map(error=> ({
                         path: error.path,
                         msg: error.msg
                    }));   
                    res.status(400).json({message:errors});
               }
               

               const user:any | null = await UserModel.findOne({
                    where: {email: email}
               });

               if(!user){
                    res.status(401).json({message:"Email ou senha inválidos"});
               }

               const verifyIfThePasswordIsCorrect = await bcrypt.compare(password, user.password);

               if(!verifyIfThePasswordIsCorrect){
                    res.status(401).json({message:"Email ou senha inválidos"});
               }

               const secretOrPrivateKey: string | undefined = process.env.JWT_SECRET;
               if (!secretOrPrivateKey) {
                    throw new Error("JWT_SECRET is not defined");
                  }
               const token= jwt.sign({id: user.id}, secretOrPrivateKey)
               res.status(200).json({token, user:{id:user.id, name:user.name, email:user.email}});
               
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

     public async storeUser(req: Request, res:Response){
          try {

               const {name, email, password} = req.body;
               const hashPassword = await bcrypt.hash(password, 10);
               
               const verifyIfUserExists = await UserModel.findOne({
                    where: {email: email}
               });

               if(verifyIfUserExists){
                    return res.status(404).json({message: "Usuário já se encontra cadastrdo"});
               }

               const id = makeId();
               const newUser = new User(id,name, email);
               newUser.setPassword(password);

               const userData = JSON.parse(JSON.stringify(newUser)); 

               await UserModel.create(userData);
          
               return res.status(201).json({data:userData});
               
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