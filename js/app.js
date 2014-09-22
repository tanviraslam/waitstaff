var app = angular.module('app',['ngRoute']);

//Routes
app.config(function($routeProvider){
  $routeProvider
        .when('/', {
          templateUrl: 'home.html',
          controller: 'HomeController'
        })
        .when('/new-meal', {
          templateUrl: 'new-meal.html',
          controller : 'NewMealController'
        }).
        when('/my-earnings', {
          templateUrl: 'earnings.html',
          controller  : 'EarningsController'
        });
});

//Controllers
app
.controller('HomeController', function(){

})
.controller('NewMealController', function(){

})
.controller('EarningsController', function(){
  
});
