import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express()
const port = 3000

// middlewares
app.use(cors())
app.use(express.json())

// importar as rotas

app.use('/auth', authRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
