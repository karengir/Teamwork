import articles from '../db/article';
import comments from '../db/comments';
//import verifyToken from '../middleware/tokenVerify';
import queries from '../db/queries';
import executeQuery from "../db/executeQuery";

class userController {


    static async addArticle(req, res) {

        const article = {
            title: req.body.title,
            article: req.body.article,
            createdOn: new Date().toDateString(),
            createdBy: req.user.email
        };
        const params = [article.title, article.article, article.createdOn, article.createdBy]

        const resu = await executeQuery.real(queries.articles.insert, params);
        console.log(resu);
        res.status(200).json({
            status: 200,
            message: 'article successfully created',
            data: article

        });
    }

    static async deleteArticle(req, res) {

        const id = parseInt(req.params.articleId, 10);
        const found = await executeQuery.real(queries.articles.findById, [id]);
        console.log(found);
        if (found.rowCount > 0) {
            if (found.rows[0].createdby === req.user.email) {
                // articles.splice(articles.indexOf(found), 1);
                await executeQuery.real(queries.articles.delete, [id]);
                return res.status(204).json({
                    status: 204,
                    message: 'article successfully deleted'
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: 'You can not delete an article that you didn\'t create'
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
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: 'You can not edit an article that you didn\'t create'
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
            // article to return with the new comment
            let article = found;
            article.comment = comment;
            res.status(200).json({
                status: 200,
                message: 'comment successfully added',
                data: article
            });
            console.log(articles);
            console.log(comments);
        }
    }

    static async getSingleArticle(req, res) {
        const id = parseInt(req.params.articleId, 10);
        const found = await executeQuery.real(queries.articles.findById, [id]);
        if (found.rowCount > 0) {
            res.status(200).json({
                status: 200,
                data: found.rows[0]
            });
        } else {
            res.status(404).json({
                status: 404,
                data: "article not found"
            });
        }
    }

    static async getArticles(req, res) {
        const found = await executeQuery.real(queries.articles.findAll)
        res.status(200).json({
            status: 200,
            data: found.rows
        });
    }


}

export default userController;