import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/config/sequelize";
import UserModel from "./UserModel";
import SurveyOptionModel from "./SurveyOptionModel";
import SurveyModel from "./SurveyModel";



class UserSurveyVoteModel extends Model {}


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

UserModel.hasMany(UserSurveyVoteModel, {
     foreignKey:"userId", 
     as: "user_survey_vote",
     onDelete: 'CASCADE',
});

UserSurveyVoteModel.belongsTo(UserModel, {
     foreignKey:"userId", 
     as: "user"
});



SurveyModel.hasMany(UserSurveyVoteModel, {
     foreignKey:"surveyId", 
     as:"user_survey_vote",
     onDelete: 'CASCADE',
});

UserSurveyVoteModel.belongsTo(SurveyModel, {
     foreignKey:"surveyId", 
     as:"survey"
});



export default UserSurveyVoteModel;



