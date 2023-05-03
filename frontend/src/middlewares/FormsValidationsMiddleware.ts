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
}

export default FormValidations;