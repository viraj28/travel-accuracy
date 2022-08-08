const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.json());
app.use('/uploads', express.static('backend/uploads'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/packages', require('./routes/packageRoutes'));

app.use(errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));
