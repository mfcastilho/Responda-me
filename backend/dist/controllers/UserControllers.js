"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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

// src/controllers/UserControllers.ts
var UserControllers_exports = {};
__export(UserControllers_exports, {
  default: () => UserControllers_default
});
module.exports = __toCommonJS(UserControllers_exports);
var import_sequelize7 = require("sequelize");
var import_bcryptjs = __toESM(require("bcryptjs"));

// src/models/UserModel.ts
var import_sequelize5 = require("sequelize");

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

// src/models/SurveyModel.ts
var import_sequelize3 = require("sequelize");

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

// src/classes/User.ts
var User = class {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  /* -- Getters  -- */
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  /* -- Setters  -- */
  setId(id) {
    this.id = id;
  }
  setName(name) {
    this.name = name;
  }
  setEmail(email) {
    this.email = email;
  }
  setPassword(password) {
    this.password = password;
  }
};

// src/controllers/UserControllers.ts
var UserController = class {
  getUserInfos(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const user = yield UserModel_default.findByPk(id);
        if (!user) {
          return res.status(400).json({ message: "Usu\xE1rio n\xE3o pode ser encontrado." });
        }
        return res.status(200).json({ data: user });
      } catch (error) {
        if (error instanceof import_sequelize7.ConnectionRefusedError) {
          return res.status(500).json({ error: true, message: "Sistema indispon\xEDvel, tente novamente mais tarde!" });
        }
        if (error instanceof import_sequelize7.UniqueConstraintError) {
          return res.status(400).json(error.parent.message);
        }
        if (error instanceof import_sequelize7.ValidationError) {
          return res.status(400).json({ error: true, message: `${error.errors[0].type} at ${error.errors[0].path}` });
        }
      }
    });
  }
  getAllUsers(req, res) {
    return __async(this, null, function* () {
      try {
        const users = yield UserModel_default.findAll();
        if (!users) {
          return res.status(400).json({ message: "Usu\xE1rios n\xE3o encontrados." });
        }
        return res.status(200).json(users);
      } catch (error) {
        if (error instanceof import_sequelize7.ConnectionRefusedError) {
          return res.status(500).json({ error: true, message: "Sistema indispon\xEDvel, tente novamente mais tarde!" });
        }
        if (error instanceof import_sequelize7.UniqueConstraintError) {
          return res.status(400).json(error.parent.message);
        }
        if (error instanceof import_sequelize7.ValidationError) {
          return res.status(400).json({ error: true, message: `${error.errors[0].type} at ${error.errors[0].path}` });
        }
      }
    });
  }
  updateUser(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = yield UserModel_default.findByPk(id);
        if (!user) {
          return res.status(400).json({ message: "Usu\xE1rio n\xE3o pode ser encontrado." });
        }
        const userUpdated = new User(id, name, email);
        if (password) {
          const hashPassword = import_bcryptjs.default.hashSync(password, 10);
          userUpdated.setPassword(hashPassword);
        }
        const [updatedQuantityLines] = yield UserModel_default.update(
          userUpdated,
          { where: { id } }
        );
        if (updatedQuantityLines == 0) {
          return res.status(400).json({ message: "Usu\xE1rio n\xE3o pode ser editado." });
        }
        return res.status(200).json(userUpdated);
      } catch (error) {
        if (error instanceof import_sequelize7.ConnectionRefusedError) {
          return res.status(500).json({ error: true, message: "Sistema indispon\xEDvel, tente novamente mais tarde!" });
        }
        if (error instanceof import_sequelize7.UniqueConstraintError) {
          return res.status(400).json(error.parent.message);
        }
        if (error instanceof import_sequelize7.ValidationError) {
          return res.status(400).json({ error: true, message: `${error.errors[0].type} at ${error.errors[0].path}` });
        }
      }
    });
  }
  deleteUser(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const user = yield UserModel_default.findByPk(id);
        if (!user) {
          return res.status(400).json({ message: "Usu\xE1rio n\xE3o pode ser deletado." });
        }
        const surveys = yield SurveyModel_default.findAll({
          where: { userId: id }
        });
        for (const survey of surveys) {
          yield SurveyOptionModel_default.destroy({
            where: { surveyId: survey.id }
          });
          yield SurveyModel_default.destroy({
            where: { id: survey.id }
          });
        }
        const userId = yield UserModel_default.destroy({
          where: { id },
          cascade: true
        });
        return res.status(200).json({ message: `Usu\xE1rio e id:${userId} deletado com sucesso.` });
      } catch (error) {
        if (error instanceof import_sequelize7.ConnectionRefusedError) {
          return res.status(500).json({ error: true, message: "Sistema indispon\xEDvel, tente novamente mais tarde!" });
        }
        if (error instanceof import_sequelize7.UniqueConstraintError) {
          return res.status(400).json(error.parent.message);
        }
        if (error instanceof import_sequelize7.ValidationError) {
          return res.status(400).json({ error: true, message: `${error.errors[0].type} at ${error.errors[0].path}` });
        }
      }
    });
  }
};
var UserControllers_default = UserController;
