import { Request, Response } from "express";
import {Result, validationResult} from 'express-validator';

import { ConnectionRefusedError,UniqueConstraintError,ValidationError} from 'sequelize';

import { v4 as makeId }from 'uuid';

import SurveyModel from "../models/SurveyModel";
import UserModel from "../models/UserModel";
import SurveyOptionModel from "../models/SurveyOptionModel";

import { Survey } from "../classes/Survey";
import { SurveyOption } from "../classes/SurveyOption";


export default class SurveyController{

     public async storeSurvey(req: Request, res: Response){
          
          try {

               const {title, deadLine, userId, surveyOptions}= req.body;
               const resultValidation: Result = validationResult(req);

               if(!resultValidation.isEmpty()){
                    const errors = resultValidation.array().map(error=> ({
                         path: error.path,
                         msg: error.msg
                    }));   
                    res.status(400).json({message:errors});
               }


               const verifyIfTheUserExists = await UserModel.findByPk(userId);

               if(!verifyIfTheUserExists){
                    return res.status(401).json({message: "Não foi possível criar a enquete pois o usuário não existe"});
               }

               const id = makeId();
               const newSurvey = JSON.stringify(new Survey(id, title, deadLine, userId));
               const newSurveyData = JSON.parse(newSurvey);
               const surveyPersisted = await SurveyModel.create(newSurveyData);

               async function saveSurveyOptions(){
                    let index = 0;
                    for(let option of surveyOptions){
                              const id = makeId();
                              const surveyOption = JSON.stringify(new SurveyOption(id, option.surveyAnswerOption, index+1, newSurveyData.id));
                              const surveyOptionData = JSON.parse(surveyOption);
                              await SurveyOptionModel.create(surveyOptionData);
                              index++;
                    }
               }

               await saveSurveyOptions();

               return res.status(200).json({data: surveyPersisted});
               
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

