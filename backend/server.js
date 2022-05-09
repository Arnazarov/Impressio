import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoDB from './config/mongodb.js';
import colors from 'colors';
import postRoutes from './routes/postRoutes.js';

// Connect to MongoDB
mongoDB();

const app = express();

// Cross-Origin-Resource-Sharing & JSON parser
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold);
})
