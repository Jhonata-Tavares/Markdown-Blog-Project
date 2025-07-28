import express from 'express';
import mongoose from 'mongoose';
import articlesRouter from './routes/articles.js' // Importando as rotas de artigos
import Article from './models/article.js';

mongoose.connect('mongodb://localhost/blog')


const app = express();

app.set('view engine', 'ejs'); // Configurando o EJS como motor de visualização

app.use(express.urlencoded({ extended: false })); // Middleware para interpretar dados de formulários

// Rota principal
app.get('/', async (req, res) =>{
    const articles = await Article.find().sort({ createdAt: 'desc' }); // Buscando artigos do banco de dados em ordem decrescente.
    res.render('articles/index', { articles }) // Renderizando a view de artigos com os dados
});

app.use('/articles', articlesRouter); // Usando o router de artigos para rotas de artigos

app.listen(8081);