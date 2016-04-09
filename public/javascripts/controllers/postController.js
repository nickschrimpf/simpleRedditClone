angular.module('redditClone')
.controller('post', function($scope, $http, $moment){

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

        $scope.upVote = function (){
            this.post.votes++;
        }
        $scope.downVote = function (){
            this.post.votes--;
        }
    });