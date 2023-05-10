import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/config/sequelize";
import User from "./UserModel";
import SurveyOptionModel from "./SurveyOptionModel";
import SurveyModel from "./SurveyModel";



class UserSurveyVoteModel extends Model {


     public static associate(){
          UserSurveyVoteModel.belongsTo(User, {foreignKey:"userId"});
          UserSurveyVoteModel.belongsTo(SurveyOptionModel, {foreignKey:"surveyOptionId"});
          UserSurveyVoteModel.belongsTo(SurveyModel, {foreignKey:"surveyId"});
     }
}


UserSurveyVoteModel.init({
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
          surveyId: {
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
   }
);

UserSurveyVoteModel.associate();

export default UserSurveyVoteModel;



