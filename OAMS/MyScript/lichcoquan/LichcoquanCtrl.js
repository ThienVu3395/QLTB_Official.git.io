
(function () {
    "use strict"
    angular.module("oamsapp")
        .controller("LichcoquanCtrl", ["$scope", "$timeout", "$http", "$uibModal", "$document", "appSettings", "loginservice", "userProfile",
            function ($scope, $timeout, $http, $uibModal, $document, appSettings, loginservice, userProfile) {
                $scope.TotalItems = 0;
                $scope.CurrentPage = 1;
                $scope.maxSize = 5;
                $scope.perPage = 30;
                $scope.id = parseInt(getParameterByName("id"));
                $scope.anhien = false;
                $scope.idselect = {};
                fgetAlltbGanmoiJoinXuLy();
                $scope.datatbGanmoiJoinXuLy = [];

                $scope.pageChanged = function () {
                    fgetAlltbGanmoiJoinXuLy();
                };

                $scope.fhien = function(){
                    $scope.anhien = true;

                }
                $scope.fan = function () {
                    $scope.anhien = true;

                }

                //debugger
                //$scope.selectrows = function (irow) {
                //    if ($scope.idselect.ID_XuLy != irow.ID_XuLy) {
                //        $scope.action = false;
                //        $scope.idselect = irow;
                //    }
                //};

                function fgetAlltbGanmoiJoinXuLy() {

                    var resp = loginservice.postdata("api/TestXuLyCallcenter/getAlltbGanmoiJoinXuLy", $.param({ valint1: $scope.CurrentPage }));
                    resp.then(function (response) {

                        $scope.datatbGanmoiJoinXuLy = response.data.pdata;
                        $scope.TotalItems = response.data.Toltalrow;
                        $scope.perPage = response.data.perPage;
                        $scope.action = true;
                    }
                        , function errorCallback(response) {
                            $scope.action = true;
                        });


                }





                $scope.xulythemlichcoquan = function () {
                    var parentElem =
                        angular.element($document[0].querySelector('.main-content'));
                    var modalInstance = $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'xulythemlichcoquan.html',
                        controller: 'xulythemlichcoquanCtrl',
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
               
               



            }])


        .controller('xulythemlichcoquanCtrl', ["$scope", "$http", "$uibModalInstance", "FileUploader", "appSettings", "loginservice", "userProfile", "idselect",
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





                function savexuly() {

                    if (uploader.queue.length > 0) {
                        $ctrl.items.HinhXuLy1 = uploader.queue[0].file.name;
                    }
                    if (confirm('Bạn có chắc muốn save lại thông tin xử lý - khi bạn nhấn ok thông tin này sẽ save lại và chuyển lại cho callcenter ?')) {
                        var resp = loginservice.postdata("api/TestXuLyCallcenter/postthongtinxulychitiet", $.param($ctrl.items));
                        resp.then(function (response) {
                            $uibModalInstance.close(0);

                        }
                            , function errorCallback(response) {
                                alert("Cập nhật xử lý thất bại!");
                            });
                    }
                }



                //---------upload------------
                var accesstoken = userProfile.getProfile().access_token;
                var authHeaders = {};
                if (accesstoken) {
                    authHeaders.Authorization = 'Bearer ' + accesstoken;
                }
                var uploader = $scope.uploader = new FileUploader({
                    headers: { "Authorization": authHeaders.Authorization },
                    url: appSettings.serverPath + 'api/uploadfile/UploadFiles',
                    withCredentials: true
                });
                uploader.filters.push({
                    name: 'docFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        if (this.queue.length == 0) {
                            if ('|tif|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1)
                                return true;
                        }
                        else {
                            return true;
                        }
                    }
                });
                uploader.filters.push({
                    name: 'asyncFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                        console.log('asyncFilter');
                        setTimeout(deferred.resolve, 1e3);
                    }
                });

                uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                };
                uploader.onAfterAddingFile = function (fileItem) {
                    fileItem.upload();
                };
                uploader.onAfterAddingAll = function (addedFileItems) {
                };
                uploader.onBeforeUploadItem = function (item) {
                };
                uploader.onProgressItem = function (fileItem, progress) {
                };
                uploader.onProgressAll = function (progress) {
                };
                uploader.onSuccessItem = function (fileItem, response, status, headers) {
                };
                uploader.onErrorItem = function (fileItem, response, status, headers) {
                };
                uploader.onCancelItem = function (fileItem, response, status, headers) {
                };
                uploader.onCompleteItem = function (fileItem, response, status, headers) {
                };
                $scope.imageurl = appSettings.serverPath + 'Content/image/user.png';
                uploader.onCompleteAll = function () {
                    if (uploader.queue.length > 0) {
                        var data = userProfile.getProfile();
                        $ctrl.imageurl = appSettings.serverPath + 'Uploadtemp/' + data.username + '/' + uploader.queue[0].file.name;
                    }
                };







            }]);
}());