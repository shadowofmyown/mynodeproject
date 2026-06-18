import { Environment } from "./environment";
import * as dotenv from "dotenv";
dotenv.config();
export const DevEnvironment: Environment = {
    db_uri: "mongodb://127.0.0.1:27017/test",
    jwt_secret_key: "secreat_Key_1234",
    sendgrid: {
        api_key: process.env.SENDGRID_API_KEY,
        email_from: "nishanto1993@gmail.com",
    },
    //not using below code for now
    //   gmail_auth: {
    //     user: "your_gmail_email_id",
    //     pass: "your_gmail_password",
    //   },
};
