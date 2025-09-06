import sequelize from "./database/config.js";
import User from "./models/tableUser.js";
import Book from "./models/tableBook.js";
import UserBook from "./models/tableUserBook.js";

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado ao MySQL com Sequelize");

        await sequelize.sync({ force: true });
        console.log("Tabelas criadas");

        process.exit();
    } catch (err) {
        console.error("Erro ao criar tabelas", err);
    }
};

syncDatabase();