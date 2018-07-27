const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('../app/models');

module.exports = {
  secret: 'snippetfy2018tmaturano', // para identificar unicamente a aplicação. Forma de criptografar a sessão do usuário baseado neste valor
  resave: false,
  saveUninitialized: false, // will only create the session in the DB when the session is created
  store: new SequelizeStore({
    db: sequelize,
  }),
};
