const mongoose = require('mongoose');

const { Schema } = mongoose;

const List = new Schema({
  title: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

module.exports = mongoose.model('Lists', List);
