import articles from '../db/article';
import comments from '../db/comments';
//import verifyToken from '../middleware/tokenVerify';

class userController {


    static addArticle(req, res) {

        const article = {
            id: articles.length + 1,
            title: req.body.title,
            article: req.body.article,
            createdOn: new Date().toDateString(),
            createdBy: req.user.id
        };
        console.log(article);

        articles.push(article);
        res.status(200).json({
            status: 200,
            message: 'article successfully created',
            data: article

        });
    }

    static deleteArticle(req, res) {

        const id = parseInt(req.params.articleId, 10);
        const found = articles.find(a => a.id === id);
        if (found) {
            if (found.createdBy === req.user.id) {
                articles.splice(articles.indexOf(found), 1);
                return res.status(204).json({
                    status: 204,
                    message: 'article successfully deleted'
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: 'You cannot delete an article that you did not create'
                });
            }
        } else {
            return res.status(404).json({
                status: 404,
                error: 'No article found with the given id'
            });
        }
    }

    static updateArticle(req, res) {
        const id = parseInt(req.params.articleId, 10);
        const found = articles.find(a => a.id === id);
        
        const article = {
            title: req.body.title,
            article: req.body.article
        };

        if (found) {
            if (found.createdBy === req.user.id) {
            articles.splice(articles.indexOf(found), 0, article)
            return res.status(200).json({
                status: 200,
                message: 'article successfully edited',
                data: article
            }) } else {
                return res.status(400).json({
                    status: 400,
                    message: 'You cannot edit an article that you did not create'
                });
            }
        } else {
            res.status(400).json({
                status: 400,
                message: 'article not found'
            })
        }
    }

    static addComment(req, res) {
        const id = parseInt(req.params.articleId, 10)
        const found = articles.find(a => a.id === id)


        if (found) {
            const comment = {
                id: comments.length + 1,
                comment: req.body.comment,
                articleId: id
            };
            comments.push(comment);
            let article = found;
            article.comment = comment;
            res.status(200).json({
                status: 200,
                message: 'comment successfully added',
                data: article
            });
           
        }
    }

    static getSingleArticle(req, res) {
        const id = parseInt(req.params.articleId, 10);
        const found = articles.find(a => a.id === id);

        if (found) {
            res.status(200).json({
                status: 200,
                data: found
            });
        }else{
            res.status(404).json({
                status: 404,
                data: "article not found"
            });
        }
    }

    static getArticles(req, res) {
        res.status(200).json({
            status:200,
            data:articles
        });
    }


}

export default userController;