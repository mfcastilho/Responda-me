/* -- Importações -- */
import express from 'express';
import authRoutes from './routes/authRoutes';



/* -- Varáveis -- */
const app = express();
const port = 3000;



/* -- Middlewares -- */
app.use(express.json());



/* -- Rotas -- */
app.use(authRoutes);



/* -- Servidor -- */
app.listen(port, ()=>{
     console.log(`Servidor rodando na porta ${port}`);
})