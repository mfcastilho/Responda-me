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

               const verifyIfTheUserExists = await UserModel.findByPk(userId);
               if(!verifyIfTheUserExists){
                    return res.status(401).json({message: "Não foi possível criar a enquete pois o usuário não existe"});
               }

               if(!resultValidation.isEmpty()){
                    const errors = resultValidation.array().map(error=> ({
                         path: error.path,
                         msg: error.msg
                    }));   
                    res.status(400).json({message:errors});
               }

               const id = makeId();
               const newSurvey = JSON.stringify(new Survey(id, title, deadLine, userId));
               const newSurveyData = JSON.parse(newSurvey);
               const surveyPersisted = await SurveyModel.create(newSurveyData);

               async function saveSurveyOptions(){
                    let index = 0;
                    for(let option of surveyOptions){
                              const id = makeId();
                              const surveyOptionInitialVote = 0;
                              const surveyOption = JSON.stringify(new SurveyOption(id, option.surveyAnswerOption, index+1, surveyOptionInitialVote, newSurveyData.id));
                              const surveyOptionData = JSON.parse(surveyOption);
                              console.log(surveyOptionData)
                              await SurveyOptionModel.create(surveyOptionData);
                              index++;
                    }
               }
               await saveSurveyOptions();

               const optionsSurvey = await SurveyOptionModel.findAll(
                    {
                         where:{surveyId:surveyPersisted.id}
                    }
               );

               const completeSurvey = {
                    surveyPersisted,
                    surveyOptions: optionsSurvey
               }

              

               return res.status(200).json({data: completeSurvey });
               
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

     public async editSurvey(req: Request, res: Response){

          try {

               const { title, deadLine, userId, surveyOptions }= req.body;
               const { id } = req.params;
               const resultValidation: Result = validationResult(req);

               const verifyIfTheUserExists = await UserModel.findByPk(userId);
               if(!verifyIfTheUserExists){
                    return res.status(401).json({message: "Não foi possível editar a enquete pois o usuário não existe"});
               }

               if(!resultValidation.isEmpty()){
                    const errors = resultValidation.array().map(error=> ({
                         path: error.path,
                         msg: error.msg
                    }));   
                    return res.status(400).json({message:errors});
               }

               const survey = await SurveyModel.findByPk(id);

               const [surveyEditedQuantityLines, updatedregisters]: any = await SurveyModel.update({
                         "title": title == undefined ? survey?.title : title,
                         "deadLine": deadLine == undefined ? survey?.deadLine : deadLine,
                    },
                    {where: {id:id}}
               );

               
               if(surveyEditedQuantityLines > 0){
                    const surveyUpdated:any = await SurveyModel.findByPk(id);
                    const optionsSurvey = await SurveyOptionModel.findAll(
                         {
                              where:{surveyId:surveyUpdated.id}
                         }
                    );

                    async function updateSurveyOptions() {
                         const existingOptionIds = optionsSurvey.map((option) => option.id);
                       
                         // Atualizando opções de resposta existentes
                         for (let i = 0; i < surveyOptions.length; i++) {
                           const option = surveyOptions[i];
                           if (option.id && existingOptionIds.includes(option.id)) {
                             await SurveyOptionModel.update(
                               {
                                 surveyAnswerOption: option.surveyAnswerOption,
                                 surveyAnswerOptionNumber: i + 1,
                                 totalOptionVotes: 0 // Valor inicial
                               },
                               { where: { id: option.id } }
                             );
                           }
                         }
                       
                         // Removendo opções de resposta ausentes
                         const optionIdsToRemove = existingOptionIds.filter((id) => !surveyOptions.some((option:any) => option.id === id));
                         await SurveyOptionModel.destroy({ where: { id: optionIdsToRemove } });
                       
                         // Adicionando novas opções de resposta
                         const optionIdsToAdd = surveyOptions.filter((option:any) => !option.id).map((option:any) => option.id);
                         for (let i = 0; i < surveyOptions.length; i++) {
                              const option = surveyOptions[i];
                              if (!option.id || optionIdsToAdd.includes(option.id)) {
                                   await SurveyOptionModel.create({
                                        surveyId: surveyUpdated.id,
                                        surveyAnswerOption: option.surveyAnswerOption,
                                        surveyAnswerOptionNumber: i + 1,
                                        totalOptionVotes: 0 // Valor inicial
                                   });
                              }
                         }
                    }
                       
                         //chamando a função assíncrona updateSurveyOptions
                         await updateSurveyOptions();


                         const optionsSurveyUpdated = await SurveyOptionModel.findAll(
                              {
                                   where:{surveyId:surveyUpdated.id}
                              }
                         );

                         const completeSurvey = {
                              surveyUpdated,
                              surveyOptions: optionsSurveyUpdated
                         }
     
                    res.status(200).json({data: completeSurvey});
               }else{
                    res.status(400).json({message: "Não foi possível realizar a edição"});
               }

               
          } catch (error:unknown) {

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

     public async deleteSurvey(req: Request, res: Response){
          try {
               const { id } = req.params;

               const verifyIfTheSurveyExists = await SurveyModel.findByPk(id);

               if(!verifyIfTheSurveyExists){
                    return res.status(400).json({error: "A enquete solicitada não existe."});
               }

               await SurveyOptionModel.destroy({
                    where:{surveyId: id}
               });

               await SurveyModel.destroy({
                    where:{id: id}
               });

               
               return res.status(200).json({data:"Enquete deletada com sucesso"});  

          } catch (error:unknown) {

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

     public async getUserSurveys(req: Request, res: Response){

     }

     public async getAllSurveys(req: Request, res: Response){

     }

     public async UserVoteSurveyAnswerOption(req: Request, res: Response){

     }
}

