module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define(
    'State',
    {
      stateName: DataTypes.STRING
    },
    {}
  );
  State.associate = models => {
    // associations can be defined here
  };
  return State;
};
