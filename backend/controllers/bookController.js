import { Op } from 'sequelize'
import Book from '../models/tableBook.js'
import UserBook from '../models/tableUserBook.js';
import { body, validationResult } from 'express-validator';
import User from '../models/tableUser.js';

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
            return res.status(400).json({ message: 'ID inválido22' })
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


export const editBook = async (req, res) => {
    try {
        //pegar id do livro
        const { id } = req.params

        // validar iD
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        //validar os campos recebidos para atualização dos livros
        await body('title').optional().notEmpty().withMessage('Título é obrigatorio').run(req)
        await body('author').optional().notEmpty().withMessage('autor nao pode estar vazio').run(req)
        await body('genre').optional().notEmpty().withMessage('genero nao pode estar vazio').run(req)
        await body('year').optional().isInt({ min: 0 }).withMessage('ano deve ser um numero positivo').run(req)
        await body('synopsis').optional().isLength({ max: 5000 }).withMessage('sinopse muito loga').run(req)

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // buscar o livro no banco

        const book = await Book.findByPk(id)
        if (!book) {
            return res.status(403).json({ message: 'livro nao encontrado' })
        }

        // pegar dados e atualizar
        const { title, author, genre, year, synopsis } = req.body

        await book.update({
            title: title ?? book.title,
            author: author ?? book.author,
            genre: genre ?? book.genre,
            year: year ?? book.year,
            synopsis: synopsis ?? book.synopsis
        })

        //retornar resposta pro banco
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
    try {// pegar o ID do livro
        const { id } = req.params

        // verificar se o livro realmente existe
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'esse livro n existe' })
        }

        //procurar livro no banco de dados
        const book = await Book.findByPk(id)
        if (!book) {
            return res.status(404).json({ message: 'livro não existe' })
        }

        // deletar livro do banco
        await book.destroy()

        return res.status(200).json({ message: 'livro destruido com sucesso. ' })
    } catch (error) {
        console.error("erro no deletebook", error)
        return res.status(500).json({ message: 'erro ao deletar livro' })
    }
}

export const favoriteBook = async (req, res) => {
    try {
        //pegar id do livro
        const { id } = req.params
        // conferir se id ta certo
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'parametro de livro errado' })
        }
        /// livro existe? 
        const book = await Book.findByPk(id)
        if (!book) {
            return res.status(404).json({ message: 'livro nao existe no banco de dados' })
        }
        //verificar se ja existe algum registro de favoritos para esse usuário e livro
        let userBook = await UserBook.findOne({
            where: {
                user_id: req.user.id,
                book_id: id
            }
        })

        // alterar status de favorito   
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

        //retorna a resposta

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
        // parametros
        const { id } = req.params
        const { status } = req.body

        // verificar se o livro realmente existe
        if (!id || isNaN(id)) {
            return res.status(401).json({ message: 'erro de parametro' })
        }

        //verificar status
        const validStatus = ['lido', 'lendo', 'quer ler', 'nenhum']
        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: 'status inválido' })
        }

        //achar o livro
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: 'livro nao encontrado' })
        }

        // verificar se o usuário ja tem um registro naquele livro

        let userBookStatus = await UserBook.findOne({
            where: {
                user_id: req.user.id,
                book_id: id
            }
        })

        // enviar status pro banco de dados
        if (userBookStatus) {
            userBookStatus.status = status
            await userBookStatus.save()
        } else {
            userBookStatus = await UserBook.create({
                user_id: req.params.id,
                book_id: id, 
                favorite: false,
                status: status
            })
        }

        res.json({
            message: 'status alterado com sucesso',
            status: book.status
        })

    } catch (error) {
        console.error("erro no bookStatus", error)
        return res.status(500).json({ message: 'erro ao atualizar status' })
    }
}

export const getDashboard = async (req, res) => {
    try {
        // pegando todos os dados da database
        const totalBooks = await Book.findAndCountAll({
            attributes: ['title'],
            order: [['title', 'DESC']]
        })

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

        // enviando o json na req
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