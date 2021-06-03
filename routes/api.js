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
      if(req.params.id){
        res.json(req.params.id)
        return;
      }
      Book.find({}, (err, data) => {
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
      Book.deleteMany({}, (err, data) => {
        if(!err){
          res.send('complete delete successful')
          return;
        }
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      Book.findOne({_id: bookid}, (err, data) => {
        if(err || !data){
          res.send("no book exists")
          return;
        }else{
          res.json(data)
          return;
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      //You can send a POST request containing comment as the form body data to /api/books/{_id} to add a comment to a book. The returned response will be the books object similar to GET /api/books/{_id} request in an earlier test. If comment is not included in the request, return the string missing required field comment. If no book is found, return the string no book exists.
      
     })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      Book.findOneAndRemove({_id: bookid}, (err, data) => {
        if(!data){
          res.send('no book exists')
          return;
        }else{
          res.send('delete successful')
          return;
        }
      })
    });
  
};
