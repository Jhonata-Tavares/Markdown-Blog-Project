// Arquivo onde se encontra todas as rotas relacionadas a artigos
import express from 'express';
const router = express.Router(); // Utilizando o Router do Express para definir rotas específicas

router.get('/test', (req, res) => {
    res.send('Na rota de artigos')
});

export default router;