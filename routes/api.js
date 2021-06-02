/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const mongoose = require('mongoose');
const {Comment} = require('../models.js');
const {Book} = require('../models.js');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if(!title){
        res.send("missing required field title")
        return;
      }
      console.log(title)
      Book.findOne({title:title}, (err, data) => {
        if(err) {
          res.json({error:"an error occured"})
        }else if(!data){
          let newBook = new Book({
            title: title
          })
          newBook.save((err, data)=> {
            if(!err){
              res.json({_id:newBook._id, title:newBook.title})
            }
          })
        }else if(data){
          res.json({_id:data._id, title:data.title})
        }
      })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
