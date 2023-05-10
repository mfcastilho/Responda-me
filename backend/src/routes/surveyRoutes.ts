import { Router } from "express";
import SurveyController from "../controllers/SurveyController";
import FormValidations from "../middlewares/FormsValidationsMiddleware";

const router = Router();

const surveyController = new SurveyController();
const validation = new FormValidations();

router.post("/cadastrar-enquete", validation.surveyRegisterValidation, surveyController.storeSurvey);
router.put("/enquete/:id/editar-enquete", validation.surveyRegisterValidation, surveyController.editSurvey);
router.delete("/enquete/:id/deletar-enquete", surveyController.deleteSurvey);

export default router;