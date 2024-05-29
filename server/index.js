import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './routes/auth.js'
import taskRoute from './routes/task.js'
dotenv.config()

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();


app.use('/api/v1/auth',authRoute)
app.use('/api/v1/task',taskRoute)


const port = process.env.PORT || 8050
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})