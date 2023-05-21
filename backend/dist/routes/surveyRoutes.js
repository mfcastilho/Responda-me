"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/routes/surveyRoutes.ts
var surveyRoutes_exports = {};
__export(surveyRoutes_exports, {
  default: () => surveyRoutes_default
});
module.exports = __toCommonJS(surveyRoutes_exports);
var import_express = require("express");

// src/controllers/SurveyController.ts
var import_express_validator = require("express-validator");
var import_sequelize9 = require("sequelize");
var import_uuid = require("uuid");

// src/models/SurveyModel.ts
var import_sequelize3 = require("sequelize");

// src/database/config/sequelize.ts
var import_sequelize_typescript = require("sequelize-typescript");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var port = Number(process.env.DB_PORT);
var dialect = String(process.env.DB_DIALECT);
var sequelize = new import_sequelize_typescript.Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect,
  port
});

// src/models/SurveyOptionModel.ts
var import_sequelize = require("sequelize");
var SurveyOptionModel = class extends import_sequelize.Model {
  super(id, surveyAnswerOption, surveyAnswerOptionNumber, totalOptionVotes, surveyId) {
    this.id = id;
    this.surveyAnswerOption = surveyAnswerOption;
    this.surveyAnswerOptionNumber = surveyAnswerOptionNumber;
    this.totalOptionVotes = totalOptionVotes;
    this.surveyId = surveyId;
  }
};
SurveyOptionModel.init(
  {
    id: {
      type: import_sequelize.DataTypes.UUID,
      defaultValue: import_sequelize.DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    surveyAnswerOption: {
      type: import_sequelize.DataTypes.STRING,
      allowNull: false
    },
    surveyAnswerOptionNumber: {
      type: import_sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    totalOptionVotes: {
      type: import_sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    surveyId: {
      type: import_sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: "SurveyModel",
        key: "id"
      }
    }
  },
  {
    tableName: "survey_option",
    timestamps: true,
    sequelize,
    modelName: "SurveyOption"
  }
);
var SurveyOptionModel_default = SurveyOptionModel;

// src/models/SurveyModel.ts
var SurveyModel = class extends import_sequelize3.Model {
  super(id, title, deadline, userId) {
    this.id = id;
    this.title = title;
    this.deadLine = deadline;
    this.userId = userId;
  }
};
SurveyModel.init(
  {
    id: {
      type: import_sequelize3.DataTypes.UUID,
      defaultValue: import_sequelize3.DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: import_sequelize3.DataTypes.STRING,
      allowNull: false
    },
    deadLine: {
      type: import_sequelize3.DataTypes.DATE,
      allowNull: false
    },
    userId: {
      type: import_sequelize3.DataTypes.UUID,
      allowNull: false,
      references: {
        model: "UserModel",
        key: "id"
      }
    }
  },
  {
    tableName: "surveys",
    timestamps: true,
    sequelize
  }
);
SurveyModel.hasMany(SurveyOptionModel_default, {
  sourceKey: "id",
  foreignKey: "surveyId",
  as: "survey_option",
  onDelete: "CASCADE"
});
SurveyOptionModel_default.belongsTo(SurveyModel, {
  foreignKey: "surveyId",
  as: "survey"
});
var SurveyModel_default = SurveyModel;

// src/models/UserModel.ts
var import_sequelize5 = require("sequelize");
var UserModel = class extends import_sequelize5.Model {
  super(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
};
UserModel.init(
  {
    id: {
      type: import_sequelize5.DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: import_sequelize5.DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: import_sequelize5.DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: import_sequelize5.DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "user",
    timestamps: true,
    sequelize
  }
);
UserModel.hasMany(SurveyModel_default, {
  foreignKey: "userId",
  as: "survey",
  onDelete: "CASCADE"
});
SurveyModel_default.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user"
});
var UserModel_default = UserModel;

// src/classes/Survey.ts
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

// src/classes/SurveyOption.ts
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

// src/models/UserSurveyVoteModel.ts
var import_sequelize7 = require("sequelize");
var UserSurveyVoteModel = class extends import_sequelize7.Model {
};
UserSurveyVoteModel.init(
  {
    id: {
      type: import_sequelize7.DataTypes.UUID,
      defaultValue: import_sequelize7.DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: import_sequelize7.DataTypes.UUID,
      allowNull: false
    },
    surveyId: {
      type: import_sequelize7.DataTypes.UUID,
      allowNull: false
    },
    surveyOptionId: {
      type: import_sequelize7.DataTypes.UUID,
      allowNull: false
    }
  },
  {
    tableName: "user_survey_vote",
    timestamps: true,
    sequelize
  }
);
UserModel_default.hasMany(UserSurveyVoteModel, {
  foreignKey: "userId",
  as: "user_survey_vote",
  onDelete: "CASCADE"
});
UserSurveyVoteModel.belongsTo(UserModel_default, {
  foreignKey: "userId",
  as: "user"
});
SurveyModel_default.hasMany(UserSurveyVoteModel, {
  foreignKey: "surveyId",
  as: "user_survey_vote",
  onDelete: "CASCADE"
});
UserSurveyVoteModel.belongsTo(SurveyModel_default, {
  foreignKey: "surveyId",
  as: "survey"
});
var UserSurveyVoteModel_default = UserSurveyVoteModel;

// src/controllers/SurveyController.ts
var SurveyController = class {
  storeSurvey(req, res) {
    return __async(this, null, function* () {
      try {
        const { userId } = req.params;
        const { title, deadLine, surveyOptions } = req.body;
        const resultValidation = (0, import_express_validator.validationResult)(req);
        const verifyIfTheUserExists = yield UserModel_default.findByPk(userId);
        if (!verifyIfTheUserExists) {
          return res.status(401).json({ message: "N\xE3o foi poss\xEDvel criar a enquete pois o usu\xE1rio n\xE3o existe" });
        }
        if (!resultValidation.isEmpty()) {
          const errors = resultValidation.array().map((error) => ({
            path: error.path,
            msg: error.msg
          }));
          return res.status(400).json({ message: errors });
        }
        const id = (0, import_uuid.v4)();
        const newSurvey = JSON.stringify(new Survey(id, title, deadLine, userId));
        const newSurveyData = JSON.parse(newSurvey);
        const surveyPersisted = yield SurveyModel_default.create(newSurveyData);
        function saveSurveyOptions() {
          return __async(this, null, function* () {
            let index = 0;
            for (let option of surveyOptions) {
              const id2 = (0, import_uuid.v4)();
              const surveyOptionInitialVote = 0;
              const surveyOption = JSON.stringify(new SurveyOption(id2, option.surveyAnswerOption, index + 1, surveyOptionInitialVote, newSurveyData.id));
              const surveyOptionData = JSON.parse(surveyOption);
              console.log(surveyOptionData);
              yield SurveyOptionModel_default.create(surveyOptionData);
              index++;
            }
          });
        }
        yield saveSurveyOptions();
        const optionsSurvey = yield SurveyOptionModel_default.findAll(
          {
            where: { surveyId: surveyPersisted.id }
          }
        );
        const completeSurvey = {
          surveyPersisted,
          surveyOptions: optionsSurvey
        };
        return res.status(200).json({ data: completeSurvey });
      } catch (error) {
        if (error instanceof import_sequelize9.ConnectionRefusedError) {
          return res.status(500).json({ error: true, message: "Sistema indispon\xEDvel, tente novamente mais tarde!" });
        }
        if (error instanceof import_sequelize9.UniqueConstraintError) {
          return res.status(400).json(error.parent.message);
        }
        if (error instanceof import_sequelize9.ValidationError) {
          return res.status(400).json({ error: true, message: `${error.errors[0].type} at ${error.errors[0].path}` });
        }
      }
    });
  }
  editSurvey(req, res) {
    return __async(this, null, function* () {
      try {
        const { userId } = req.params;
        const { title, deadLine, surveyOptions } = req.body;
        const { id } = req.params;
        const resultValidation = (0, import_express_validator.validationResult)(req);
        const verifyIfTheUserExists = yield UserModel_default.findByPk(userId);
        if (!verifyIfTheUserExists) {
          return res.status(401).json({ message: "N\xE3o foi poss\xEDvel editar a enquete pois o usu\xE1rio n\xE3o existe" });
        }
        if (!resultValidation.isEmpty()) {
          const errors = resultValidation.array().map((error) => ({
            path: error.path,
            msg: error.msg
          }));
          return res.status(400).json({ message: errors });
        }
        const survey = yield SurveyModel_default.findByPk(id);
        const [surveyEditedQuantityLines, updatedregisters] = yield SurveyModel_default.update(
          {
            "title": title == void 0 ? survey == null ? void 0 : survey.title : title,
            "deadLine": deadLine == void 0 ? survey == null ? void 0 : survey.deadLine : deadLine
          },
          { where: { id } }
        );
        if (surveyEditedQuantityLines > 0) {
          const surveyUpdated = yield SurveyModel_default.findByPk(id);
          const optionsSurvey = yield SurveyOptionModel_default.findAll(
            {
              where: { surveyId: surveyUpdated.id }
            }
          );
          function updateSurveyOptions() {
            return __async(this, null, function* () {
              const existingOptionIds = optionsSurvey.map((option) => option.id);
              for (let i = 0; i < surveyOptions.length; i++) {
                const option = surveyOptions[i];
                if (option.id && existingOptionIds.includes(option.id)) {
                  yield SurveyOptionModel_default.update(
                    {
                      surveyAnswerOption: option.surveyAnswerOption,
                      surveyAnswerOptionNumber: i + 1,
                      totalOptionVotes: 0
                      // Valor inicial
                    },
                    { where: { id: option.id } }
                  );
                }
              }
              const optionIdsToRemove = existingOptionIds.filter((id2) => !surveyOptions.some((option) => option.id === id2));
              yield SurveyOptionModel_default.destroy({ where: { id: optionIdsToRemove } });
              const optionIdsToAdd = surveyOptions.filter((option) => !option.id).map((option) => option.id);
              for (let i = 0; i < surveyOptions.length; i++) {
                const option = surveyOptions[i];
                if (!option.id || optionIdsToAdd.includes(option.id)) {
                  yield SurveyOptionModel_default.create({
                    surveyId: surveyUpdated.id,
                    surveyAnswerOption: option.surveyAnswerOption,
                    surveyAnswerOptionNumber: i + 1,
                    totalOptionVotes: 0
                    // Valor inicial
                  });
                }
              }
            });
          }
          yield updateSurveyOptions();
          const optionsSurveyUpdated = yield SurveyOptionModel_default.findAll(
            {
              where: { surveyId: surveyUpdated.id }
            }
          );
          const completeSurvey = {
            surveyUpdated,
            surveyOptions: optionsSurveyUpdated
          };
          return res.status(200).json({ data: completeSurvey });
        } else {
          return res.status(400).json({ message: "N\xE3o foi poss\xEDvel realizar a edi\xE7\xE3o" });
        }
      } catch (error) {
        if (error instanceof import_sequelize9.ConnectionRefusedError) {
          return res.status(500).json({ error: true, message: "Sistema indispon\xEDvel, tente novamente mais tarde!" });
        }
        if (error instanceof import_sequelize9.UniqueConstraintError) {
          return res.status(400).json(error.parent.message);
        }
        if (error instanceof import_sequelize9.ValidationError) {
          return res.status(400).json({ error: true, message: `${error.errors[0].type} at ${error.errors[0].path}` });
        }
      }
    });
  }
  deleteSurvey(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const verifyIfTheSurveyExists = yield SurveyModel_default.findByPk(id);
        if (!verifyIfTheSurveyExists) {
          return res.status(400).json({ error: "A enquete solicitada n\xE3o existe." });
        }
        yield SurveyOptionModel_default.destroy({
          where: { surveyId: id }
        });
        yield SurveyModel_default.destroy({
          where: { id }
        });
        return res.status(200).json({ data: "Enquete deletada com sucesso" });
      } catch (error) {
        if (error instanceof import_sequelize9.ConnectionRefusedError) {
          return res.status(500).json({ error: true, message: "Sistema indispon\xEDvel, tente novamente mais tarde!" });
        }
        if (error instanceof import_sequelize9.UniqueConstraintError) {
          return res.status(400).json(error.parent.message);
        }
        if (error instanceof import_sequelize9.ValidationError) {
          return res.status(400).json({ error: true, message: `${error.errors[0].type} at ${error.errors[0].path}` });
        }
      }
    });
  }
  getUserSurveys(req, res) {
    return __async(this, null, function* () {
      try {
        const { userId } = req.params;
        const verifyIfTheUserExists = yield UserModel_default.findByPk(userId);
        if (!verifyIfTheUserExists) {
          return res.status(400).json({ error: "Usu\xE1rio n\xE3o existe." });
        }
        const userSurveys = yield SurveyModel_default.findAll({
          where: { userId }
        });
        if (userSurveys.length === 0) {
          return res.status(404).json({ message: "Ainda n\xE3o existe enquetes cadastradas por esse usu\xE1rio." });
        }
        const allUserSurveyOptions = [];
        function getUserSurveysAnswerOptions() {
          return __async(this, null, function* () {
            for (let survey of userSurveys) {
              const userSurveyAnswerOptions = yield SurveyOptionModel_default.findAll({
                where: { surveyId: survey.id }
              });
              allUserSurveyOptions.push(...userSurveyAnswerOptions);
            }
          });
        }
        yield getUserSurveysAnswerOptions();
        const userSurveysAndRespectiveOptions = [];
        userSurveys.forEach((survey) => {
          const surveyOptions = [];
          allUserSurveyOptions.forEach((option) => {
            if (option.surveyId === survey.id) {
              surveyOptions.push(option);
              console.log(option);
            }
          });
          const surveyAndOptions = __spreadProps(__spreadValues({}, survey), {
            surveyOptions
          });
          userSurveysAndRespectiveOptions.push(surveyAndOptions);
        });
        res.status(200).json({ userSurveysAndRespectiveOptions });
      } catch (error) {
        if (error instanceof import_sequelize9.ConnectionRefusedError) {
          return res.status(500).json({ error: true, message: "Sistema indispon\xEDvel, tente novamente mais tarde!" });
        }
        if (error instanceof import_sequelize9.UniqueConstraintError) {
          return res.status(400).json(error.parent.message);
        }
        if (error instanceof import_sequelize9.ValidationError) {
          return res.status(400).json({ error: true, message: `${error.errors[0].type} at ${error.errors[0].path}` });
        }
      }
    });
  }
  getAllSurveys(req, res) {
    return __async(this, null, function* () {
      try {
        const allSurveys = yield SurveyModel_default.findAll();
        const allSurveyOptions = [];
        function getUserSurveysAnswerOptions() {
          return __async(this, null, function* () {
            for (let survey of allSurveys) {
              const userSurveyAnswerOptions = yield SurveyOptionModel_default.findAll({
                where: { surveyId: survey.id }
              });
              allSurveyOptions.push(...userSurveyAnswerOptions);
            }
          });
        }
        yield getUserSurveysAnswerOptions();
        const surveysAndRespectiveOptions = [];
        allSurveys.forEach((survey) => {
          const surveyOptions = [];
          allSurveyOptions.forEach((option) => {
            if (option.surveyId === survey.id) {
              surveyOptions.push(option);
              console.log(option);
            }
          });
          const surveyAndOptions = __spreadProps(__spreadValues({}, survey), {
            surveyOptions
          });
          surveysAndRespectiveOptions.push(surveyAndOptions);
        });
        return res.status(200).json({ data: surveysAndRespectiveOptions });
      } catch (error) {
        if (error instanceof import_sequelize9.ConnectionRefusedError) {
          return res.status(500).json({ error: true, message: "Sistema indispon\xEDvel, tente novamente mais tarde!" });
        }
        if (error instanceof import_sequelize9.UniqueConstraintError) {
          return res.status(400).json(error.parent.message);
        }
        if (error instanceof import_sequelize9.ValidationError) {
          return res.status(400).json({ error: true, message: `${error.errors[0].type} at ${error.errors[0].path}` });
        }
      }
    });
  }
  userVoteSurveyAnswerOption(req, res) {
    return __async(this, null, function* () {
      try {
        const { surveyId } = req.params;
        const { userId, surveyOptionId } = req.body;
        const survey = yield SurveyModel_default.findByPk(surveyId);
        if (!survey) {
          return res.status(404).json({ error: "Enquete n\xE3o existe." });
        }
        const user = yield UserModel_default.findByPk(userId);
        if (!user) {
          return res.status(404).json({ error: "Usu\xE1rio n\xE3o existe." });
        }
        const surveyAnswerOption = yield SurveyOptionModel_default.findByPk(surveyOptionId);
        if (!surveyAnswerOption) {
          return res.status(404).json({ error: "A op\xE7\xE3o de resposta da enquete n\xE3o existe." });
        }
        const checkIfTheUserHasAlreadyVoted = yield UserSurveyVoteModel_default.findOne({
          where: {
            userId,
            surveyId
          }
        });
        if (checkIfTheUserHasAlreadyVoted) {
          return res.status(400).json({ message: "O usu\xE1rio j\xE1 votou na enquete." });
        }
        const userSurveyVote = yield UserSurveyVoteModel_default.create({
          id: (0, import_uuid.v4)(),
          userId,
          surveyOptionId
        });
        if (!userSurveyVote) {
          return res.status(400).json({ error: "Voto n\xE3o pode ser computado." });
        }
        const atualNumberOfVotes = surveyAnswerOption.totalOptionVotes;
        const [numberOfLinesUpdated] = yield SurveyOptionModel_default.update(
          {
            totalOptionVotes: atualNumberOfVotes + 1
          },
          {
            where: { id: surveyOptionId }
          }
        );
        if (numberOfLinesUpdated === 0) {
          return res.status(400).json({ error: "Voto n\xE3o pode ser computado." });
        }
        const surveyAnswerOptionUpdated = yield SurveyOptionModel_default.findByPk(surveyOptionId);
        return res.status(200).json({ surveyAnswerOptionUpdated });
      } catch (error) {
        if (error instanceof import_sequelize9.ConnectionRefusedError) {
          return res.status(500).json({ error: true, message: "Sistema indispon\xEDvel, tente novamente mais tarde!" });
        }
        if (error instanceof import_sequelize9.UniqueConstraintError) {
          return res.status(400).json(error.parent.message);
        }
        if (error instanceof import_sequelize9.ValidationError) {
          return res.status(400).json({ error: true, message: `${error.errors[0].type} at ${error.errors[0].path}` });
        }
      }
    });
  }
};

