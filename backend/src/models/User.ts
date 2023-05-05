import {Model, DataTypes } from "sequelize";


export class User extends Model {
     private id!: string;
     private name!: string;
     private email!: string;
     private password!: string;


     /* Getters */
     public getId(): string {
          return this.id;
     }

     public getName(): string {
          return this.name;
     }

     public getEmail(): string {
          return this.email;
     }

     public getPassword(): string {
          return this.password;
     }


     /* Setters */
     public setId(id: string):void {
          this.id = id;
     }

     public setName(name: string):void {
          this.name = name;
     }

     public setEmail(email: string):void {
          this.email = email;
     }

     public setPassword(password: string):void {
          this.password = password;
     }


     public static associate(models: any) {
        this.hasMany(models.Survey);
    }

     public static initModel(sequelize: any) {
        return User.init({
            id: {
               type: DataTypes.UUID,
               defaultValue: DataTypes.UUIDV4,
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