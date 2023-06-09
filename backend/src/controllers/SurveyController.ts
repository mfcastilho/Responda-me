import { Request, Response } from "express";
import {Result, validationResult} from 'express-validator';

import { ConnectionRefusedError,UniqueConstraintError,ValidationError} from 'sequelize';

import { v4 as makeId }from 'uuid';

import SurveyModel from "../models/SurveyModel";
import UserModel from "../models/UserModel";
import SurveyOptionModel from "../models/SurveyOptionModel";

import { Survey } from "../classes/Survey";
import { SurveyOption } from "../classes/SurveyOption";
import UserSurveyVoteModel from "../models/UserSurveyVoteModel";


export default class SurveyController{

     public async storeSurvey(req: Request, res: Response){
          
          try {

               const {userId} = req.params;
               const {title, deadLine, surveyOptions}= req.body;
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
                    return res.status(400).json({message:errors});
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

               const { userId } = req.params;
               const { title, deadLine, surveyOptions }= req.body;
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
     
                    return res.status(200).json({data: completeSurvey});
               }else{
                    return res.status(400).json({message: "Não foi possível realizar a edição"});
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
          
         try {

          const { userId } =  req.params;

          const verifyIfTheUserExists = await UserModel.findByPk(userId);

          if(!verifyIfTheUserExists){
               return res.status(400).json({error:"Usuário não existe."});
          }

          const userSurveys  = await SurveyModel.findAll({
               where:{userId:userId}
          });

          if(userSurveys.length === 0){
               return res.status(404).json({message:"Ainda não existe enquetes cadastradas por esse usuário."});
          }

          const allUserSurveyOptions:any = [];
          async function getUserSurveysAnswerOptions(){

               for(let survey of userSurveys){
                    const userSurveyAnswerOptions = await SurveyOptionModel.findAll({
                         where:{surveyId:survey.id}
                    });

                    allUserSurveyOptions.push(...userSurveyAnswerOptions);
               }
          }

          await getUserSurveysAnswerOptions();

          const userSurveysAndRespectiveOptions:any = [];
          
          userSurveys.forEach((survey:SurveyModel) => {

               const surveyOptions:any = [];

               allUserSurveyOptions.forEach((option:SurveyOptionModel)=>{
                    if(option.surveyId === survey.id){
                        surveyOptions.push(option);
                        console.log(option);
                    }   
               });

               const surveyAndOptions = {
                    ...survey,
                    surveyOptions
               }

               userSurveysAndRespectiveOptions.push(surveyAndOptions);
          })


          res.status(200).json({userSurveysAndRespectiveOptions});
          
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

     public async getAllSurveys(req: Request, res: Response){
          try {
               
               const allSurveys = await SurveyModel.findAll();

               const allSurveyOptions:any = [];
               async function getUserSurveysAnswerOptions(){

               for(let survey of allSurveys){
                    const userSurveyAnswerOptions = await SurveyOptionModel.findAll({
                         where:{surveyId:survey.id}
                    });

                    allSurveyOptions.push(...userSurveyAnswerOptions);
               }
          }

          await getUserSurveysAnswerOptions();

          const surveysAndRespectiveOptions:any = [];
          
          allSurveys.forEach((survey:SurveyModel) => {

               const surveyOptions:any = [];

               allSurveyOptions.forEach((option:SurveyOptionModel)=>{
                    if(option.surveyId === survey.id){
                        surveyOptions.push(option);
                        console.log(option);
                    }   
               });

               const surveyAndOptions = {
                    ...survey,
                    surveyOptions
               }

               surveysAndRespectiveOptions.push(surveyAndOptions);
          })




               return res.status(200).json({data: surveysAndRespectiveOptions});
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

     public async userVoteSurveyAnswerOption(req: Request, res: Response){
          
          try {
               const { surveyId } = req.params;
               
               const { userId, surveyOptionId } = req.body;

               const survey = await SurveyModel.findByPk(surveyId);
               
               if(!survey){
                    return res.status(404).json({error:"Enquete não existe."});
               }

               
               const user = await UserModel.findByPk(userId);
               if(!user){
                    return res.status(404).json({error:"Usuário não existe."});
               }

               const surveyAnswerOption = await SurveyOptionModel.findByPk(surveyOptionId);
               if(!surveyAnswerOption){
                    return res.status(404).json({error:"A opção de resposta da enquete não existe."});
               }

               const checkIfTheUserHasAlreadyVoted = await UserSurveyVoteModel.findOne({
                    where:{
                         userId: userId,
                         surveyId:surveyId
                    }
               });

               

               if(checkIfTheUserHasAlreadyVoted){
                    return res.status(400).json({message:"O usuário já votou na enquete."});
               }

               const userSurveyVote = await UserSurveyVoteModel.create({
                    id:makeId(),
                    userId:userId,
                    surveyOptionId:surveyOptionId
               });

               if(!userSurveyVote){
                    return res.status(400).json({error:"Voto não pode ser computado."});
               }
               
               const atualNumberOfVotes:any = surveyAnswerOption.totalOptionVotes

               const [numberOfLinesUpdated] = await SurveyOptionModel.update({
                    totalOptionVotes:   atualNumberOfVotes + 1
               }, 
               {
                    where:{id:surveyOptionId}
               });


               if(numberOfLinesUpdated === 0){
                    return res.status(400).json({error:"Voto não pode ser computado."});
               }


               const surveyAnswerOptionUpdated = await SurveyOptionModel.findByPk(surveyOptionId);

               return res.status(200).json({surveyAnswerOptionUpdated});

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

