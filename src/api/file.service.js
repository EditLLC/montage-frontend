(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('fileService', fileService);

	function fileService($http, authService, Upload) {

		// TODO: reset these on login
		var fileUri = `https://${authService.getCurrentUser().domain}.mntge.com/api/v1/files/`;
		var authHeader = { Authorization: 'Token ' + authService.getCurrentUser().token };

		return {
			deleteFile: deleteFile,
			getFileInfo: getFileInfo,
			getFileList: getFileList,
			uploadFile: uploadFile
		};

		function returnData(response) {
			return response.data.data;
		}

		function deleteFile(id) {
			return $http.delete(fileUri + id + '/', {
				headers: authHeader
			}).then(returnData);
		}

		function getFileInfo(id) {
			return $http.get(fileUri + id + '/', {
				headers: authHeader
			}).then(returnData);
		}

		function getFileList() {
			return $http.get(fileUri, {
				headers: authHeader
			}).then(returnData);
		}

		function uploadFile(file) {
			return Upload.upload({
				url: fileUri,
				data: { file: file },
				headers: authHeader
			}).then(returnData);
		}
	}
})(angular);
