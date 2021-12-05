const baseMigration = require("../config/baseMigration");
const { saltHashPassword } = require("../../helpers/utils");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      ...baseMigration,
      name: {
        field: "name",
        type: DataTypes.STRING,
        length: 20,
      },
      facebookId: {
        field: "facebook_id",
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      googleId: {
        field: "google_id",
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        field: "email",
        type: DataTypes.STRING,
        length: 50,
        unique: true,
      },
      password: {
        field: "password",
        type: DataTypes.STRING,
        length: 200,
        set(value) {
          this.setDataValue("password", saltHashPassword(value));
        },
      },
      status: {
        field: "status",
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '帳號狀態: 0: 等待驗證中, 1: 已驗證',
      },
    }, {
    sequelize,
    tableName: "users",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  });

  User.associate = function (models) {
    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return User;
};