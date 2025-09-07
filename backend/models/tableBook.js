import { DataTypes } from "sequelize";
import sequelize from '../config/database.js'


const Book = sequelize.define("Book", {

    title: { 
        type: DataTypes.STRING(255),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    year:  {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "books",
    timestamps: true,
    underscored: true
})

export default Book;