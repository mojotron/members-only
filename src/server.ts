import "dotenv/config";
import url from "node:url";
import path from "node:path";
import express from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
//
import connectionPool from "./db/pool.js";
import router from "./routes/routes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";
import strategy from "./config/passportConfig.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;
const app = express();
// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// session setup
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
const databaseStore = new (connectPgSimple(session))({
  pool: connectionPool,
  tableName: "session",
});
app.use(
  session({
    store: databaseStore,
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 7,
    },
  })
);
// init passport, passport config is in config folder
passport.use(strategy);
app.use(passport.session());
// routes
app.use(router);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server running on port ${port}`));
