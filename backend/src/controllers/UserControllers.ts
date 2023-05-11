import e, {Request, Response} from 'express';
import {Result, validationResult} from 'express-validator';
import { ConnectionRefusedError,UniqueConstraintError,ValidationError} from 'sequelize';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as makeId }from 'uuid';
import UserModel from "../models/UserModel";
import {User} from "../classes/User";
import SurveyOptionModel from '../models/SurveyOptionModel';
import SurveyModel from '../models/SurveyModel';




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

     public async updateUser(req: Request, res: Response){
          try {

               const { id } = req.params;
               const { name, email, password } = req.body;

               const user = await UserModel.findByPk(id);
               if(!user){
                    return res.status(400).json({message: "Usuário não pode ser encontrado."});
               }

               const userUpdated = new User(id, name, email);

               if(password){
                    const hashPassword = bcrypt.hashSync(password, 10);
                    userUpdated.setPassword(hashPassword);
               }

              const [updatedQuantityLines] = await UserModel.update(
                    userUpdated
               , {where:{id:id}})

               if(updatedQuantityLines == 0){
                    return res.status(400).json({message: "Usuário não pode ser editado."});
               }

               return res.status(200).json(userUpdated);
               
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

     public async deleteUser(req: Request, res:Response){
          
          try {
               
               const { id } = req.params;

               const user = await UserModel.findByPk(id);
               if(!user){
                    return res.status(400).json({message: "Usuário não pode ser deletado."});
               }

               const surveys:any = await SurveyModel.findAll({
                    where: {userId: id}
               });

               for(const survey of surveys){
                    await SurveyOptionModel.destroy({
                         where:{surveyId: survey.id}
                    });

                    await SurveyModel.destroy({
                         where:{id: survey.id}
                    })
               }

               const userId = await UserModel.destroy(({
                    where:{id: id},
                    cascade: true
               }));

               return res.status(200).json({message: `Usuário e id:${userId} deletado com sucesso.`});

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