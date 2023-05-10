import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/config/sequelize";
import SurveyModel from "./SurveyModel";



class SurveyOptionModel extends Model {

     id: string | undefined;
     surveyAnswerOption: string | undefined;
     surveyAnswerOptionNumber: number | undefined;
     totalOptionVotes: number | undefined;
     surveyId: string | undefined;

     super(id:string, surveyAnswerOption:string, surveyAnswerOptionNumber:number, totalOptionVotes: number, surveyId:string){
          this.id = id;
          this.surveyAnswerOption = surveyAnswerOption;
          this.surveyAnswerOptionNumber = surveyAnswerOptionNumber;
          this.totalOptionVotes = totalOptionVotes;
          this.surveyId = surveyId;
     }

     public static associate(){
          // SurveyOptionModel.belongsTo(SurveyModel, {foreignKey: "surveyId"});
     }
}


SurveyOptionModel.init({
          id: {
               type: DataTypes.UUID,
               defaultValue: DataTypes.UUIDV4,
               primaryKey: true,
               allowNull: false
          },
          surveyAnswerOption: {
               type: DataTypes.STRING,
               allowNull: false,
          },  
          surveyAnswerOptionNumber: {
               type: DataTypes.INTEGER,
               allowNull: false,
          }, 
          totalOptionVotes: {
               type: DataTypes.INTEGER,
               allowNull: false,
          }, 
          surveyId: {
               type: DataTypes.UUID,
               allowNull: false, 
               references:{
                    model: 'SurveyModel',
                    key: "id"
               }                  
          }
     }, {
       tableName: "survey_option",
       timestamps: true,
       sequelize: sequelize,
       modelName: "SurveyOption",
     }
);


SurveyOptionModel.associate();

export default  SurveyOptionModel;





