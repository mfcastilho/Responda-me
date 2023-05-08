import { Router } from "express";
import SurveyController from "../controllers/SurveyController";
import FormValidations from "../middlewares/FormsValidationsMiddleware";

const router = Router();

const surveyController = new SurveyController();
const validation = new FormValidations();

router.post("/cadastrar-enquete", validation.surveyRegisterValidation, surveyController.storeSurvey);

export default router;