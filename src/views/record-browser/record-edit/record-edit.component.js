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

		$scope.showAddFieldDialog = (event) => {
			$mdDialog.show({
				contentElement : '#myDialog',
				parent				 : angular.element(document.body),
				targetEvent		 : event,
				scope					 : $scope,
				preserveScope	 : true,
				controller		 : ($scope, $mdDialog) => {
					$scope.cancel = () => {
						$mdDialog.cancel();
						$scope.resetInput();
					};

					$scope.answer = () => {
						$mdDialog.hide($scope.addFieldForm);
						$scope.resetInput();
					};
				}
			})
			.then(answer => {
				answer = coerceType(answer);
				$scope.record[answer.field] = answer.value;
				createMeta($scope.fields, $scope.record, answer);
			});
		};

		$scope.showDeleteRecordDialog = (event) => {
			confirmDialog = $mdDialog.confirm()
				.title('Would you like to delete this record?')
				.ariaLabel('Delete record')
				.targetEvent(event)
				.ok('Delete')
				.cancel('Cancel');
			$mdDialog.show(confirmDialog).then(deleteRecord, () => {
				$mdDialog.cancel();
			});
		};

		$scope.validateField = (fieldObject, form) => {
			if (typeof fieldObject.value === 'array' && form.datatype === 'array') {
				if (fieldObject.value[0] !== '[') {
					return false;
				}
				return validateJSON(fieldObject.value, fieldObject.name, form);
			}

			if (typeof fieldObject.value === 'object' && form.datatype === 'object') {
				if (fieldObject.value[0] !== '{') {
					return false;
				}
				return validateJSON(fieldObject.value, fieldObject.name, form);
			}

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
		function createMeta(newField) {

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

		function extendFields() {
			$scope.schemaFields.forEach(field => {
				if (!$scope.record[field.name]) {
					$scope.record[field.name] = field.name.replace("field", "value");;
				}
			});

			Object.keys($scope.record).forEach(field => {
				const fieldTemplate = {
					datatype : $scope.newField.datatype,
					index		 : '',
					required : false,
					name		 : field,
				};

				if ($scope.schemaFields.includes(field) && field !== '_meta') {
					$scope.schemaFields.splice(field - 1, 0, fieldTemplate);
				}
			});
		}

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
