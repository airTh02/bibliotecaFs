import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
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
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: 'Email já cadastrado' })
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
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'erro ao criar o usuário' })
    }
}


// função para o login da biblioteca /auth/login

export const loginUser = async (req, res) => {
    try {
        // pegar o email e a senha da requisição
        const { email, password } = req.body;

        // verificação se existe tal usuario
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'usuário nao encontrado' })
        }

        // comparar a senha enviada com o hash salvo no banco de dados
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'senha incorreta' })
        }

        // gera um token jwt com id e email
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_KEY,
            { expiresIn: "2h" }
        );

        // retorno da resposta jwt
        res.status(200).json({
            message: "Login realizado com sucesso",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'erro no servidor' })
    }
}
