AnguLearn.controller('PairCtrl', function ($scope, $http) {
  var ctrl = this;
  var pairs = [];

  this.getData = function() {
    $http.get('pairs/').success(function(data) {
      ctrl.pairs = data;
    });
  }

  this.generatePairs = function() {
    
  }

  this.checkPairs = function() {

  }

});
