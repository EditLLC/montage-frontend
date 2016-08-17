(angular => {
	'use strict';

	angular
		.module('montage')
		.component('recordEdit', {
			templateUrl : 'views/record-browser/record-edit/record-edit.html',
			controller	: recordEditController,
		});

	function recordEditController($stateParams, $state, $scope, $mdDialog, $q, api) {
		const document_id = $stateParams.document_id;
		const schemaName = $stateParams.schemaName;
		const schemaFieldsPromise = api.schema.get(schemaName).then(response => response.fields);
		const recordPromise = api.document.get(schemaName, document_id).then(response => response);

		let confirmDialog;

		$scope.saveContext = 'Save';

    $scope.showMessage = (status, message) => {
			if (message) {
				$scope.followupMessage = message;
			} else {
				if (status === 'error') {
					$scope.followupMessage = 'Unable to save changes. Please try again.';
				} else if (status === 'success') {
					$scope.followupMessage = 'Changes saved'
				}
			}

			$scope.status = status || 'info';
		}

		if (!$scope.response) {
			$scope.showMessage('error', 'Record doesn\'t exist');
		}

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
				if (typeof answer.value === 'string') {
					if (Number(answer.value)) {
						answer.value = parseFloat(answer.value);
					} else if (answer.value === 'true' || answer.value === 'false') {
						answer.value = answer.value === 'true';
					}
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
										         .ok('Delete')
										         .cancel('Cancel');
      $mdDialog.show(confirm).then(() => {
        $scope.remove();
      }, () => {
        $mdDialog.cancel();
      });
    };


    $scope.update = () => {
			$scope.saveContext = 'Saving';
			api
			.document.update(schemaName, $scope.record)
			.then(() => {
				$scope.showMessage('success');
				createMeta($scope.fields, $scope.record);
				$scope.saveContext = 'Save';
			})
			.catch((e) => {
				$scope.showMessage('error');
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
