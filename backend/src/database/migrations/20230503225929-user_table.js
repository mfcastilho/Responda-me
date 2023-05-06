module.exports = {
     up: async (queryInterface, Sequelize) => {
       return queryInterface.sequelize.transaction((t) => {
         return Promise.all([
           queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";', { transaction: t }),
           queryInterface.createTable('user', {
             id: {
               type: Sequelize.UUID,
               allowNull: false,
               primaryKey: true,
               defaultValue: Sequelize.literal('uuid_generate_v4()'),
             },
             name: {
               type: Sequelize.STRING,
               allowNull: false,
             },
             email: {
               type: Sequelize.STRING,
               allowNull: false,
               unique: true,
             },
             password: {
               type: Sequelize.STRING,
               allowNull: false,
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
         return queryInterface.dropTable('user', { transaction: t });
       });
     }
   };
   