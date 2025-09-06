import { Sequelize } from "sequelize";

const sequelize = new Sequelize("biblioteca", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

export default sequelize