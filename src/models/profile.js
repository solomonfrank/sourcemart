module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: true
      },

      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      accountId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  Profile.associate = models => {
    // associations can be defined here

    Profile.belongsTo(models.Account, {
      foreignKey: 'accountId',
      as: 'accountInfo'
    });
  };
  return Profile;
};
