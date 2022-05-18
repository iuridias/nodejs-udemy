const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesequelize', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

// try {
//   sequelize.authenticate();
//   console.log('Sequelize conectado com sucesso.')
// } catch (error) {
//   console.log('Falha na conexão: ', error)
// }

module.exports = sequelize;