import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js'


const app = express()
const port = 5000

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json())


app.use('/auth', authRoutes);
app.use('/books', bookRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
