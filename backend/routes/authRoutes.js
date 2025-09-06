
import express from 'express';
import {loginUser, registerUser} from '../controllers/authController.js'

const router = express.Router();

// rotas post. login, registro

router.post('/register', registerUser)
router.post('/login', loginUser)

export default router