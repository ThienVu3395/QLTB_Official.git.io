(function () {
    "use strict"
    angular.module("oamsapp")
        .controller('vanbandenCtrl', ["$scope", "$http", "$uibModalInstance", "blockUI", "FileUploader", "appSettings", "loginservice", "userProfile", "idselect", "$timeout", "$interval", "$filter",
            function ($scope, $http, $uibModalInstance, blockUI, FileUploader, appSettings, loginservice, userProfile, idselect, $timeout, $interval, $filter) {
                var $ctrl = this;

                $scope.TrangThai = false; // Thêm Mới

                $scope.objVB = {};

                $scope.multipleDemo = {};

                $scope.multipleDemo.selectedPeople = [];

                let date = new Date();

                $ctrl.datasumitformedit = {
                    FileCatalog: date.getFullYear(),
                }

                checkTrangThai();

                function checkTrangThai() {
                    if (idselect !== null) {
                        $scope.TrangThai = true; // Xem chi tiết
                        $scope.objVB = idselect;
                        $scope.Title = "Chi Tiết Văn Bản";
                        var data = userProfile.getProfile();
                        $scope.roleName = data.roleName;
                        //console.log($scope.objVB);
                        getNguoiDung();
                        updateNgayMo();
                    }
                    else {
                        $scope.TrangThai = false;
                        $scope.Title = "Thêm Văn Bản";
                    }
                }

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

                $scope.people = [];

                function getNguoiDung() {
                    blockUI.start();
                    var resp = loginservice.getdata("api/QLVanBan/getNguoiDung");
                    resp.then(function (response) {
                        $scope.people = response.data;
                        blockUI.stop();
                        $scope.data = userProfile.getProfile();
                        $scope.roleName = $scope.data.roleName;
                        if ($scope.roleName == "Admin") {
                            $scope.disable = false;
                        }
                        else {
                            $scope.disable = true;
                        }
                        let index = $scope.people.findIndex(x => x.USERNAME == $scope.data.username);
                        $scope.people.splice(index, 1);
                        $scope.getdatafilePDF($scope.objVB.FileDinhKem[0].TENFILE);
                        for (let i = 0; i < $scope.objVB.NguoiThamGia.length; i++) {
                            let idx = $scope.people.findIndex(x => x.USERNAME == $scope.objVB.NguoiThamGia[i].USERNAME);
                            if (idx != -1) {
                                $scope.multipleDemo.selectedPeople.push($scope.objVB.NguoiThamGia[i]);
                                $scope.people.splice(idx,1);
                            }
                        }
                    }
                        , function errorCallback(response) {
                            $scope.datatree = [];
                            blockUI.stop();
                            $scope.actionbp = true;
                        });
                }

                function updateNgayMo() {
                    blockUI.start();
                    //console.log($scope.objVB.ID);
                    //console.log($scope.objVB.CANBO);
                    let resp = loginservice.postdata("api/QLVanBan/updateNgayMo", $.param({ valint1: $scope.objVB.ID, valstring1: $scope.objVB.CANBO }));
                    resp.then(function (response) {
                        //alert(response.data);
                        console.log(response.data);
                        blockUI.stop();
                    }
                        , function errorCallback(response) {
                            $scope.datatree = [];
                            blockUI.stop();
                            $scope.actionbp = true;
                        });
                }

                function removeFile(fileName) {
                    blockUI.start();
                    var resp;
                    resp = loginservice.getdata("api/QLVanBan/RemoveFile?fileName=" + fileName);
                    resp.then(function (response) {
                        alert(response.data);
                        blockUI.stop();
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


                    //    , function errorCallback(response) {
                    //        alert("Cập nhật xử lý thất bại bại vui lòng kiểm tra lại !");
                    //    });
                    if (uploader.queue.length == 0) {
                        alert("Xin vui lòng đính kèm File");
                        return;
                    }
                    $ctrl.datasumitformedit.TypeName = $scope.TYPENAME.TENLOAI;
                    $ctrl.datasumitformedit.Language = $scope.LANGUAGE.TEN;
                    $ctrl.datasumitformedit.Priority = $scope.PRIORITY.ID;
                    $ctrl.datasumitformedit.SoVanBanID = $scope.SOVANBANID.ID;
                    $ctrl.datasumitformedit.OrganName = $scope.OrganName.VALUENAME;
                    $ctrl.datasumitformedit.FileDinhKem = FileDinhKem;
                    let id = $ctrl.datasumitformedit.IssuedDate;
                    let dd = $ctrl.datasumitformedit.DueDate;
                    $ctrl.datasumitformedit.IssuedDate = new Date(id).toUTCString().split(' ').slice(0, 4).join(' ');
                    $ctrl.datasumitformedit.DueDate = new Date(dd).toUTCString().split(' ').slice(0, 4).join(' ');
                    var resp = loginservice.postdata("api/QLVanBan/ThemVanBanDen", $.param($ctrl.datasumitformedit));
                    resp.then(function (response) {
                        $ctrl.datasumitformedit.IssuedDate = id;
                        $ctrl.datasumitformedit.DueDate = dd;
                        alert(response.data);
                        //setTimeout(function () { window.location.href = ""; }, 1000);
                        //$ctrl.datasumitformedit = response.data;
                        //alert("Cập nhật thành công!");
                        //$ctrl.resetForm();
                        //$ctrl.sumitformedit = {};
                    }
                        , function errorCallback(response) {
                            alert("Cập nhật xử lý thất bại bại vui lòng kiểm tra lại !");
                        });
                }

                function getVanBanDen() {
                    blockUI.start();
                    var resp = loginservice.getdata("api/QLVanBan/getVanBanDen");
                    resp.then(function (response) {
                        $scope.DsVanBan = response.data;
                        blockUI.stop();
                    }
                        , function errorCallback(response) {
                            $scope.datatree = [];
                            blockUI.stop();
                            $scope.actionbp = true;
                        });
                }

                function changeFormat(d, m, y) {
                    return y + "-" + m + "-" + d;
                }

                $ctrl.ok = function () {
                    $ctrl.presult = "0";
                };

                $ctrl.cancel = function () {
                    $uibModalInstance.close('cancel');
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
                        var type = '|' + item.name.slice(item.name.lastIndexOf('.') + 1) + '|';
                        //debugger
                        if ('|pdf|tif|docx|doc|png|jpeg|bmp|gif|'.indexOf(type.toLowerCase()) !== -1)
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

                $scope.removeFile = function (item, index) {
                    uploader.removeFromQueue(item);
                    removeFile(item.file.name);
                    FileDinhKem.splice(index, 1);
                }

                uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                    //console.info('onWhenAddingFileFailed', item, filter, options);
                };

                uploader.onAfterAddingFile = function (fileItem) {
                    fileItem.upload();
                    let item = {
                        LOAI: 100,
                        TENFILE: fileItem.file.name,
                        MOTA: "Mô Tả Test",
                        TRANGTHAI: 0,
                        LOAIFILE: fileItem.file.type,
                        SIZEFILE: fileItem.file.size,
                        VITRIID: 100
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
                //loaddataedit();

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

                ////////////////////--------------- MULTIPLE SELECT ------------///////////////
                var vm = this;

                vm.disabled = undefined;

                vm.searchEnabled = undefined;

                vm.setInputFocus = function () {
                    $scope.$broadcast('UiSelectDemo1');
                };

                vm.enable = function () {
                    vm.disabled = false;
                };

                vm.disable = function () {
                    vm.disabled = true;
                };

                vm.enableSearch = function () {
                    vm.searchEnabled = true;
                };

                vm.disableSearch = function () {
                    vm.searchEnabled = false;
                };

                vm.clear = function () {
                    vm.person.selected = undefined;
                    vm.address.selected = undefined;
                    vm.country.selected = undefined;
                };

                vm.someGroupFn = function (item) {

                    if (item.name[0] >= 'A' && item.name[0] <= 'M')
                        return 'From A - M';

                    if (item.name[0] >= 'N' && item.name[0] <= 'Z')
                        return 'From N - Z';

                };

                vm.firstLetterGroupFn = function (item) {
                    return item.name[0];
                };

                vm.reverseOrderFilterFn = function (groups) {
                    return groups.reverse();
                };

                vm.personAsync = { selected: "wladimir@email.com" };

                vm.peopleAsync = [];

                $timeout(function () {
                    vm.peopleAsync = [
                        { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States' },
                        { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina' },
                        { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
                        { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador' },
                        { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador' },
                        { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States' },
                        { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia' },
                        { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador' },
                        { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia' },
                        { name: 'Nicolás', email: 'nicole@email.com', age: 43, country: 'Colombia' }
                    ];
                }, 3000);

                vm.counter = 0;

                vm.onSelectCallback = function (item, model) {
                    vm.counter++;
                    vm.eventResult = { item: item, model: model };
                };

                vm.removed = function (item, model) {
                    vm.lastRemoved = {
                        item: item,
                        model: model
                    };
                };

                vm.tagTransform = function (newTag) {
                    var item = {
                        name: newTag,
                        email: newTag.toLowerCase() + '@email.com',
                        age: 'unknown',
                        country: 'unknown'
                    };

                    return item;
                };

                vm.singleDemo = {};

                vm.singleDemo.color = '';

                $scope.multipleDemo.selectedPeople2 = $scope.multipleDemo.selectedPeople;

                //$scope.multipleDemo.selectedPeopleWithGroupBy = [$scope.people[8], $scope.people[6]];

                $scope.multipleDemo.selectedPeopleSimple = ['samantha@email.com', 'wladimir@email.com'];

                $scope.multipleDemo.removeSelectIsFalse = [$scope.people[2], $scope.people[0]];

                vm.appendToBodyDemo = {
                    remainingToggleTime: 0,
                    present: true,
                    startToggleTimer: function () {
                        var scope = vm.appendToBodyDemo;
                        var promise = $interval(function () {
                            if (scope.remainingTime < 1000) {
                                $interval.cancel(promise);
                                scope.present = !scope.present;
                                scope.remainingTime = 0;
                            } else {
                                scope.remainingTime -= 1000;
                            }
                        }, 1000);
                        scope.remainingTime = 3000;
                    }
                };

                $scope.GuiVanBan = function () {
                    console.log($scope.multipleDemo.selectedPeople);
                    if ($scope.multipleDemo.selectedPeople.length == 0) {
                        alert("Xin vui lòng chọn danh sách người nhận văn bản này");
                        return;
                    }
                    $scope.dsNhanVB = [];
                    for (let i = 0; i < $scope.multipleDemo.selectedPeople.length; i++) {
                        let item = {
                            IDVANBAN: $scope.objVB.ID,
                            CANBO: $scope.multipleDemo.selectedPeople[i].USERNAME,
                            NGAYMO: null,
                        }
                        $scope.dsNhanVB.push(item);
                    }
                    var resp = loginservice.postdataNormal("api/QLVanBan/GuiVanBanDen", $scope.dsNhanVB);
                    resp.then(function (response) {
                        alert(response.data);
                    }
                        , function errorCallback(response) {
                            console.log(response);
                        });
                }

                // Xóa người tham gia khỏi mảng + db
                $scope.removed = function (item, model) {
                    var resp = loginservice.postdata("api/QLVanBan/XoaCanBo", $.param({ valstring1: item.USERNAME, valint1: $scope.objVB.ID }));
                    resp.then(function (response) {
                        let index = $scope.objVB.NguoiThamGia.findIndex(x => x.USERNAME == item.USERNAME);
                        $scope.objVB.NguoiThamGia.splice(index, 1);
                    }
                        , function errorCallback(response) {
                            console.log(response.data.message);
                        });
                }

                ////////////////// AUTOCOMPLETE CỦA CƠ QUAN BAN HÀNH //////////////////////
                $scope.countryList = [];

                getDanhMuc();

                function getDanhMuc() {
                    var resp;
                    resp = loginservice.getdata("api/QLVanBan/getDanhMuc");
                    resp.then(function (response) {
                        for (let i = 0; i < response.data.length; i++) {
                            $scope.countryList[i] = response.data[i].VALUENAME;
                        }
                        $scope.DsDanhMuc = response.data;
                        $scope.OrganName = $scope.DsDanhMuc[0];
                        $ctrl.datasumitformedit.OrganName = $scope.OrganName.VALUENAME;
                    }
                        , function errorCallback(response) {

                        });
                }

                //$scope.countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda"];

                $scope.complete = function (string) {
                    var output = [];
                    angular.forEach($scope.countryList, function (country) {
                        if (country.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                            output.push(country);
                        }
                    });
                    $scope.filterCountry = output;
                }

                $scope.fillTextbox = function (string) {
                    $scope.country = string;
                    $scope.filterCountry = null;
                }
            }])
        ;
}());