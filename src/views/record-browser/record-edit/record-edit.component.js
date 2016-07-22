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
