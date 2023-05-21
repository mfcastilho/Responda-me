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

// src/classes/SurveyOption.ts
var SurveyOption_exports = {};
__export(SurveyOption_exports, {
  SurveyOption: () => SurveyOption
});
module.exports = __toCommonJS(SurveyOption_exports);
var SurveyOption = class {
  constructor(id, surveyAnswerOption, surveyAnswerOptionNumber, totalOptionVotes, surveyId) {
    this.id = id;
    this.surveyAnswerOption = surveyAnswerOption;
    this.surveyAnswerOptionNumber = surveyAnswerOptionNumber;
    this.totalOptionVotes = totalOptionVotes;
    this.surveyId = surveyId;
  }
  /* -- Getters  -- */
  getId() {
    return this.id;
  }
  getSurveyAnswerOption() {
    return this.surveyAnswerOption;
  }
  getSurveyAnswerOptionNumber() {
    return this.surveyAnswerOptionNumber;
  }
  getTotalOptionVotes() {
    return this.totalOptionVotes;
  }
  getSurveyId() {
    return this.surveyId;
  }
  /* -- Setters  -- */
  setId(id) {
    this.id = id;
  }
  setSurveyAnswerOption(surveyAnswerOption) {
    this.surveyAnswerOption = surveyAnswerOption;
  }
  setsurveyAnswerOptionNumber(surveyAnswerOptionNumber) {
    this.surveyAnswerOptionNumber = surveyAnswerOptionNumber;
  }
  setTotalOptionVotes(totalOptionVotes) {
    this.totalOptionVotes = totalOptionVotes;
  }
  setSurveyId(surveyId) {
    this.surveyId = surveyId;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SurveyOption
});
