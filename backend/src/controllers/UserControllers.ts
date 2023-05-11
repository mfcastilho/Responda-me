import e, {Request, Response} from 'express';
import {Result, validationResult} from 'express-validator';
import { ConnectionRefusedError,UniqueConstraintError,ValidationError} from 'sequelize';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as makeId }from 'uuid';
import UserModel from "../models/UserModel";
import {User} from "../classes/User";




class UserController {

   
     public async getUserInfos(req: Request, res: Response){

          try {
               
               const { id } = req.params;
               const user = await UserModel.findByPk(id);

               if(!user){
                    return res.status(400).json({message:"Usuário não pode ser encontrado."});
               }

               return res.status(200).json({data:user});

          } catch (error) {
                
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

     public async getAllUsers(req: Request, res: Response){

          try {
               
               const users = await UserModel.findAll();
               if(!users){
                    return res.status(400).json({message: "Usuários não encontrados."});
               }


               return res.status(200).json(users);
          } catch (error) {
               
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

export default UserController;