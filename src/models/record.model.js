(function(angular) {

	angular.module('montage')
		.factory('Record', function(api, $q, utils, Field) {

			class Record {
				constructor(schemaName, fields) {
					this.schemaName = schemaName;
					this.fields = fields;
				}

				static get(schemaName, document_id) {
					const recordPromise = api.document.get(schemaName, document_id)
						.then(record => {
							delete record._meta;
							return record;
						});

					const schemaFieldsByNamePromise = api.schema.get(schemaName)
						.then(schema => utils.makeDictionary(schema.fields, 'name'));

					return $q.all([recordPromise, schemaFieldsByNamePromise])
						.then(([record, schemaFieldsByName]) => {
							const fieldNames = Object.keys(record);

							const fields = fieldNames.map(fieldName => new Field({
								name     : fieldName,
								value    : record[fieldName],
								datatype : schemaFieldsByName[fieldName].datatype,
								required : schemaFieldsByName[fieldName].required,
							}));

							return new Record(schemaName, fields);
						});
				}

				save() {
					return api.document.save(this.schemaName, this._getDto());
				}

				_getDto() {
					const dto = {};

					this.fields.forEach(field => {
						dto[field.name] = field.value;
					});

					return dto;
				}
			}

			return Record;
		});

})(angular);