(function(angular) {

	angular.module('montage')
		.factory('Field', function() {

			class Field {
				constructor({name, value, datatype, required}) {
					this.name = name;
					this.value = value;
					this.datatype = datatype || typeof value;
					this.required = Boolean(required);
				}
			}

			return Field;
		});
})(angular);
