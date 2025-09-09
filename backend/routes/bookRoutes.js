import express from 'express'
import { createBook, getBookById, getBooks, editBook, deleteBook, favoriteBook, bookStatus, getDashboard } from '../controllers/bookController.js'
import { auth } from '../middlewares/auth.js';

const router = express.Router()


router.get('/dashboard', auth, getDashboard)
router.get('/', getBooks)
router.get('/:id', getBookById)


router.post('/', auth, createBook)
router.post('/:id/favorite', auth, favoriteBook)

router.put('/:id', auth, editBook)
router.patch('/:id/status', auth, bookStatus)


router.delete('/:id', auth, deleteBook)



export default router
