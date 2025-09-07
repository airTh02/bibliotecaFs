import { Op } from 'sequelize'
import Book from '../models/tableBook.js'
import { body, validationResult } from 'express-validator';

export const getBooks = async (req, res) => {
    try {

        // pegar os parametros da query e normalizar
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);

        // offset para qntas páginas pular
        const offset = (page - 1) * limit

        // pegar possiveis filtros vindo da query
        const { title, author, genre } = req.query

        // montar where, começa vazio e só adicionamos propriedades se o filtro existir
        const where = {}

        // filtro com texto parcial, usamos LIKE com %term%
        if (title) {
            where.title = { [Op.like]: `%${title}%` }
        }
        if (author) {
            where.author = { [Op.like]: `%${author}%` }
        }
        if (genre) {
            where.genre = { [Op.like]: `%${genre}%` }
        }

        // busca no banco de dados com paginação
        const { rows: books, count: total } = await Book.findAndCountAll({
            where,
            limit,
            offset,
            order: [['title', 'ASC']]
        })

        // calcular total de páginas e montar resposta

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
        // pega id da url
        const { id } = req.params

        // validar ID 
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' })
        }

        // buscar livro no banco usando orm, sequelize. Findbypk = find by primary key
        const book = await Book.findByPk(id);

        // verificar se o livro existe
        if (!book) {
            return res.status(404).json({ message: 'livro n encontrado' })
        }

        // se existir, ele retorna os dados

        return res.json(book)
    } catch (error) {
        console.error("erro em getbookbyid", error);
        return res.status(500).json({ message: 'erro ao buscar livro' })
    }
}

export const createBook = async (req, res) => {
    try {
        // validar campos
        await body('title').notEmpty().withMessage('Título é obrigatorio').run(req)
        await body('author').notEmpty().withMessage('Autor é obrigatorio').run(req)
        await body('genre').notEmpty().withMessage('genero é obrigatorio').run(req)
        await body('year').isInt({ min: 0 }).withMessage("ano deve ser um numero válido").run(req)
        await body('synopsis').optional().isString().run(req)

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // pegar os dados do body
        const { title, author, genre, year, synopsis } = req.body;

        // criar livro no banco - orm sequelize
        const newBook = await Book.create({
            title, author, genre, year, synopsis,
            createdBy: req.user.id
        })

        // retornar se tudo deu certo

        return res.status(201).json({
            message: 'livro criado com sucesso',
            book: newBook
        })
    } catch (error) {
        console.error("erro em createBook ", error);
        return res.status(500).json({ message: 'erro ao criar novo livro' })
    }
}
