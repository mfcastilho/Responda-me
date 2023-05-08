

export class SurveyOption{
     id: string;
     surveyAnswerOption: string;
     surveyAnswerOptionNumber: number;
     surveyId: string;

     constructor(id:string, surveyAnswerOption:string, surveyAnswerOptionNumber:number, surveyId:string){
          this.id = id;
          this.surveyAnswerOption = surveyAnswerOption;
          this.surveyAnswerOptionNumber = surveyAnswerOptionNumber;
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

     public setSurveyId(surveyId:string){
          this.surveyId = surveyId;
     }
}