import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.DB_PORT)
const dialect:any = String(process.env.DB_DIALECT)

export const sequelize = new Sequelize({
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          host: process.env.DB_HOST,
          dialect: dialect,
          port: port     
})
