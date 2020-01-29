
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();

// Connect to MongoDB
const mongoUrl = process.env.pathDb;
console.log(mongoUrl);
mongoose.connect(mongoUrl, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true 
    }).catch(err => {
        console.log('MongoDB connection error: ' + err);
 });

// Express configuration
app.set('port', process.env.PORT || 3002);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);
app.use('/', (req, res) => {
    res.send('Core is up!');
});

export default app;