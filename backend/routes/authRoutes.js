
import express from 'express';
import {getUser, loginUser, registerUser} from '../controllers/authController.js'
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// rotas post. login, registro

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/me', auth, getUser)
// rota protegida



export default router