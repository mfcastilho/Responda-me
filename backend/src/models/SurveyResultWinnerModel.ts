import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/config/sequelize";
import User from "./UserModel";
import SurveyOption from "./SurveyOptionModel";



class SurveyResultWinner extends Model {}


export default SurveyResultWinner.init({
          id: {
               type: DataTypes.UUID,
               defaultValue: DataTypes.UUIDV4,
               primaryKey: true,
               allowNull: false
          },  
          surveyId: {
               type: DataTypes.UUID,
               allowNull: false,                   
          },
          winnerSurveyOptionId: {
               type: DataTypes.UUID,
               allowNull: false,                   
          }

   }, {
       tableName: "survey_result_winner",
       timestamps: true,
       sequelize: sequelize
   });

SurveyResultWinner.belongsTo(SurveyOption, {foreignKey:"winnerSurveyOptionId"});






