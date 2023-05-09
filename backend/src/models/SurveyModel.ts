import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/config/sequelize";
import User from "./UserModel";
import SurveyOption from "./SurveyOptionModel";
import SurveyResultWinner from "./SurveyResultWinnerModel";


class Survey extends Model{
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
}

export default Survey.init({
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
     } 
}, {
     tableName: "surveys",
     timestamps: true,
     sequelize: sequelize
});

// Survey.hasMany(SurveyOption, {foreignKey: "surveyId"});
Survey.hasOne(SurveyResultWinner);


