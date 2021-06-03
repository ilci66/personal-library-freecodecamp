/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const mongoose = require('mongoose');
// const {Comment} = require('../models.js');
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
        }else{
          res.json(data)
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      console.log('comment', comment)
      if(!comment){
        res.send('missing required field comment')
        return;
      }
      Book.findById(bookid, (err, data) => {
        if(!data){
          console.log('no such book')
          res.send('no book exists')
        }else{
          console.log(data)
          data.comments.push(comment);
          // data.commentcount = data.commentcount + 1;
          data.save((err, newData) => {
            // let responseObject = {};
            // res.json(responseObject)
            res.json({
              comments: newData.comments,
              _id: newData._id,
              commentcount: newData.comments.length,
              title: newData.title
            })
          })
        }
      })  
     })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      Book.findOneAndRemove({_id: bookid}, (err, data) => {
        if(!data){
          res.send('no book exists')
        }else{
          res.send('delete successful')
        }
      })
    });
  
};
