import Router from 'express';
import articlesController from '../controlers/articlesController';
import articles from '../db/article';


const router = Router();

router.post('/', articlesController.addArticle);

router.delete('/:articleId', (req, res) => {
    articlesController.deleteArticle(req, res);
});

router.patch("/:articleId", (req, res) => {
    articlesController.updateArticle(req, res);
})

router.post('/:articleId/comments', (req, res) => {
   articlesController.addComment(req,res);
});



export default router;

