const mongoose = require('mongoose');

const astrologerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isTop: { type: Boolean, default: false },
  currentFlow: { type: Number, default: 0 },
});

module.exports = mongoose.model('Astrologer', astrologerSchema);
