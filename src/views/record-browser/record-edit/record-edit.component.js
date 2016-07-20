(angular => {
  'use strict';

  angular
    .module('montage')
    .component('recordEdit', {
      templateUrl: 'views/record-browser/record-edit/record-edit.html',
      controller: recordEditController
    });

  function recordEditController($stateParams, $scope, api, montageHelper) {
    $scope.document_id = $stateParams.document_id;
    $scope.schemaName = $stateParams.schemaName;

    return;
  }
})(angular);
