import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/config/sequelize";
import User from "./User";


class Survey extends Model{

}

export default Survey.init({
     id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false
     },
     ask: {
          type: DataTypes.STRING,
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

// Survey.belongsTo(User, {
//      foreignKey:"userId",
//      as: "user"
// })


