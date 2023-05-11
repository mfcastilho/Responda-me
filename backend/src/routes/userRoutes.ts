import * as express from 'express';
import UserController from "../controllers/UserControllers";
import FormValidations from '../middlewares/FormsValidationsMiddleware';

const router = express.Router();

/* Instanciação de classes */
const userController = new UserController();
const validation = new FormValidations();


/* Rotas */
router.get("/usuarios", userController.getAllUsers);
router.get("/usuario/:id", userController.getUserInfos);

router.put("/usuario/:id/editar", userController.updateUser);

router.delete("/usuario/:id/deletar", userController.deleteUser);



export default router;