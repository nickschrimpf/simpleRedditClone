angular.module('redditClone')
.controller('post', function($scope, $http, $moment, $route){

    $http.get('/posts/').then (function(response){
        $scope.posts = response.data
        console.log($scope.posts)
    })
            
        $scope.submit = function(){
        $scope.toggleForm = !$scope.toggleForm

        $http({
                method: 'post',
                url: '/addpost/',
                data:{
                    title:this.title,
                    author:this.author,
                    url:this.url,
                    description:this.description,
                    votes:0,
                    comments:[],
                    date: new Date()
                    }
            })

        $scope.posts.push({
            title:this.title,
            author:this.author,
            url:this.url,
            description:this.description,
            votes:0,
            });
        

        };

        $scope.upVote = function (id){
            this.post.votes++;
            
            $http({
                method:'post',
                url: '/upvote/',
                data:{id:id ,votes:this.post.votes}
            })
            
        }
        $scope.downVote = function (id){
           
            this.post.votes--;
            $http({
                method:'post',
                url: '/downvote/',
                data:{id:id ,votes:this.post.votes}
            })
        }
        $scope.submitComment = function(id){
            console.log(id)
            this.toggleComment=!this.toggleComment;

            $http({
                method:'post',
                url: '/addcomment/',
                data:{id:id ,comment:this.comment,commentAuthor:this.commentAuthor,date:new Date()}
            })
            $route.reload()
        }
    });
        