module.exports = {
     up: async (queryInterface, Sequelize) => {
       return queryInterface.sequelize.transaction((t) => {
         return Promise.all([
               queryInterface.createTable('answers', {
                    id: {
                         type: Sequelize.UUID,
                         allowNull: false,
                         primaryKey: true,
                         defaultValue: Sequelize.literal('uuid_generate_v4()'),
                    },
                    answer: {
                         type: Sequelize.STRING,
                         allowNull: false,
                    },
                    votes: {
                         type: Sequelize.INTEGER,
                         allowNull: false,
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
         return queryInterface.dropTable('answers', { transaction: t });
       });
     }
   };
   