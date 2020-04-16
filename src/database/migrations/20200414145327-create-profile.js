module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dateOfBirth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      stateId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      accountId: {
        type: Sequelize.UUID,
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Profiles')
};
