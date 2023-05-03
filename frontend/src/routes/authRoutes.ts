import * as express from 'express';
const router = express.Router();
import AuthController from "../controllers/AuthControllers";

const authController = new AuthController();

router.post("/", authController.login);


export default router;