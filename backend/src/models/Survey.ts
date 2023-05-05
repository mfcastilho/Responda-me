import {Model, DataTypes } from "sequelize";


 class Survey extends Model {
     public id!: string;
     public ask!: string;
     public userId!: string;

     
     public static associate(models: any) {
        this.belongsTo(models.User);
    }

     public static initModel(sequelize: any) {
        return Survey.init({
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
     }   
}

export default Survey;