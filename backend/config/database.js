import { Sequelize } from "sequelize";

const sequelize = new Sequelize("biblioteca", "biblioteca", "Microsoftazure77", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

export default sequelize