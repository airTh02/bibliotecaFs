import express from 'express'
import { createBook, getBookById, getBooks } from '../controllers/bookController.js'
import { auth } from '../middlewares/auth.js';

const router = express.Router()

router.get('/', getBooks)
router.get('/:id', getBookById)
router.post('/', auth, createBook)

export default router
