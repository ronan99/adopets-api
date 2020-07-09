'use strict';
const bcrypt = require("bcryptjs")
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [{
        name: 'adopets',
        email : 'adopets@email.com',
        password_hash : await bcrypt.hash('adopets' , 8),
        created_at : new Date(),
        updated_at : new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
