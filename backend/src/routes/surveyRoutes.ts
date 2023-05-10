import { Router } from "express";
import SurveyController from "../controllers/SurveyController";
import FormValidations from "../middlewares/FormsValidationsMiddleware";

const router = Router();

const surveyController = new SurveyController();
const validation = new FormValidations();

router.get("/usuario/:userId/enquetes", surveyController.getUserSurveys);
router.post("/usuario/:userId/cadastrar-enquete", validation.surveyRegisterValidation, surveyController.storeSurvey);
router.put("/usuario/:userId/enquete/:id/editar-enquete", validation.surveyRegisterValidation, surveyController.editSurvey);
router.delete("/usuario/:userId/enquete/:id/deletar-enquete", surveyController.deleteSurvey);

router.get("/enquetes", surveyController.getAllSurveys);

router.post("/enquete/:surveyId", surveyController.userVoteSurveyAnswerOption);

export default router;