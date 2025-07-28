// Arquivo onde se encontra todas as rotas relacionadas a artigos
import express from 'express';
import Article from './../models/article.js'; // Importando o modelo de artigo

const router = express.Router(); // Utilizando o Router do Express para definir rotas específicas

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() }); 
});

router.get('/edit', (req, res) => {
    res.render('articles/new', { article: new Article() }); 
});


router.get('/:slug', async (req, res) => {

    const article = await Article.findOne({ slug: req.params.slug}); // Buscando o artigo pelo slug fornecido na URL
    if (article == null) return res.redirect('/');
    res.render('articles/show', { article: article });
});

router.post('/', async (req, res) => {
       
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });

    try {
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    } catch (e) {
        console.log(e);
        res.render('articles/new', { article: article });
    }
});

router.delete('/:id', async (req, res) => {
    await article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

export default router;