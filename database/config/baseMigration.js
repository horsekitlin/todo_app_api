'use strict';
const Sequelize = require('sequelize');

module.exports = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      const rawValue = this.getDataValue("createdAt");
      return rawValue
        ? rawValue.getTime()
        : null;
    }
  },
  updatedAt: {
    field: 'updated_at',
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      const rawValue = this.getDataValue("updatedAt");
      return rawValue
        ? rawValue.getTime()
        : null;
    }
  },
  deletedAt: {
    field: 'deleted_at',
    allowNull: true,
    type: Sequelize.DATE,
    defaultValue: null,
    get() {
      const rawValue = this.getDataValue("deletedAt");
      return rawValue
        ? rawValue.getTime()
        : null;
    }
  }
};
