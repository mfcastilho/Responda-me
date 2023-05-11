import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/config/sequelize";
import SurveyOption from "./SurveyOptionModel";
import SurveyModel from "./SurveyModel";


class SurveyResultWinnerModel extends Model {}


SurveyResultWinnerModel.init({
     
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
     }
);

SurveyModel.hasOne(SurveyResultWinnerModel, {
     foreignKey:"winnerSurveyOptionId", 
     as:"survey",
     onDelete: 'CASCADE'
});

SurveyResultWinnerModel.belongsTo(SurveyOption, {
     foreignKey:"winnerSurveyOptionId", 
     as:"survey_result_winner"
});



export default SurveyResultWinnerModel;


