import { Router } from "express";
import SurveyController from "../controllers/SurveyController";

const router = Router();

const surveyController = new SurveyController();

router.post("/cadastrar-enquete", surveyController.storeSurvey);

export default router;