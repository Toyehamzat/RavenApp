module.exports = {
  development: {
      client: 'mysql2',
      connection: {
          host: '127.0.0.1',
          database: 'db',
          port: 3306,
          user: 'root',
          password: 'password',
      },
      migrations: {
          directory: './src/migrations'
      }
  }
};