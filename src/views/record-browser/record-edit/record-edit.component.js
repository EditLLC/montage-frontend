(angular => {
  'use strict';

  angular
    .module('montage')
    .component('recordEdit', {
      templateUrl : 'views/record-browser/record-edit/record-edit.html',
      controller  : recordEditController
    });

  function recordEditController($stateParams, $state, $scope, $mdToast, $mdDialog, $q, api, montageHelper) {
    $scope.document_id = $stateParams.document_id;

		const schemaName = $stateParams.schemaName;
		const getSchemaFields = api.schema.get(schemaName).then(fields => fields.fields);
		const getActualRecord = api.document.get(schemaName, $scope.document_id).then(response => response);

		function createMeta(schemaFields, record, newField) {
			const metaDictionary = {};
			const fieldNames = schemaFields.map(field => field.name);

			if (!newField) {
				newField = {};
				newField.datatype = "text";
			}

			schemaFields.forEach(field => {
			  if (!record[field.name]) {
					record[field.name] = field.name.replace("field", "value")
				}
			});

			Object.keys(record).forEach(field => {
			  if (fieldNames.indexOf(field) === -1 && field !== '_meta') {
			    const fieldIndex = parseInt(field.replace("field", ""));

			    schemaFields.splice(field - 1, 0, {
						datatype : newField.datatype,
						index    : "",
						required : false,
						name     : field
					});
			  }
			});

			for (let key in schemaFields) {
				if (schemaFields[key]) {
					metaDictionary[schemaFields[key]['name']] = schemaFields[key];
				}
			}

			$scope.fields = schemaFields;
			$scope.record = record;
			$scope.meta = metaDictionary;
		}

		$q.all([getSchemaFields, getActualRecord])
			.then(([fields, record]) => {
				createMeta(fields, record);
			});


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


    $scope.showAddFieldDialog = (ev) => {
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
            $mdDialog.hide($scope.newField);
          };
        }
      })
      .then(answer => {
        $scope.record[answer.field] = answer.value;
				createMeta($scope.fields, $scope.record, answer.datatype);
      });
    };

    $scope.showRemoveDialog = (ev) => {
      var confirm = $mdDialog.confirm()
										         .title('Would you like to delete this record?')
										         .ariaLabel('Delete record')
										         .targetEvent(ev)
										         .ok('Okay')
										         .cancel('Cancel');
      $mdDialog.show(confirm).then(() => {
        $scope.remove();
      }, () => {
        $mdDialog.cancel();
      });
    };


    $scope.update = () => {
			api
			.document.update(schemaName, $scope.record)
			.then(() => {
				$scope.showSuccessToast();
				createMeta($scope.fields, $scope.record);
			})
			.catch((e) => {
				$scope.showUnsuccessToast();
			});
    };

    $scope.remove = () => {
      api
        .document.remove(schemaName, $scope.document_id)
        .then(response => {
          $state.go('data.list');
        });
    };
  }
})(angular);
