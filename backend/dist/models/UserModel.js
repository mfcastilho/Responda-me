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

// src/models/UserModel.ts
var UserModel_exports = {};
__export(UserModel_exports, {
  default: () => UserModel_default
});
module.exports = __toCommonJS(UserModel_exports);
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
