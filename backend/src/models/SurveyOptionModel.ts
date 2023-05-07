import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/config/sequelize";



class SurveyOption extends Model {}


export default SurveyOption.init({
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
          surveyId: {
               type: DataTypes.UUID,
               allowNull: false,                   
          }
   }, {
       tableName: "survey_option",
       timestamps: true,
       sequelize: sequelize
   });







