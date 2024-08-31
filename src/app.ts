import dotenv from "dotenv";
import express from "express";
import log from "./api/v1/logger";
import routes from "./api/v1/routes";
import dbconfig from "./config/db.config";
import { deserializeUser } from "./api/v1/middlewares";

dotenv.config();

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
    log.info("Server Started....");
    dbconfig();
    routes(app);
});
