const mongoose = require('mongoose');
const { Schema } = mongoose;



const commentSchema = new Schema({
  comment: String
})

const Comment = mongoose.model('Comment', commentSchema)

const bookSchema = new Schema({
  comments: [commentSchema],
  commentcount: {type: Number, default:0},
  title: {type: String, required: true}
})

const Book = mongoose.model('Book', bookSchema)

exports.Comment = Comment;
exports.Book = Book;