const mongoose = require('mongoose');

const db = mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false 
});

module.exports = db;