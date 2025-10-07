import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Book from "./tableBook.js";
import User from "./tableUser.js";


const UserBook = sequelize.define("UserBook", {
    status: {
        type: DataTypes.ENUM("lido", "lendo", "quer ler", "nenhum"),
        allowNull: false
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
    {
        tableName: "user_books",
        timestamps: true,
        underscored: true
    })




export default UserBook;