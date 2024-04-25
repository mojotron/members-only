import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
//
import connectDB from './db/connect';
import authRouter from './routes/auth';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use('/', authRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    console.log('> db connected');
    app.listen(PORT, () =>
      console.log(`> server running, http://localhost:${PORT}`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
