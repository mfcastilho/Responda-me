module.exports = {
     up: async (queryInterface, Sequelize) => {
          return queryInterface.sequelize.transaction((t) => {
               return Promise.all([
                    queryInterface.createTable(
                         "surveys",
                         {
                              id: {
                                   type: Sequelize.UUID,
                                   allowNull: false,
                                   primaryKey: true,
                                   defaultValue:
                                        Sequelize.literal("uuid_generate_v4()"),
                              },
                              title: {
                                   type: Sequelize.STRING,
                                   allowNull: false,
                              },
                              deadLine: {
                                   type: Sequelize.DATE,
                                   allowNull: false,
                              },
                              userId: {
                                   type: Sequelize.UUID,
                                   allowNull: false,
                                   references: {
                                        model: "user",
                                        key: "id",
                                   },
                              },
                              createdAt: {
                                   type: Sequelize.DATE,
                                   allowNull: false,
                              },
                              updatedAt: {
                                   type: Sequelize.DATE,
                                   allowNull: false,
                              },
                         },
                         { transaction: t }
                    ),
               ]);
          });
     },

     down: async (queryInterface, Sequelize) => {
          return queryInterface.sequelize.transaction((t) => {
               return queryInterface.dropTable("surveys", { transaction: t });
          });
     },
};
