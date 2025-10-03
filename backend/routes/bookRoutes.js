import express from 'express'
import { createBook, getBookById, getBooks, editBook, deleteBook, favoriteBook, bookStatus, getDashboard } from '../controllers/bookController.js'
import { auth } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router()


router.get('/dashboard', auth, getDashboard)
router.get('/', auth, getBooks)
router.get('/:id', getBookById)


router.post('/', auth, isAdmin, createBook) //isAdmin
router.post('/:id/favorite', auth, favoriteBook)

router.put('/:id', auth, isAdmin, editBook) //isAdmin
router.patch('/:id/status', auth, bookStatus)


router.delete('/:id', auth, deleteBook) //isAdmin



export default router
