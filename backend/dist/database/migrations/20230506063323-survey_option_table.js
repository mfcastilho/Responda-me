"use strict";
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

// src/database/migrations/20230506063323-survey_option_table.js
module.exports = {
  up: (queryInterface, Sequelize) => __async(exports, null, function* () {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable("survey_option", {
          id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.literal("uuid_generate_v4()")
          },
          surveyAnswerOption: {
            type: Sequelize.STRING,
            allowNull: false
          },
          surveyAnswerOptionNumber: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          totalOptionVotes: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          surveyId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: "surveys",
              key: "id"
            }
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }, { transaction: t })
      ]);
    });
  }),
  down: (queryInterface, Sequelize) => __async(exports, null, function* () {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.dropTable("survey_option", { transaction: t });
    });
  })
};
