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

// src/classes/Survey.ts
var Survey_exports = {};
__export(Survey_exports, {
  Survey: () => Survey
});
module.exports = __toCommonJS(Survey_exports);
var Survey = class {
  constructor(id, title, deadline, userId) {
    this.id = id;
    this.title = title;
    this.deadLine = deadline;
    this.userId = userId;
  }
  /* -- Getters  -- */
  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getDeadLine() {
    return this.deadLine;
  }
  getUserId() {
    return this.userId;
  }
  /* -- Setters  -- */
  setId(id) {
    this.id = id;
  }
  setTitle(title) {
    this.title = title;
  }
  setDeadLine(deadLine) {
    this.deadLine = deadLine;
  }
  setUserId(userId) {
    this.userId = userId;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Survey
});
