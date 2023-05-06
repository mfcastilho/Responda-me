import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/config/sequelize";
import User from "./User";
import SurveyOption from "./SurveyOption";



class UserSurveyVote extends Model {}


export default UserSurveyVote.init({
          id: {
               type: DataTypes.UUID,
               defaultValue: DataTypes.UUIDV4,
               primaryKey: true,
               allowNull: false
          },  
          userId: {
               type: DataTypes.UUID,
               allowNull: false,                   
          },
          surveyOptionId: {
               type: DataTypes.UUID,
               allowNull: false,                   
          }
   }, {
       tableName: "user_survey_vote",
       timestamps: true,
       sequelize: sequelize
   });

   UserSurveyVote.belongsTo(User, {foreignKey:"userId"});
   UserSurveyVote.belongsTo(SurveyOption, {foreignKey:"surveyOptionId"});





