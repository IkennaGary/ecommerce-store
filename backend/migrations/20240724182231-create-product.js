'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      discountPercentage: {
        type: Sequelize.DECIMAL
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      reviewId: {
        type: Sequelize.INTEGER
      },
      popularity: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.DECIMAL
      },
      stock: {
        type: Sequelize.INTEGER
      },
      tags: {
        type: Sequelize.JSON
      },
      brand: {
        type: Sequelize.STRING
      },
      sku: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.DECIMAL
      },
      hairType: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.STRING
      },
      capConstruction: {
        type: Sequelize.STRING
      },
      inches: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.JSON
      },
      warrantyInformation: {
        type: Sequelize.STRING
      },
      shippingInformation: {
        type: Sequelize.STRING
      },
      returnPolicy: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};