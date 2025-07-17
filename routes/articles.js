// Arquivo onde se encontra todas as rotas relacionadas a artigos
import express from 'express';
import Article from './../models/article.js'; // Importando o modelo de artigo

const router = express.Router(); // Utilizando o Router do Express para definir rotas específicas

router.get('/:id', (req, res) => {

})

router.get('/new', (req, res) => {
    res.render('articles/new'); 
});

router.post('/', async (req, res) => {
       
    const articles = [{
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    }];

    try{
        article = await Article.save();
        res.redirect('/articles/${article.id}');
    } catch (e){
        res.render('artiles/new', { articles: articles })
    };
});

export default router;