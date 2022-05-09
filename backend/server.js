import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoDB from './config/mongodb';

const app = express();

// Connect to MongoDB
mongoDB();

// Use Cross-Origin-Resource-Sharing & JSON parser
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
