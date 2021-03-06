module.exports = {
  "development": {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME + '_development',
    'host': process.env.DB_HOST || '127.0.0.1',
    'dialect': 'postgres',
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "dialect": "postgres",
    "use_env_variable": "DATABASE_URL",
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
