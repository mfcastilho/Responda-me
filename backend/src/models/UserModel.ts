import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/config/sequelize";
import SurveyModel from "./SurveyModel";


class UserModel extends Model{
     
     id: string  | undefined;
     name: string  | undefined;
     email: string  | undefined;
     password: string | undefined;

     

     super(id: string, name:string, email:string, password:string){
          this.id = id;  
          this.name = name;
          this.email = email;
          this.password = password;
     }
}

 UserModel.init({
          id: {
               type: DataTypes.STRING,
               primaryKey: true,
               allowNull: false,
          },
          name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          email: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          password: {
               type: DataTypes.STRING,
               allowNull: false,
          },
     }, {
          tableName: "user",
          timestamps: true,
          sequelize:sequelize
     }
);

UserModel.hasMany(SurveyModel, { 
     foreignKey: "userId", 
     as:"survey", 
     onDelete:"CASCADE"
});

SurveyModel.belongsTo(UserModel, { 
     foreignKey: "userId", 
     as:"user"
});

export default UserModel;
