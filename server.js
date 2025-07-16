import express from 'express';
import articlesRouter from './routes/articles.js' // Importando as rotas de artigos

const app = express();

app.set('view engine', 'ejs'); // Configurando o EJS como motor de visualização

app.use('/articles', articlesRouter); // Usando o router de artigos para rotas de artigos

// Rota principal
app.get('/', (req, res) =>{
    
    const articles = [{
        title: 'Test title',
        createdAt: new Date(),
        description: 'Test description',
    },
    {
        title: 'Test title 2',
        createdAt: new Date(),
        description: 'Test description 2',
    }];

    res.render('index', { articles })
});

app.listen(8081);