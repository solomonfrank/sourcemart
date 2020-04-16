'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProfileImage = sequelize.define(
    'ProfileImage',
    {
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accountId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  ProfileImage.associate = models => {
    // associations can be defined here
  };
  return ProfileImage;
};
