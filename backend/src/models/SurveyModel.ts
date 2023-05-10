import { Model, DataTypes, Sequelize, ModelStatic } from "sequelize";
import { sequelize } from "../database/config/sequelize";
import SurveyOptionModel from "./SurveyOptionModel";
import UserModel from "./UserModel";
import SurveyResultWinner from "./SurveyResultWinnerModel";


class SurveyModel extends Model{
     id: string  | undefined;
     title: string  | undefined;
     deadLine: Date  | undefined;
     userId: string | undefined;

     super(id:string, title:string, deadline:Date, userId:string){
          this.id = id;
          this.title = title;
          this.deadLine = deadline;
          this.userId = userId;
     }

     public static associate(){
          SurveyModel.hasMany(SurveyOptionModel, {foreignKey: "surveyId", onDelete: "CASCADE"});
          SurveyOptionModel.belongsTo(SurveyModel, {foreignKey: "surveyId"});
          SurveyModel.hasOne(SurveyResultWinner);
          SurveyResultWinner.belongsTo(SurveyModel);
     }
}

SurveyModel.init({
          id: {
               type: DataTypes.UUID,
               defaultValue: DataTypes.UUIDV4,
               primaryKey: true,
               allowNull: false
          },
          title: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          deadLine:{
               type: DataTypes.DATE,
               allowNull: false,
          },
          userId: {
               type: DataTypes.UUID,
               allowNull: false,
               references:{
                    model: UserModel,
                    key: "id"
               }
          } 
     }, {
          tableName: "surveys",
          timestamps: true,
          sequelize: sequelize
     }
);

SurveyModel.associate();


export default SurveyModel;





