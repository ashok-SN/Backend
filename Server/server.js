const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('../routes/auth');
const queueRoutes = require('./routes/queue');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/queue', queueRoutes);

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
