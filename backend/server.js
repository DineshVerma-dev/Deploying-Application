

import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config(
 {
     path: "./.env"
 }
);

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to FileTransferHub backend');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});
