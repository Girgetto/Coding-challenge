const mongoose = require('mongoose');

const { Schema } = mongoose;

const ListItem = new Schema({
  list: { type: Schema.Types.ObjectId, ref: 'Lists' }, // TODO questo deve essere una array
  text: String,
  done: { type: Boolean, default: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

module.exports = mongoose.model('ListItems', ListItem);
