import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/tableUser.js';

// função para lidar com o metodo POST /register

export const registerUser = async (req, res) => {

    // validar dados
    await body('name').notEmpty().withMessage('Nome é obrigatório').run(req)
    await body('email').isEmail().withMessage('Email inválido').run(req)
    await body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres').run(req)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body

    try {

        // verificar se email já existe
        const existingUser = await User.findOne({where: {email}})
        if(existingUser) {
            return res.status(400).json({message: 'Email já cadastrado'})
        }

        // criptografar a senha
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // criar usuario no banco de dados
        const newUser = await User.create({
            name,
            email,
            password: passwordHash
        })

        res.status(201).json({
            message: 'usuário criado',
            userId: newUser.id
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'erro ao criar o usuário'})
    }
}

