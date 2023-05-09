import {check} from "express-validator";


class FormValidations{

    loginValidation = [
          check("email")
               .trim().bail()
               .notEmpty().withMessage("Campo obrigatório").bail()
               .isEmail().withMessage("Insira um formato de email válido"),

          check("password")
               .trim().bail()
               .notEmpty().withMessage("Campo obrigatório").bail()
               .isLength({min: 6}).withMessage("A senha precisa ter no mínimo 6 caracteres!")     
     ]


     surveyRegisterValidation =[
          check("title")
               .trim().bail()
               .notEmpty().withMessage("Campo obrigatório").bail(),

          check("deadLine")
               .trim().bail()
               .notEmpty().withMessage("Campo obrigatório").bail(),

          check("surveyAnswerOption") 
               .custom((value,{ req })=>{
              
                    req.body.surveyOptions.forEach((option:any)=>{
                         if(option.surveyAnswerOption == "" || option.surveyAnswerOption == undefined){
                              throw new Error("Os campos de opções de respostas não podem ficar vazios");
                         }    
                    });

                    if(!Array.isArray(req.body.surveyOptions) || req.body.surveyOptions.length < 2){
                         throw new Error("A enquete deve ter no mínimo duas opções de respostas");
                    }

                    return true;
               })    
     ]
}

export default FormValidations;