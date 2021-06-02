const mongoose = require('mongoose');
const { Schema } = mongoose;



const commentSchema = new Schema({
  comment: String
})

const Comment = mongoose.model('Comment', commentSchema)

const bookSchema = new Schema({
  title: {type: String, required: true},
  comments: [commentSchema]
})

const Book = mongoose.model('Book', bookSchema)

exports.Comment = Comment;
exports.Book = Book;