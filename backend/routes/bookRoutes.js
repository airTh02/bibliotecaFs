import express from 'express'
import { createBook, getBookById, getBooks, editBook, deleteBook, favoriteBook, bookStatus, getDashboard, getUserBooks, removeUserBooks } from '../controllers/bookController.js'
import { auth } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router()


router.get('/dashboard', auth, getDashboard)
router.get('/', auth, getBooks)
router.get('/userbooks', auth, getUserBooks) 
router.get('/:id', getBookById)


router.post('/', auth, isAdmin, createBook) 
router.post('/:id/favorite', auth, favoriteBook)


router.put('/:id', auth, isAdmin, editBook) 
router.patch('/:id/status', auth, bookStatus)


router.delete('/user/:id', auth, removeUserBooks)
router.delete('/:id', isAdmin, deleteBook) 



export default router
