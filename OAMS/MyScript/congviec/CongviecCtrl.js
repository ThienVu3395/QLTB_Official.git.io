
(function () {
    "use strict"
    angular.module("oamsapp")
    .controller("CongviecCtrl", ["$scope", "$timeout", "$http", "$uibModal", "$document", "blockUI", "appSettings", "loginservice", "userProfile",
function ($scope, $timeout, $http, $uibModal, $document, blockUI, appSettings, loginservice, userProfile) {
    function getalldata() {
        var resp = loginservice.getdata("api/admin/getallchucvu");
        resp.then(function (response) {
            $ctrl.dschucvu = response.data;
        }, function errorCallback(response) {

        });
        var resp1 = loginservice.getdata("api/admin/getallbophan");
        resp1.then(function (response) {
            $ctrl.dsbophan = response.data;
        }, function errorCallback(response) {

        });
    }
    $scope.viewfilepdf = function () {
        var parentElem =
              angular.element($document[0].querySelector('.main-content'));
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'viewPDFonline.html',
            controller: 'viewfilepdfCtrl',
            controllerAs: '$ctrl',
            size: 'full',
            appendTo: parentElem,
            resolve: {
                idselect: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (c) {
            getdataInnit();
            if (c == 1) {
                $scope.items = {};
                $scope.opennew();
            }
        }, function () {
            $("#fileInput").remove();
        });
    }
    $scope.viewfilepdf = function () {
        var parentElem =
              angular.element($document[0].querySelector('.main-content'));
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'viewPDFonline.html',
            controller: 'viewfilepdfCtrl',
            controllerAs: '$ctrl',
            size: 'full',
            appendTo: parentElem,
            resolve: {
                idselect: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (c) {
            getdataInnit();
            if (c == 1) {
                $scope.items = {};
                $scope.opennew();
            }
        }, function () {
            $("#fileInput").remove();
        });
    }
    $scope.viewfileword = function () {
        var parentElem =
              angular.element($document[0].querySelector('.main-content'));
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'viewWordonline.html',
            controller: 'viewfilewordCtrl',
            controllerAs: '$ctrl',
            size: 'full',
            appendTo: parentElem,
            resolve: {
                idselect: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (c) {
            getdataInnit();
            if (c == 1) {
                $scope.items = {};
                $scope.opennew();
            }
        }, function () {
            $("#fileInput").remove();
        });
    }
    $scope.themcongviec = function () {
        var parentElem =
          angular.element($document[0].querySelector('.main-content'));
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'Addcongviec.html',
            controller: 'themcongviecCtrl',
            controllerAs: '$ctrl',
            size: 'full',
            appendTo: parentElem,
            resolve: {
                idselect: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (c) {
            getdataInnit();
            if (c == 1) {
                $scope.items = {};
                $scope.opennew();
            }

        }, function () {
        });
    }
    $scope.opennewXuly = function () {
        var parentElem =
          angular.element($document[0].querySelector('.main-content'));
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'AddXulyContent.html',
            controller: 'AddXulyCtrl',
            controllerAs: '$ctrl',
            size: 'lg',
            appendTo: parentElem,
            resolve: {
                idselect: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (c) {
            getdataInnit();
            if (c == 1) {
                $scope.items = {};
                $scope.opennew();
            }

        }, function () {
        });
    }
    $scope.opennewPhanhoi = function () {
        var parentElem =
          angular.element($document[0].querySelector('.main-content'));
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'PhanhoiContent.html',
            controller: 'PhanhoiCtrl',
            controllerAs: '$ctrl',
            size: 'lg',
            appendTo: parentElem,
            resolve: {
                idselect: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (c) {
            getdataInnit();
            if (c == 1) {
                $scope.items = {};
                $scope.opennew();
            }

        }, function () {
        });
    }
}])
    .controller('AddXulyCtrl', ["$scope", "$http", "$uibModalInstance", "FileUploader", "appSettings", "loginservice", "userProfile", "idselect",
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
}])
    .controller('PhanhoiCtrl', ["$scope", "$http", "$uibModalInstance", "FileUploader", "appSettings", "loginservice", "userProfile", "idselect",
function ($scope, $http, $uibModalInstance,FileUploader, appSettings, loginservice, userProfile, idselect) {
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
}])
    ;
}());