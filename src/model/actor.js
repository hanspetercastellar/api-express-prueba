module.exports = function (sequelize, DataTypes) {
  var Actor = sequelize.define(
    "actor",
    {
      actor_id: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      tableName: "actor",
    }
  );

  return Actor;
};
