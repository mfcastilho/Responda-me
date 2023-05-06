import { Request, Response } from "express";
import {Result, validationResult} from 'express-validator';
import { ConnectionRefusedError,UniqueConstraintError,ValidationError} from 'sequelize';
import { v4 as makeId }from 'uuid';

export default class SurveyController{

     public async storeSurvey(req: Request, res: Response){
          
          try {

               const {ask, userId}= req.body;

               const newSurvey = {
                    id: makeId(),
                    ask: ask,
                    userId: userId
               }
               

               res.status(200).json(newSurvey);
               
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

