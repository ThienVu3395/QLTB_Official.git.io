(function () {
    "use strict"
    angular.module("oamsapp")
    .controller('themcongviecCtrl', ["$scope", "$http", "$uibModalInstance", "FileUploader", "appSettings", "loginservice", "userProfile", "idselect",
function ($scope, $http, $uibModalInstance, FileUploader, appSettings, loginservice, userProfile, idselect) {
    var $ctrl = this;
    $ctrl.sumitformedit = function () {

    }
    $ctrl.ok = function () {
        $ctrl.presult = "0";
    };
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    //---------upload------------
    $scope.values = {};
    var accesstoken = userProfile.getProfile().access_token;
    var authHeaders = {};
    if (accesstoken) {
        authHeaders.Authorization = 'Bearer ' + accesstoken;
    }
    var uploader = $scope.uploader = new FileUploader({
        headers: { "Authorization": authHeaders.Authorization },
        url: appSettings.serverPath + 'api/fileUpload/UploadFiles',
        withCredentials: true
    });
    uploader.filters.push({
        name: 'docFilter1',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            debugger
            if ('|pdf|tif|tiff|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1)
                return true;
            else {
                alert("Không hỗ trợ định dạng file này!!");
                return false;
            }
        }
    });
    uploader.filters.push({
        name: 'asyncFilter',
        fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
            //console.log('asyncFilter');
            setTimeout(deferred.resolve, 1e3);
        }
    });

    uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
        //console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function (fileItem) {
        fileItem.upload();
    };
    uploader.onAfterAddingAll = function (addedFileItems) {
        //console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function (item) {
        //console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function (fileItem, progress) {
        //console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function (progress) {
        //console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        //console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function (fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function (fileItem, response, status, headers) {
        //console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function (fileItem, response, status, headers) {
        //console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function () {
        //console.info('onCompleteAll');
    };
    //---------------------------
    //loaddataedit();
    //function loaddataedit() {
    //    var data = userProfile.getProfile();
    //    var resp = loginservice.postdata("api/funcbase/getnewdatatable", $.param({ Tablename: 'yJ11%2fReRv3WEhTcyL%2f9YqQ%3d%3d', id: $ctrl.items }));
    //    resp.then(function (response) {
    //        if (response.data != null) {
    //            $ctrl.pControl = response.data;
    //            for (var i = 0; i < $ctrl.pControl.length; i++) {
    //                if ($ctrl.pControl[i].ctype == 'number')
    //                    $ctrl.pControl[i].values = $ctrl.pControl[i].values ? parseInt($ctrl.pControl[i].values) : 0;
    //                if ($ctrl.pControl[i].ctype == 'calendar')
    //                    $ctrl.pControl[i].values = $ctrl.pControl[i].values ? new Date($ctrl.pControl[i].values) : null;
    //                if ($ctrl.pControl[i].ctype == 'check')
    //                    $ctrl.pControl[i].values = $ctrl.pControl[i].values ? ($ctrl.pControl[i].values == 'true' || $ctrl.pControl[i].values == 'True' || $ctrl.pControl[i].values == '1') : false;
    //            }
    //        }
    //    }
    //    , function errorCallback(response) {
    //        alert("Kết nối đến máy chủ thất bại!");
    //    });
    //}
    //$scope.filterFn = function (car) {
    //    if (car.id !== 'IDKEY' || car.width !== '0') {
    //        return true;
    //    }
    //    return false;
    //};
}])
    ;
}());