// src/middlewares/FormsValidationsMiddleware.ts
var import_express_validator2 = require("express-validator");
var FormValidations = class {
  constructor() {
    this.loginValidation = [
      (0, import_express_validator2.check)("email").trim().bail().notEmpty().withMessage("Campo obrigat\xF3rio").bail().isEmail().withMessage("Insira um formato de email v\xE1lido"),
      (0, import_express_validator2.check)("password").trim().bail().notEmpty().withMessage("Campo obrigat\xF3rio").bail().isLength({ min: 6 }).withMessage("A senha precisa ter no m\xEDnimo 6 caracteres!")
    ];
    this.surveyRegisterValidation = [
      (0, import_express_validator2.check)("title").trim().bail().notEmpty().withMessage("Campo obrigat\xF3rio").bail(),
      (0, import_express_validator2.check)("deadLine").trim().bail().notEmpty().withMessage("Campo obrigat\xF3rio").bail(),
      (0, import_express_validator2.check)("surveyAnswerOption").custom((value, { req }) => {
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

// src/routes/surveyRoutes.ts
var router = (0, import_express.Router)();
var surveyController = new SurveyController();
var validation = new FormsValidationsMiddleware_default();
router.get("/usuario/:userId/enquetes", surveyController.getUserSurveys);
router.post("/usuario/:userId/cadastrar-enquete", validation.surveyRegisterValidation, surveyController.storeSurvey);
router.put("/usuario/:userId/enquete/:id/editar-enquete", validation.surveyRegisterValidation, surveyController.editSurvey);
router.delete("/usuario/:userId/enquete/:id/deletar-enquete", surveyController.deleteSurvey);
router.get("/enquetes", surveyController.getAllSurveys);
router.post("/enquete/:surveyId", surveyController.userVoteSurveyAnswerOption);
var surveyRoutes_default = router;
