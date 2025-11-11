"use strict";

const migrations = {
  /**
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
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

  /**
   * Example:
   * await queryInterface.dropTable('users');
   */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("expenses", "note");
  },
};

module.exports = migrations;
