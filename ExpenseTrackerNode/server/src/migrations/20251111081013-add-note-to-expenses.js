"use strict";

const migrations = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "expenses", // Table name
      "note", // Column name
      {
        type: Sequelize.STRING,
        allowNull: true, // optional
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("expenses", "note");
  },
};

module.exports = migrations;