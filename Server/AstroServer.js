const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const astrologerRoutes = require('./routes/astrologer');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/astrologers', astrologerRoutes);

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
