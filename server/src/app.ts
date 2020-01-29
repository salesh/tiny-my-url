
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import * as dotenv from 'dotenv';
import router from './routes';
import logger from './utils/logger';

dotenv.config();

const app = express();

// Connect to MongoDB
const mongoUrl = process.env.pathDb;
mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        logger.info(`MongoDB is up on: ${mongoUrl}`);
    }).catch(err => {
        logger.error(` ❌  MongoDB connection error: ${err}`);
 });

// Express configuration
app.set('port', process.env.PORT || 3002);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

export default app;