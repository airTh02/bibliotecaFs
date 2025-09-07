import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    // verificar se o header veio com autorização
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: 'token não fornecido' })
    }

    // verificar o formato esperado do token
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return res.status(401).json({ message: 'token mal formatado' })
    }

    const [scheme, token] = parts

    // verifica se o token começa com Bearer
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'token mal formatado' })
    }

    // verifica o token usando a chave secreta
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).json({message: 'token invalido ou expirado'})
        }

        // se o token for valido, ele salva os dados do usuário no req.user
        req.user = decoded;

        // chama o proximo middleware/controller

        next();

    })
}