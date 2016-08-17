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
		$scope.deleteRecord = deleteRecord;
		$scope.updateRecord = updateRecord;
		$scope.metaDictionary = {};

		resolvePromises();

		////////////

		$scope.resetForm = () => {
			$scope.addFieldForm.$setPristine();
			$scope.addFieldForm.$setUntouched();
		};


					return false;
				}
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


				if ($scope.schemaFields.includes(field) && field !== '_meta') {
					$scope.schemaFields.splice(field - 1, 0, fieldTemplate);
				}
			});

		function resolvePromises() {
			$q.all([schemaFieldsPromise, recordPromise])
				.then(([fields, record]) => {
					$scope.schemaFields = fields;
					$scope.record = record;

					createMeta();
				}, () => {
					showErrorMessage('Record doesn\'t exist');
				});
		}

		function showErrorMessage(message) {
			$scope.status = 'error';

			if (message) {
				$scope.followUpMessage = message;
			} else {
				$scope.followUpMessage = 'Unable to save changes. Please try again.';
			}
		};

		function showSuccessMessage(message) {
			$scope.status = 'success';

			if (message) {
				$scope.followUpMessage = message;
			} else {
				$scope.followUpMessage = 'Changes saved';
			}
		}

		function toggleIsSaving() {
			$scope.isSaving = !$scope.isSaving;
		}

		function deleteRecord() {
			api.document
				 .remove(schemaName, document_id)
				 .then(() => {
					 $state.go('data.list');
				 });
		}

		function updateRecord() {
			toggleIsSaving();

			api.documents
				 .update(schemaName, $scope.record)
				 .then(showSuccessMessage)
				 .catch(showErrorMessage)
				 .finally(toggleIsSaving);
		}

		function coerceType(value) {
			if (["true", "false"].includes(value)) {
				return Boolean(value);
			}

			if (parseFloat(value) !== NaN) {
				return parseFloat(value);
			}

			return value;
		}

		function validateJSON(snippet, fieldName, form) {
			try {
				JSON.parse(snippet);
			} catch(error) {
				$scope.JSONParseError = error.toString();

				return false;
			}

			return true;
		}
	}
})(angular);
