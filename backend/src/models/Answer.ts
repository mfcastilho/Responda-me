import {Model, DataTypes } from "sequelize";


export class Answer extends Model {
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
          return Answer.init({
               id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                    allowNull: false
               },  
               answer: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               vote: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               surveyId: {
                    type: DataTypes.UUID,
                    allowNull: false,                   
               }
        }, {
            tableName: "answers",
            timestamps: true,
            sequelize: sequelize
        });
     }   
}