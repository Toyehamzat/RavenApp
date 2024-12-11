require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'mysql' ,
      port: 3306,
      user: root,
      password: '',
      database:'money_transfer_app'
    },
    migrations: {
      directory: './src/migrations'
    }
  }
};
