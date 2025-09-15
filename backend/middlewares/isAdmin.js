export const isAdmin = (req, res, next) => {
    if(!req.user) {
        return res.status(401).json({message: 'Usuário não autenticado'})
    }

    if(req.user.role !== 'admin') {
        return res.status(403).json({message: 'acesso negado, apenas admin pode executar essa ação'})
    }

    next()
}