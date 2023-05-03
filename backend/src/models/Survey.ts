import {Model, DataTypes } from "sequelize";


export class Survey extends Model {
     private id!: string;
     private ask!: string;
     private userId!: string;

     /* Getters */
     public getId(): string {
          return this.id;
     }

     public getName(): string {
          return this.ask;
     }

     public getEmail(): string {
          return this.userId;
     }


     /* Setters */
     public setId(id: string):void {
          this.id = id;
     }

     public setName(ask: string):void {
          this.ask = ask;
     }

     public setEmail(userId: string):void {
          this.userId = userId;
     }

     public static associate(models: any) {
        this.belongsTo(models.User);
    }

     public static initModel(sequelize: any) {
        return Survey.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: "users",
            timestamps: true,
            sequelize: sequelize
        });
     }   
}