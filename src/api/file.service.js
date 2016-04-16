(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('fileService', fileService);

	function fileService(montageHelper, authService, Upload) {

		return {
			deleteFile: deleteFile,
			getFileInfo: getFileInfo,
			getFileList: getFileList,
			uploadFile: uploadFile
		};

		function returnData(response) {
			return response.data;
		}

		function deleteFile(id) {
			return montageHelper.getClient().files.remove(id);
		}

		function getFileInfo(id) {
			return montageHelper.getClient().files.get(id)
				.then(returnData);
		}

		function getFileList() {
			return montageHelper.getClient().files.list()
				.then(returnData);
		}

		function uploadFile(file) {
			var fileUri = `https://${MONTAGE_PROJECT}.${MONTAGE_HOST}/api/v1/files/`;
			var authHeader = { Authorization: 'Token ' + authService.getCurrentUser().token };

			return Upload.upload({
				url: fileUri,
				data: { file: file },
				headers: authHeader
			}).then(response => response.data.data);
		}
	}
})(angular);
