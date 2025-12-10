import { Op } from 'sequelize'
import { User, Book, UserBook } from "../models/association.js"

import { body, validationResult } from 'express-validator';



export const getBooks = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
        const offset = (page - 1) * limit
        const { title, author, genre } = req.query
        const where = {}
        if (title) {
            where.title = { [Op.like]: `%${title}%` }
        }
        if (author) {
            where.author = { [Op.like]: `%${author}%` }
        }
        if (genre) {
            where.genre = { [Op.like]: `%${genre}%` }
        }
        const { rows: books, count: total } = await Book.findAndCountAll({
            where,
            limit,
            offset,
            order: [['title', 'ASC']],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name'],
                    where: { id: req.user.id },
                    required: false,
                    through: {
                        attributes: ['status', 'favorite']
                    }
                }
            ]
        })
        const totalPages = Math.ceil(total / limit);

        return res.json({
            page,
            limit,
            total,
            totalPages,
            books,
        })
    } catch (err) {
        console.error("erro em getBooks", err)
        return res.status(500).json({ messsage: 'erro ao listar livros' })
    }
}

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido22' })
        }
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'livro n encontrado' })
        }
        return res.json(book)
    } catch (error) {
        console.error("erro em getbookbyid", error);
        return res.status(500).json({ message: 'erro ao buscar livro' })
    }
}

export const createBook = async (req, res) => {
    try {
        await body('title').notEmpty().withMessage('Título é obrigatorio').run(req)
        await body('author').notEmpty().withMessage('Autor é obrigatorio').run(req)
        await body('genre').notEmpty().withMessage('genero é obrigatorio').run(req)
        await body('year').isInt({ min: 0 }).withMessage("ano deve ser um numero válido").run(req)
        await body('synopsis').optional().isString().run(req)

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { title, author, genre, year, synopsis } = req.body;
        const newBook = await Book.create({
            title, author, genre, year, synopsis,
            createdBy: req.user.id
        })
        return res.status(201).json({
            message: 'livro criado com sucesso',
            book: newBook
        })
    } catch (error) {
        console.error("erro em createBook ", error);
        return res.status(500).json({ message: 'erro ao criar novo livro' })
    }
}


export const editBook = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        await body('title').optional().notEmpty().withMessage('Título é obrigatorio').run(req)
        await body('author').optional().notEmpty().withMessage('autor nao pode estar vazio').run(req)
        await body('genre').optional().notEmpty().withMessage('genero nao pode estar vazio').run(req)
        await body('year').optional().isInt({ min: 0 }).withMessage('ano deve ser um numero positivo').run(req)
        await body('synopsis').optional().isLength({ max: 5000 }).withMessage('sinopse muito loga').run(req)

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const book = await Book.findByPk(id)
        if (!book) {
            return res.status(403).json({ message: 'livro nao encontrado' })
        }
        const { title, author, genre, year, synopsis } = req.body

        await book.update({
            title: title ?? book.title,
            author: author ?? book.author,
            genre: genre ?? book.genre,
            year: year ?? book.year,
            synopsis: synopsis ?? book.synopsis
        })
        return res.status(200).json({
            message: 'livro atualizado com sucesso',
            book,
        })
    } catch (error) {
        console.error("erro em editbook", error)
        return res.status(500).json({ message: 'erro ao atualizar livro' })
    }
}


export const deleteBook = async (req, res) => {
    try {

        const { id } = req.params
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'esse livro n existe' })
        }
        const book = await Book.findByPk(id)
        if (!book) {
            return res.status(404).json({ message: 'livro não existe' })
        }
        await book.destroy()
        return res.status(200).json({ message: 'livro destruido com sucesso. ' })
    } catch (error) {
        console.error("erro no deletebook", error)
        return res.status(500).json({ message: 'erro ao deletar livro' })
    }
}

export const favoriteBook = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'parametro de livro errado' })
        }
        const book = await Book.findByPk(id)
        if (!book) {
            return res.status(404).json({ message: 'livro nao existe no banco de dados' })
        }
        let userBook = await UserBook.findOne({
            where: {
                user_id: req.user.id,
                book_id: id
            }
        })
        if (userBook) {
            userBook.favorite = !userBook.favorite
            await userBook.save()
        } else {
            userBook = await UserBook.create({
                user_id: req.user.id,
                book_id: id,
                favorite: true,
                status: "nenhum"
            })
        }
        return res.json({
            message: userBook.favorite ? 'Livro favoritado' : 'Livro desfavoritado',
            favorite: userBook.favorite
        })
    } catch (error) {
        console.error("erro no favoriteBook", error)
        return res.status(500).json({ message: 'erro ao atualizar favorito.' })
    }
}

export const bookStatus = async (req, res) => {
    try {
       
        const { id } = req.params
        const { status } = req.body
        if (!id || isNaN(id)) {
            return res.status(401).json({ message: 'erro de parametro' })
        }
        const validStatus = ['lido', 'lendo', 'quer ler', 'nenhum']
        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: 'status inválido' })
        }
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'livro nao encontrado' })
        }
        let userBookStatus = await UserBook.findOne({
            where: {
                user_id: req.user.id,
                book_id: id
            }
        })
        if (userBookStatus) {
            userBookStatus.status = status
            await userBookStatus.save()
        } else {
            userBookStatus = await UserBook.create({
                user_id: req.user.id,
                book_id: id,
                favorite: false,
                status: status
            })
        }
        const updatedBook = await Book.findByPk(id, {
            include: [{
                model: User,
                as: "Users",
                where: { id: req.user.id },
                through: {
                    attributes: ['status', 'favorite']
                },
                attributes: []
            }]
        })

        res.json(updatedBook)
    } catch (error) {
        console.error("erro no bookStatus", error)
        return res.status(500).json({ message: 'erro ao atualizar status' })
    }
}

export const getDashboard = async (req, res) => {
    try {
        const totalBooks = await UserBook.count({
            where: {
                user_id: req.user.id,
            }
        });
        const totalLidos = await UserBook.count({
            where: {
                user_id: req.user.id,
                status: 'lido'
            }
        });
        const totalLendo = await UserBook.count({
            where: {
                user_id: req.user.id,
                status: 'lendo'
            }
        });
        const totalQuerLer = await UserBook.count({
            where: {
                user_id: req.user.id,
                status: "quer ler"
            }
        })
        const totalFavoritos = await UserBook.count({
            where: {
                user_id: req.user.id,
                favorite: true
            }
        })
        res.json({
            totalBooks,
            totalLidos,
            totalLendo,
            totalQuerLer,
            totalFavoritos,
        })


    } catch (error) {
        console.error("erro no getdashboard", error);
        return res.status(500).json({ message: 'erro ao busca dados do dashboars' })
    }
}

export const getUserBooks = async (req, res) => {
    try {

        const user = req.user.id

        const userBooks = await UserBook.findAll({
            where: { user_id: user },
            include: [{ model: Book }]
        })

        res.json(userBooks)
    } catch (err) {
        console.error("erro no getuserbooks", err)
    }
}

export const removeUserBooks = async (req, res) => {
    try {
        const id = req.params.id
        const user = req.user.id
        const bookDeleted = await UserBook.destroy({
            where: { user_id: user, book_id: id }
        })
        if (!bookDeleted) return res.status(404).json({ message: 'livro não encontrado na estante' })
        return res.status(200).json({ message: 'livro deletado da estante com sucesso.' })
    } catch (err) {
        console.error("erro no removeUserBooks", err)
        return res.status(500).json({ message: 'erro ao deletar usuario' })
    }
}