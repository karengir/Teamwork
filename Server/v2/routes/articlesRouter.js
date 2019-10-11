import Router from 'express';
import articlesController from '../controlers/articlesController';
//import articles from '../db/article';
import tokenVerification from '../middleware/tokenVerify';

const router = Router();

router.post('/', tokenVerification, articlesController.addArticle);

router.delete('/:articleId', tokenVerification, (req, res) => {
    articlesController.deleteArticle(req, res);
});

router.patch("/:articleId", tokenVerification, (req, res) => {
    articlesController.updateArticle(req, res);
})

router.post('/:articleId/comments', tokenVerification, (req, res) => {
    articlesController.addComment(req, res);
});

router.get('/feeds', tokenVerification, (req, res) => {
    articlesController.getArticles(req, res);
});
router.get('/:articleId', tokenVerification, (req, res) => {
    articlesController.getSingleArticle(req, res);
});


export default router;

