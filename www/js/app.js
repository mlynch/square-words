// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('Square', [function() {
  return function() {
    var text = "KEEP CALM AND SHUT UP";
    return {
      setText: function(t) {
        text = t;
      },
      getText: function() {
        return text;
      }
    }
  }
}])

.directive('controls', [function() {
  return {
    restrict: 'E',
    templateUrl: 'tmpl/controls.html',
    link: function($scope, $element, $attr) {

    }
  }
}])

.directive('square', [function() {
 // http: //www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var cars = text.split("\n");

    for (var ii = 0; ii < cars.length; ii++) {

      var line = "";
      var words = cars[ii].split(" ");

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth) {
          context.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }

      context.textBaseline = 'middle';
      context.fillText(line, x, y);
      y += lineHeight;
    }
  }

  return {
    restrict: 'E',
    templateUrl: 'tmpl/square.html',
    link: function($scope, $element, $attr) {
      function draw() {
        var canvas = $element[0].querySelector('canvas');
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,320,320);

        ctx.font = 'bold 30pt Helvetica Neue';
        ctx.fillStyle = '#ff69b4';
        ctx.textAlign = 'center';

        var w = ctx.measureText($scope.square.getText());
        //ctx.fillText('HelloWorld!', 120, 120);

        wrapText(ctx, $scope.square.getText(), 160, 80, 100, 40);

        $scope.canvasBase64 = canvas.toDataURL();
      }

      $scope.$watch('text', function(nv) {
        draw();
      });
    }
  }
}])

.controller('DesignCtrl', ['$scope', 'Square', function($scope, Square) {
  $scope.text = 'I love cake';
  var square = new Square();
  $scope.square = square;

  $scope.$watch('text', function(nv) {
    square.setText(nv);
  });

  $scope.save = function() {
    CameraRoll.saveToCameraRoll($scope.canvasBase64, function(success) {
    }, function(err) {
      alert('Not saved!');
      console.error(err);
    });
  };
}])
