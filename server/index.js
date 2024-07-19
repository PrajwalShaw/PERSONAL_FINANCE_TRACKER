//PWD : Fh9IFwRIGJqoaBgj
//USERNAME : prajwalshaw1709
//this is basically our app.js file

import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import financialRecordRouter from "./routes/financial-records.js";
import cors from "cors";

const app = express();//created an instance

dotenv.config({path : "./config/config.env"});

app.use(cors());

app.use(express.json());//sirf json data ko parse karta hain
app.use(express.urlencoded({extended: true}));//string ko json format main convert kar deta hain

app.use('/financial-records' , financialRecordRouter);


dbConnection();

export default app;
