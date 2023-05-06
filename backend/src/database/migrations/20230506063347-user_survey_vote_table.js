module.exports = {
     up: async (queryInterface, Sequelize) => {
       return queryInterface.sequelize.transaction((t) => {
         return Promise.all([
               queryInterface.createTable('user_survey_vote', {
                    id: {
                         type: Sequelize.UUID,
                         allowNull: false,
                         primaryKey: true,
                         defaultValue: Sequelize.literal('uuid_generate_v4()'),
                    },
                    userId: {
                         type: Sequelize.UUID,
                         allowNull: false,
                         references: {
                              model: "user",
                              key: "id"
                         }
                    },
                    surveyOptionId: {
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
         return queryInterface.dropTable('user_survey_vote', { transaction: t });
       });
     }
   };
   