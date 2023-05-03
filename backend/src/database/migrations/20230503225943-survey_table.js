module.exports = {
     up: async (queryInterface, Sequelize) => {
       return queryInterface.sequelize.transaction((t) => {
         return Promise.all([
           queryInterface.createTable('surveys', {
             id: {
               type: Sequelize.UUID,
               allowNull: false,
               primaryKey: true,
               defaultValue: Sequelize.literal('uuid_generate_v4()'),
             },
             ask: {
               type: Sequelize.STRING,
               allowNull: false,
             },
             userId: {
               type: Sequelize.UUID,
               allowNull: false,
               references: {
                 model: "users",
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
         return queryInterface.dropTable('surveys', { transaction: t });
       });
     }
   };
   