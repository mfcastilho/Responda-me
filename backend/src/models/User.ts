import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/config/sequelize";

class User extends Model{

}

export default User.init({
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
     tableName: "users",
     timestamps: true,
     sequelize:sequelize
})

