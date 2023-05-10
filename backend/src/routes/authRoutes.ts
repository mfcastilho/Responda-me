import * as express from 'express';
import AuthController from "../controllers/AuthControllers";
import FormValidations from '../middlewares/FormsValidationsMiddleware';

const router = express.Router();

/* Instanciação de classes */
const authController = new AuthController();
const validation = new FormValidations();


/* Rotas */
router.post("/login", validation.loginValidation, authController.login);
router.post("/cadastrar-usuario", validation.loginValidation, authController.storeUser);




export default router;