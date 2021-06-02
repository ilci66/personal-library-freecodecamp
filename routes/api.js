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
      if(req.params.id){
        res.json(req.params.id)
        return;
      }
      Book.find({}, (err, data) => {
        let responseObject = {};
        res.json(data)
        return;
      })

    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if(!title){
        res.send("missing required field title")
        return;
      }

      if(title){
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
                return;
              }
            })
          }else if(data){
            res.json({_id:data._id, title:data.title})
            return;
          }
        })
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      if(bookid){
        Book.findOne({_id: bookid}, (err, data) => {
          if(err || !data){
            res.send("no book exists")
            return;
          }else{
            res.json(data)
            return;
          }
        })
      }
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if(!comment || !bookid){
        res.send('missing required field comment')
        return;
      }
      Book.findOne({_id: bookid}, (err, data) => {
        if(err || !data){
          res.send("no book exists")
          return;
        }else{
          let newComment = new Comment({comment:comment})
          data.commentcount = data.commentcount + 1;
          data.comments.push(newComment)
          data.save((err, newData) => {
            if(!err){
              res.json(newData)
              return;
            }
          })
        }
      })

    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
