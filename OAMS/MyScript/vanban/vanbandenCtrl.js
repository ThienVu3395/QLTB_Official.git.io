(function () {
    "use strict"
    angular.module("oamsapp")
        .controller('vanbandenCtrl', ["$scope", "$http", "$uibModalInstance", "blockUI", "FileUploader", "appSettings", "loginservice", "userProfile", "idselect",
            function ($scope, $http, $uibModalInstance, blockUI, FileUploader, appSettings, loginservice, userProfile, idselect) {
                var $ctrl = this;

                $ctrl.pdf = {
                    src: '',  // get pdf source from a URL that points to a pdf
                    data: null // get pdf source from raw data of a pdf
                };

                $ctrl.Permispdf = {
                    download: 'false',  // get pdf source from a URL that points to a pdf
                    print: 'false' // get pdf source from raw data of a pdf
                };

                $scope.getdatafilePDF = function (fileName) {
                    blockUI.start();
                    var resp = loginservice.getdatafile("api/QLVanBan/getviewpdf?fileName=" + fileName);
                    resp.then(function (response) {
                        $ctrl.pdf.data = new Uint8Array(response.data);
                        if (!$ctrl.reload)
                            $ctrl.pageview = 1;
                        //document.title = 'FSM - Hệ thống quản trị số hóa tài liệu';
                        blockUI.stop();

                    }
                        , function errorCallback(response) {
                            $ctrl.pdf.data = null;
                            blockUI.stop();
                            //document.title = 'FSM - Hệ thống quản trị số hóa tài liệu';
                        });
                }

                $ctrl.onPageLoad = function (page) {
                    $ctrl.page1 = page;
                    $ctrl.pageview = page;
                };

                $ctrl.Dataloaivanban = [];
                
                $ctrl.Datangonngu = [{ ID: 1, TEN: "Tiếng Việt" }, { ID: 2, TEN: "Tiếng Anh" }];
                $scope.LANGUAGE = $ctrl.Datangonngu[0];
                let FileDinhKem = [];
                $ctrl.Datamucdo = [{ ID: 1, TEN: "Bình Thường" }, { ID: 2, TEN: "Hỏa Tốc" }, { ID: 3, TEN: "Khẩn" }];
                $scope.PRIORITY = $ctrl.Datamucdo[0];
                getSoVanBan();
                getLoaiVanBan();
                function getSoVanBan() {
                    var resp;
                    resp = loginservice.getdata("api/QLVanBan/getSoVanBan");
                    resp.then(function (response) {
                        $ctrl.Datasovanban = response.data;
                        $scope.SOVANBANID = response.data[0];
                    }
                        , function errorCallback(response) {

                        });
                }

                function getLoaiVanBan() {
                    var resp;
                    resp = loginservice.getdata("api/QLVanBan/getLoaiVanBan");
                    resp.then(function (response) {
                        $ctrl.Dataloaivanban = response.data;
                        $scope.TYPENAME = response.data[0];
                    }
                        , function errorCallback(response) {

                        });
                }

                $ctrl.sumitformedit = function () {
                    //if (uploader.queue.length > 0) {
                    //    $scope.dataclickchonkh.HinhAnh1 = uploader.queue[0].file.name;

                    //}
                    //else { alert("Chưa Upload file do mạng có vấn đề vui lòng cập nhật lại"); }
                    //var resp = loginservice.postdata("api/QLVanBan/ThemMoiVanBanDen", $.param($ctrl.datasumitformedit));
                    //resp.then(function (response) {
                    //    $ctrl.datasumitformedit = response.data;
                    //    alert("Cập nhật thành công!");
                    //    $ctrl.resetForm();
                    //    $ctrl.sumitformedit = {};


                    //}
                    //    , function errorCallback(response) {
                    //        alert("Cập nhật xử lý thất bại bại vui lòng kiểm tra lại !");
                    //    });

                    $ctrl.datasumitformedit.TYPENAME = $scope.TYPENAME.TENLOAI;
                    $ctrl.datasumitformedit.LANGUAGE = $scope.LANGUAGE.TEN;
                    $ctrl.datasumitformedit.PRIORITY = $scope.PRIORITY.ID;
                    $ctrl.datasumitformedit.SOVANBANID = $scope.SOVANBANID.ID;
                    if (uploader.queue.length == 0) {
                        alert("Xin vui lòng đính kèm File");
                        return;
                    }
                    $ctrl.datasumitformedit.FileDinhKem = FileDinhKem;
                    var resp = loginservice.postdata("api/QLVanBan/ThemVanBanDen", $.param($ctrl.datasumitformedit));
                    resp.then(function (response) {
                        alert(response.data);
                        //$ctrl.datasumitformedit = response.data;
                        //alert("Cập nhật thành công!");
                        //$ctrl.resetForm();
                        //$ctrl.sumitformedit = {};
                    }
                        , function errorCallback(response) {
                            alert("Cập nhật xử lý thất bại bại vui lòng kiểm tra lại !");
                        });
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
                    //headers: { "Authorization": authHeaders.Authorization },
                    url: appSettings.serverPath + 'api/QLVanBan/UploadFiles',
                    withCredentials: true
                });
                uploader.filters.push({
                    name: 'docFilter1',
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        //debugger
                        if ('|pdf|tif|docx|doc|png|jpeg|bmp|gif|'.indexOf(type) !== -1)
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

                $scope.removeFile = function (item) {
                    uploader.removeFromQueue(item);
                    $ctrl.pdf.data = new Uint8Array(0);
                }
                uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                    //console.info('onWhenAddingFileFailed', item, filter, options);
                };
                uploader.onAfterAddingFile = function (fileItem) {
                    fileItem.upload();
                    let item = {
                        LOAI : 100,
                        TENFILE: fileItem.file.name,
                        MOTA: "Mô Tả Test",
                        TRANGTHAI: 0,
                        LOAIFILE: fileItem.file.type,
                        SIZEFILE: fileItem.file.size,
                        VITRIID : 100
                    }
                    FileDinhKem.push(item);
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
                    $scope.getdatafilePDF(fileItem.file.name);
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
                loaddataedit();
                function loaddataedit() {
                    var data = userProfile.getProfile();
                    var resp = loginservice.postdata("api/funcbase/getnewdatatable", $.param({ Tablename: 'yJ11%2fReRv3WEhTcyL%2f9YqQ%3d%3d', id: $ctrl.items }));
                    resp.then(function (response) {
                        if (response.data != null) {
                            $ctrl.pControl = response.data;
                            for (var i = 0; i < $ctrl.pControl.length; i++) {
                                if ($ctrl.pControl[i].ctype == 'number')
                                    $ctrl.pControl[i].values = $ctrl.pControl[i].values ? parseInt($ctrl.pControl[i].values) : 0;
                                if ($ctrl.pControl[i].ctype == 'calendar')
                                    $ctrl.pControl[i].values = $ctrl.pControl[i].values ? new Date($ctrl.pControl[i].values) : null;
                                if ($ctrl.pControl[i].ctype == 'check')
                                    $ctrl.pControl[i].values = $ctrl.pControl[i].values ? ($ctrl.pControl[i].values == 'true' || $ctrl.pControl[i].values == 'True' || $ctrl.pControl[i].values == '1') : false;
                            }
                        }
                    }
                        , function errorCallback(response) {
                            alert("Kết nối đến máy chủ thất bại!");
                        });
                }
                $scope.filterFn = function (car) {
                    if (car.id !== 'IDKEY' || car.width !== '0') {
                        return true;
                    }
                    return false;
                };
            }])
        ;
}());