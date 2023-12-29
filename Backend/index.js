import "dotenv/config";
import "./database/connection.js";
import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import formRoute from './routes/form.route.js';
import imagesRoute from './routes/file.route.js';
import getFormRoute from './routes/getform.route.js';
import cookieParser from "cookie-parser";
const app = express();
const corsOptions = {
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true, 
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/users",authRoute);
app.use("/api/v1/form",formRoute);
app.use("/api/v1/images",imagesRoute);
app.use("/api/v1/getform",getFormRoute);
const PORT = process.env.PORT;
app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));

