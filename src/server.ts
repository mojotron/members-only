import "dotenv/config";
import url from "node:url";
import path from "node:path";
import express from "express";
//
import router from "./routes/routes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;
const app = express();
// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
// routes
app.use(router);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server running on port ${port}`));
