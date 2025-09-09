import express from 'express'
import { createBook, getBookById, getBooks, editBook, deleteBook, favoriteBook } from '../controllers/bookController.js'
import { auth } from '../middlewares/auth.js';

const router = express.Router()

router.get('/', getBooks)
router.get('/:id', getBookById)

router.post('/', auth, createBook)
router.post('/:id/favorite', auth, favoriteBook)

router.put('/:id', auth, editBook)

router.delete('/:id', auth, deleteBook)

export default router
