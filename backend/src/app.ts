/* -- Importações -- */
import express from 'express';
import authRoutes from './routes/authRoutes';
import surveyRouters from "./routes/surveyRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";



/* -- Varáveis -- */
const app = express();
const port = 3000;


const whitelist = ['http://localhost:5173']; 
const corsOptions = {
  origin: function (origin:any, callback:(err: Error | null, allow?: boolean) => void) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));



/* -- Middlewares -- */
app.use(express.json());



/* -- Rotas -- */
app.use("/api/v1/", authRoutes);
app.use("/api/v1/", surveyRouters);
app.use("/api/v1/", userRoutes);



/* -- Servidor -- */
app.listen(port, ()=>{
     console.log(`Servidor rodando na porta ${port}`);
})