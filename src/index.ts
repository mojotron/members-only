import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import connectDB from './db/connect';
import routes from './routes/index';
import notFoundMiddleware from './middleware/notFound';
import errorHandlerMiddleware from './middleware/errorHandler';
import './utils/authStrategy';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// session and auth strategy
app.use(
  session({
    secret: process.env.SECRET as string,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 360000 * 24,
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());
// routes
app.use(routes);
// middleware for page not found and error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    console.log('> db connected');
    app.listen(PORT, () =>
      console.log(`> server running (http://localhost:${PORT})`),
    );
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

start();
