module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "film",
    {
      film_id: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "film",
          key: "idx_title",
        },
      },
      last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "film_actor",
    }
  );
};
