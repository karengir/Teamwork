import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRouter from './routes/authRouter';
import articlesRouter from './routes/articlesRouter';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/api/v1/articles', articlesRouter);
app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});