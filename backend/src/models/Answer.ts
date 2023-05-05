import {Model, DataTypes } from "sequelize";


export class Answer extends Model {
     public id!: string;
     public answer!: string;
     public vote!: number;
     public surveyId!: string;

     

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

export default Answer;