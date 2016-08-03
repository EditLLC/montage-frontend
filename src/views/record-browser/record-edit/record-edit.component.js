(angular => {
  'use strict';

  angular
    .module('montage')
    .component('recordEdit', {
      templateUrl : 'views/record-browser/record-edit/record-edit.html',
      controller  : recordEditController
    });

  function recordEditController($stateParams, $state, $scope, $mdToast, $mdDialog, $q, api, montageHelper) {
    $scope.document_id = $stateParams.document_id || null;

		const schemaName = $stateParams.schemaName;
		const getSchemaFields = api.schema.get(schemaName).then(fields => fields.fields);
		const getActualRecord = api.document.get(schemaName, $scope.document_id).then(response => response);

		$scope.validateJSON = (snippet, fieldName) => {
			if (snippet[0] === '{' || snippet[0] === '[') {
				try {
					JSON.parse(snippet);
				} catch (e) {
					$scope.e = e.toString();
					$scope.recordForm[fieldName].$setValidity('formatting', false);

					return false;
				}
			}

			$scope.recordForm[fieldName].$setValidity('formatting', true);
			return true;
		}

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

			for (let key in $scope.record) {
				if ($scope.record[key] instanceof Object) {
					$scope.record[key] = JSON.stringify($scope.record[key]);
				}
			}
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

    $scope.showUnsuccessToast = (message) => {
			const response = message || 'Changes unsuccessful';
      $mdToast.show(
        $mdToast.simple()
		            .textContent(response)
		            .position('bottom right')
		            .hideDelay(3000)
        );
    };


    $scope.showAddFieldDialog = (ev) => {
      $mdDialog.show({
        contentElement      : '#myDialog',
        parent              : angular.element(document.body),
        targetEvent         : ev,
        scope               : $scope,
        preserveScope       : true,
        controller          : ($scope, $mdDialog) => {
					$scope.newField = {};

          $scope.cancel = () => {
            $mdDialog.cancel();
						$scope.addFieldForm.$setPristine();
						$scope.addFieldForm.$setUntouched();
          };

          $scope.answer = () => {
            $mdDialog.hide($scope.newField);
						$scope.addFieldForm.$setPristine();
						$scope.addFieldForm.$setUntouched();
          };
        }
      })
      .then(answer => {
				if (typeof answer.value === 'string' && Number(answer.value)) {
					answer.value = parseFloat(answer.value);
				} else if (typeof answer.value === 'string' && Boolean(answer.value)) {
					answer.value = answer.value === 'true';
				}

        $scope.record[answer.field] = answer.value;
				createMeta($scope.fields, $scope.record, answer);
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
