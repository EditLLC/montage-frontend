(angular => {
  'use strict';

  angular
    .module('montage')
    .component('recordEdit', {
      templateUrl : 'views/record-browser/record-edit/record-edit.html',
      controller  : recordEditController
    });

  function recordEditController($stateParams, $state, $scope, $mdToast, $mdDialog, api, montageHelper) {
    $scope.document_id = $stateParams.document_id;
    $scope.schemaName = $stateParams.schemaName;
    $scope.newKey = '';
    $scope.newValue = '';

    $scope.showSuccessToast = () => {
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


    $scope.showDialog = (ev) => {
      $mdDialog.show({
        contentElement      : '#myDialog',
        parent              : angular.element(document.body),
        targetEvent         : ev,
        clickOutsideToClose : true,
        scope               : $scope,
        preserveScope       : true,
        controller          : ($scope, $mdDialog) => {

            $scope.cancel = () => {
              $mdDialog.cancel();
            };
            $scope.answer = () => {
              $mdDialog.hide();
            };
          }
        ],
      })
      .then(() => {
        $scope.data[$scope.newKey] = $scope.newValue;
        $scope.newKey = '';
        $scope.newValue = '';
      });
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
