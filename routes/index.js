var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/redditClone');

var posts = db.get('posts');
var comments = db.get('comments');

router.get('/posts/', function (req, res){
    posts.find({}).then (function (doc){
        res.json(doc)
    })
})

router.post('/addpost/', function (req, res){
    posts.insert({
        title:req.body.title,
        author:req.body.author,
        url:req.body.url,
        description:req.body.description,
        votes:req.body.votes,
        date:req.body.date
    }).then(function(post){
        console.log(post)
    })
    
})

module.exports = router;
