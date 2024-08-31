import dotenv from "dotenv";
import mongoose from "mongoose";
import log from "../api/v1/logger";

dotenv.config();

export default function dbconfig(){
    return mongoose.connect(
        'mongodb://'+process.env.DB_USER+':'+encodeURIComponent(`${process.env.DB_PASS}`)+'@'+process.env.DBURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    ).then(() => {
        log.info("Database Connected");
    }).catch((error) => {
        log.error("db error", error);
        process.exit(1);
    });
}
