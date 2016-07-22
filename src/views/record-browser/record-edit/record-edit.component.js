(angular => {
  'use strict';

  angular
    .module('montage')
    .component('recordEdit', {
      templateUrl : 'views/record-browser/record-edit/record-edit.html',
      controller  : recordEditController
    });

  function recordEditController($stateParams, $scope, api, montageHelper) {
    $scope.document_id = $stateParams.document_id;
    $scope.schemaName = $stateParams.schemaName;


    $scope.showSuccessToast = function() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Changes saved')
          .position('bottom right')
          .hideDelay(3000)
      );
    };

    $scope.showUnsuccessToast = () => {
      $mdToast.show(
          $mdToast.simple()
            .textContent('Changes unsuccessful')
            .position('bottom right')
            .hideDelay(3000)
        );
    };

    api
      .document
      .get($scope.schemaName, $scope.document_id)
      .then(response => {
        $scope.data = response;
      });

    $scope.update = () => {
      api
        .document.update($scope.schemaName, $scope.data)
        .then(() => {
          $scope.showSuccessToast();
        })
        .catch(() => {
          $scope.showUnsuccessToast();
        });
    };

    $scope.remove = () => {
      api
        .document.remove($scope.schemaName, $scope.document_id)
        .then(response => {
          $state.go('data.list');
        });
    };

  }
})(angular);
