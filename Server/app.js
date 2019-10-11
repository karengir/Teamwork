import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRouter from './routes/authRouter';
import articlesRouter from './routes/articlesRouter';
// import queries from './db/queries';
// import executeQuery from './db/executeQuery';



dotenv.config();


const app = express();
const port = process.env.PORT;
// executeQuery.real(queries.users.createTable)
// executeQuery.real(queries.articles.createTable);

// executeQuery.test(queries.users.createTable);
// executeQuery.test(queries.articles.createTable);

app.use(bodyParser.json());
app.use('/api/v1/articles', articlesRouter);
app.use('/api/v1/auth', authRouter);

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