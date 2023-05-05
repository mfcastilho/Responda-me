/* -- Importações -- */
import express from 'express';
import authRoutes from './routes/authRoutes';
import surveyRouters from "./routes/surveyRoutes";



/* -- Varáveis -- */
const app = express();
const port = 3000;



/* -- Middlewares -- */
app.use(express.json());



/* -- Rotas -- */
app.use("/api/v1/",authRoutes);
app.use("/api/v1/",surveyRouters);



/* -- Servidor -- */
app.listen(port, ()=>{
     console.log(`Servidor rodando na porta ${port}`);
})