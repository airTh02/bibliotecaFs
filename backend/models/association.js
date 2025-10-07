import Book from "./tableBook.js";
import User from "./tableUser.js";
import UserBook from "./tableUserBook.js";



User.belongsToMany(Book, { through: UserBook, foreignKey: "user_id" });
Book.belongsToMany(User, { through: UserBook, foreignKey: "book_id" });
UserBook.belongsTo(User, { foreignKey: "user_id" });
UserBook.belongsTo(Book, { foreignKey: "book_id" });

export { User, Book, UserBook }