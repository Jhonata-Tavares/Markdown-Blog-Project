// Arquivo onde se encontra todas as rotas relacionadas a artigos
import express from 'express';
import Article from './../models/article.js'; // Importando o modelo de artigo

const router = express.Router(); // Utilizando o Router do Express para definir rotas específicas

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() }); 
});

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', { article: article }); 
});

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug}); // Buscando o artigo pelo slug fornecido na URL
    if (article == null) return res.redirect('/');
    res.render('articles/show', { article: article });
});

router.post('/', async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect('new'));

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect('edit'));

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

function saveArticleAndRedirect(path){
    return async (req, res) => {
               
    let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
    try {
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    } catch (e) {
        res.render(`articles/${path}`, { article: article });
    }
    }
}

export default router;