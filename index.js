const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');

// Connect to MongoDB
connectDB();

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/', userRoutes);
app.use('/event', eventRoutes);
app.use('/accommodation', accommodationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
