const baseMigration = require("../config/baseMigration");
const { saltHashPassword } = require("../../helpers/utils");

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      ...baseMigration,
      title: {
        field: "title",
        type: DataTypes.STRING,
        length: 20,
      },
      status: {
        field: "status",
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '帳號狀態: 0: 未完成, 1: 已完成',
      },
    }, {
    sequelize,
    tableName: "tasks",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  });

  Task.associate = function (models) {
    Task.belongsTo(models.User, {
      as: "user",
      foreignKey: {
        name: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

  };

  return Task;
};