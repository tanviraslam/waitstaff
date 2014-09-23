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
        })
        .otherwise({
          redirectTo : "/"
        });
});

//services
app.service('MealService', function(){
  this.data = {};
  this.tipTotal = 0;
  this.mealCount = 0;
  this.avgTip = 0;

  this.addData = function(ttip, mcount, atip){
    this.tipTotal = ttip;
    this.mealCount = mcount;
    this.avgTip = atip;
  }

  this.getTotalTip = function(){
    return this.tipTotal;
  }

  this.getMealCount = function(){
    return this.mealCount;
  }

  this.getAvgTip = function(){
    return this.avgTip;
  }

  this.getData = function(){
    return {
      tipTotal : this.tipTotal,
      mealCount : this.mealCount,
      avgTip : this.avgTip
    };
  }
});


//Controllers
app
.controller('HomeController', function(){

})
.controller('NewMealController', function($scope, MealService){
  $scope.submit = function(){
    $scope.data.subTotal = $scope.data.basePrice + $scope.data.basePrice*($scope.data.taxRate/100);
    $scope.data.tip = $scope.data.subTotal * ($scope.data.tipPercentage/100);
    $scope.data.tipTotal = MealService.getTotalTip();
    $scope.data.tipTotal += $scope.data.tip;
    $scope.data.mealCount = MealService.getMealCount();
    $scope.data.mealCount++;
    $scope.data.avgTip = MealService.getAvgTip();
    $scope.data.avgTip = $scope.data.tipTotal/$scope.data.mealCount;
    $scope.data.total = $scope.data.subTotal + $scope.data.tip;
    MealService.addData($scope.data.tipTotal, $scope.data.mealCount, $scope.data.avgTip);
    console.log(MealService.getData());
  };

  // $scope.data = {
  //    basePrice : 0.0,
  //    taxRate : 0.0,
  //    tipPercentage : 0.0,
  //    subTotal : 0.0,
  //    tip : 0.0,
  //    total : 0.0,
  //    tipTotal : 0.0,
  //    mealCount : 0.0,
  //    avgTip : 0.0
  // };

  $scope.cancel = function(){
    $scope.data.basePrice = 0.0;
    $scope.data.taxRate = 0.0;
    $scope.data.tipPercentage = 0.0;
  };

})
.controller('EarningsController', function($scope, MealService){
  $scope.data = MealService.getData();
  console.log($scope.data);
  $scope.reset = function(){
    $scope.data.tipTotal = 0.0;
    $scope.data.mealCount = 0.0;
    $scope.data.avgTip = 0.0;
    MealService.addData(0, 0, 0);
  };


});
