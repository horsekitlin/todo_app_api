'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '使用者的狀態: 0: 未驗證, 1: 已驗證',
      },
      facebook_id: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      google_id: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING,
        length: 200,
      },
      name: {
        type: Sequelize.STRING,
        length: 20,
      },
      email: {
        type: Sequelize.STRING,
        length: 100,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};