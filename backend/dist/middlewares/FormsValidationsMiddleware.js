"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middlewares/FormsValidationsMiddleware.ts
var FormsValidationsMiddleware_exports = {};
__export(FormsValidationsMiddleware_exports, {
  default: () => FormsValidationsMiddleware_default
});
module.exports = __toCommonJS(FormsValidationsMiddleware_exports);
var import_express_validator = require("express-validator");
var FormValidations = class {
  constructor() {
    this.loginValidation = [
      (0, import_express_validator.check)("email").trim().bail().notEmpty().withMessage("Campo obrigat\xF3rio").bail().isEmail().withMessage("Insira um formato de email v\xE1lido"),
      (0, import_express_validator.check)("password").trim().bail().notEmpty().withMessage("Campo obrigat\xF3rio").bail().isLength({ min: 6 }).withMessage("A senha precisa ter no m\xEDnimo 6 caracteres!")
    ];
    this.surveyRegisterValidation = [
      (0, import_express_validator.check)("title").trim().bail().notEmpty().withMessage("Campo obrigat\xF3rio").bail(),
      (0, import_express_validator.check)("deadLine").trim().bail().notEmpty().withMessage("Campo obrigat\xF3rio").bail(),
      (0, import_express_validator.check)("surveyAnswerOption").custom((value, { req }) => {
        req.body.surveyOptions.forEach((option) => {
          if (option.surveyAnswerOption == "" || option.surveyAnswerOption == void 0) {
            throw new Error("Os campos de op\xE7\xF5es de respostas n\xE3o podem ficar vazios");
          }
        });
        if (!Array.isArray(req.body.surveyOptions) || req.body.surveyOptions.length < 2) {
          throw new Error("A enquete deve ter no m\xEDnimo duas op\xE7\xF5es de respostas");
        }
        return true;
      })
    ];
  }
};
var FormsValidationsMiddleware_default = FormValidations;
