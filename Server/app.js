import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRouter from './routes/authRouter';
import articlesRouter from './routes/articlesRouter';
import routesDbAuth from '../Server/v2/routes/authRouter';
import routesDbArticles from '../Server/v2/routes/articlesRouter';


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/api/v1/articles', articlesRouter);
app.use('/api/v1/auth', authRouter);

app.use('/api/v2/articles', routesDbArticles);
app.use('/api/v2/auth', routesDbAuth);

app.get('/', (req,res)=>{
    res.status(200).json({
        status:200,
        message: 'Teamwork project'
    })
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

export default app;