
import express from 'express';
import {loginUser, registerUser} from '../controllers/authController.js'
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// rotas post. login, registro

router.post('/register', registerUser)
router.post('/login', loginUser)


// rota protegida

router.get('/me', auth, (req, res) => {
    res.json({
        message: 'você está autenticado',
        user: req.user
    })
})

export default router