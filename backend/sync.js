import sequelize from "./config/database.js";
import './models/association.js'


const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado ao MySQL com Sequelize");

        await sequelize.sync();
        console.log("Tabelas criadas");

        process.exit();
    } catch (err) {
        console.error("Erro ao criar tabelas", err);
    }
};

syncDatabase();