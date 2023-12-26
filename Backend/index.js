import "dotenv/config"
import "./database/connection.js"
import express from 'express'
import authRoute from './routes/auth.route.js'
import cors from 'cors'
import cookieParser from "cookie-parser"
import formRoute from './routes/form.route.js'
import imagesRoute from './routes/file.route.js'

const app = express();

const corsOptions = {
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200','http://192.168.1.2:4200'],
    credentials: true, 
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/users",authRoute);
app.use("/api/v1/form",formRoute);
app.use("/api/v1/images",imagesRoute);



const PORT = process.env.PORT;
app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));

