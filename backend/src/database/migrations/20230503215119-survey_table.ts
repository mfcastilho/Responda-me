import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               autoIncrement: true,
               primaryKey: true,
          },
          ask: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          userId: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
               references:{
                    model: "users",
                    key: "id"
               }
          },
          createdAt: {
               type: DataTypes.DATE,
               allowNull: false,
          },
          updatedAt: {
               type: DataTypes.DATE,
               allowNull: false,
          },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  },
};
