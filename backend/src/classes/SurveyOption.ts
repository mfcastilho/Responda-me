

export class SurveyOption{
     id: string;
     surveyAnswerOption: string;
     surveyAnswerOptionNumber: number;
     surveyOptionVotes: number;
     surveyId: string;

     constructor(id:string, surveyAnswerOption:string, surveyAnswerOptionNumber:number, surveyOptionVotes: number, surveyId:string){
          this.id = id;
          this.surveyAnswerOption = surveyAnswerOption;
          this.surveyAnswerOptionNumber = surveyAnswerOptionNumber;
          this.surveyOptionVotes = surveyOptionVotes;
          this.surveyId = surveyId;
     }


      /* -- Getters  -- */

      public getId():string{
          return this.id;
     }

     public getSurveyAnswerOption():string{
          return this.surveyAnswerOption;
     }

     public getSurveyAnswerOptionNumber():number{
          return this.surveyAnswerOptionNumber;
     }

     public getSurveyOptionVotes():number{
          return this.surveyOptionVotes;
     }

     public getSurveyId():string{
          return this.surveyId;
     }

     /* -- Setters  -- */
     public setId(id:string){
          this.id = id;
     }

     public setSurveyAnswerOption(surveyAnswerOption:string){
          this.surveyAnswerOption = surveyAnswerOption;
     }

     public setsurveyAnswerOptionNumber(surveyAnswerOptionNumber:number){
          this.surveyAnswerOptionNumber = surveyAnswerOptionNumber;
     }

     public setsurveyOptionVotes(surveyOptionVotes:number){
          this.surveyOptionVotes = surveyOptionVotes;
     }

     public setSurveyId(surveyId:string){
          this.surveyId = surveyId;
     }
}