module.exports = {
     up: async (queryInterface, Sequelize) => {
       return queryInterface.sequelize.transaction((t) => {
         return Promise.all([
               queryInterface.createTable('survey_result_winner', {
                    id: {
                         type: Sequelize.UUID,
                         allowNull: false,
                         primaryKey: true,
                         defaultValue: Sequelize.literal('uuid_generate_v4()'),
                    },
                    surveyId: {
                         type: Sequelize.UUID,
                         allowNull: false,
                         references: {
                              model: "surveys",
                              key: "id"
                         }
                    },
                    winnerSurveyOptionId: {
                         type: Sequelize.UUID,
                         allowNull: false,
                         references: {
                              model: "survey_option",
                              key: "id"
                         }
                    },
                    createdAt: {
                         type: Sequelize.DATE,
                         allowNull: false,
                    },
                    updatedAt: {
                         type: Sequelize.DATE,
                         allowNull: false,
                    },
               }, { transaction: t })
          ]);
       });
     },
   
     down: async (queryInterface, Sequelize) => {
       return queryInterface.sequelize.transaction((t) => {
         return queryInterface.dropTable('survey_result_winner', { transaction: t });
       });
     }
   };
   