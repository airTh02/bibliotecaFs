import 'dotenv/config';

export default {
  development: {
    username: process.env.DB_USUARIO,
    password: process.env.DB_SENHA,
    database: process.env.DB_NOME,
    host: "localhost",
    dialect: "mysql"
  }
};