const ArticleController = require('../controllers/article.controller');

module.exports = (app) => {
    app.get('/api/articles', ArticleController.getAllArticles);
    app.post('/api/articles', ArticleController.createArticle);
    app.get('/api/articles/:id', ArticleController.getOneArticle);
    app.put('/api/articles/:id', ArticleController.updateArticle);
    app.delete('/api/articles/:id', ArticleController.deleteArticle);
};
