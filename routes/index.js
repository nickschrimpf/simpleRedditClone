var env = require('dotenv')
var express = require('express');
var router = express.Router();
// var db = require('monk')('PROCESS.ENV.database');
var db = require('monk')('mongodb://redditclone:redditclone@ds023000.mlab.com:23000/simpleredditclone');
// var db = require('monk')('localhost/redditClone');

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
        date:req.body.date,
        comments:[]
    }).then(function(post){
        res.end
    })
    
})

router.post('/upvote/', function(req,res){
    posts.findOne({_id:req.body.id}).then (function(doc){
        posts.update({_id:doc._id},{$set:{votes:req.body.votes}})
        res.end
    })
})
router.post('/downvote/', function(req,res){
    posts.findOne({_id:req.body.id}).then (function(doc){
        posts.update({_id:doc._id},{$set:{votes:req.body.votes}})
        res.end
    })
})
router.post('/addcomment/', function(req,res){
    posts.findOne({_id:req.body.id}). then (function(doc){
         doc.comments.push(req.body)
         posts.update({_id:doc._id},{$set:{comments:doc.comments}})
        res.end
    })
})

module.exports = router;
