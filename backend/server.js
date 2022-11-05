const express = require('express');
const cors = require('cors');
const colors = require('colors');
const path = require('path');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('backend/uploads'));
app.use(express.urlencoded({ extended: true }));

app.get('/logo', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploads/logo.png'));
});

app.use('/api/inquire', require('./routes/inquiryRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/otp', require('./routes/otpRoutes'));
app.use('/api/mail', require('./routes/mailRoutes'));
app.use('/api/razorpay', require('./routes/paymentRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
