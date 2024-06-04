import express from 'express';
const app = express();
const port = 3000;
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import Routes from './routes/routes';
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: 'session-id',
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false,
    cookie: { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 0.5 }
}))

const routes = new Routes();
routes.applyRouting(app);

app.listen(port, () => {console.log(`Listening on port ${port}`)});