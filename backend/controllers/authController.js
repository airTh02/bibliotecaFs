import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {User} from '../models/association.js'

export const registerUser = async (req, res) => {
    await body('name').notEmpty().withMessage('Nome é obrigatório').run(req)
    await body('email').isEmail().withMessage('Email inválido').run(req)
    await body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres').run(req)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body

    try {
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: 'Email já cadastrado' })
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            name,
            email,
            password: passwordHash,
            role: "user"
        })
        const token = jwt.sign(
            { id: newUser.id, name: newUser.name, email: newUser.email },
            process.env.JWT_KEY,
            { expiresIn: "10h" }
        );

        res.status(201).json({
            message: 'usuário criado',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
        
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'erro ao criar o usuário' })
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'usuário nao encontrado' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'senha incorreta' })
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "2h" }
        );
        res.status(200).json({
            message: "Login realizado com sucesso",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'erro no servidor' })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'role']
        })

        if (!user) {
            return res.status(404).json({ message: 'usuário nao encontrado' })
        }

        res.json({ user })
    } catch (error) {
        res.status(500).json({ message: 'erro no servidor' })
    }
}