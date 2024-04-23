import path from 'path';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
//
import connectDB from './db/connect';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app: Express = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    console.log('db connected...');
    app.listen(PORT, () => console.log(`server listening at port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
