
(function () {
    "use strict"
    angular.module("oamsapp")
        .controller("VanbanCtrl", ["$scope", "$timeout", "$http", "$uibModal", "$document", "blockUI", "appSettings", "loginservice", "userProfile",
            function ($scope, $timeout, $http, $uibModal, $document, blockUI, appSettings, loginservice, userProfile) {
                var tree;
                $scope.itemsPerPage = 10;
                $scope.maxSize = 10;
                $scope.page = "10";
                $scope.bigTotalItems = 1;
                $scope.bigCurrentPage = 1;
                $scope.start = ($scope.bigCurrentPage - 1) * $scope.itemsPerPage;

                $scope.tt0 = true;
                $scope.tt1 = false;
                $scope.tt3 = false;
                $scope.tt4 = false;
                $scope.tttatca = true;
                $scope.ttdaxem = false;
                $scope.ttchuaxem = false;
                $scope.SoVanBanID = 0;
                $scope.DaXem = -1;
                $scope.SearchString = "";
                $scope.LoaiVB = 0;
                $scope.FilesNumber = 3;

                $scope.nodeselect = {};

                $scope.actionbp = true;

                $scope.my_tree_handler = function (branch) {
                    var _ref;
                    if (!$scope.nodeselect.MAPHONG) {
                        $scope.my_tree.on_expand_select();

                    }
                    $scope.nodeselect.MAPHONG = branch.id;
                    $scope.nodeselect.TENPHONG = branch.label;
                    $scope.nodeselect.DVQUANLY = "";
                    if ((_ref = branch.data) != null ? _ref.description : void 0) {
                        $scope.nodeselect.DVQUANLY = branch.data.description;
                    }
                    //userProfile.saveitem("muclucselect", 0);
                    $scope.nodeselectID = $scope.nodeselect.MAPHONG;
                    $scope.my_tree.expand_branch(branch);
                    var p = $scope.my_tree.get_parent_branch(branch);
                    while (p) {
                        $scope.my_tree.expand_branch(p);
                        p = $scope.my_tree.get_parent_branch(p);
                    }
                    //getdataInnit();
                    $scope.actionbp = false;
                };

                $scope.datatree = [];

                $scope.my_tree = tree = {};

                getdataphongban();

                checkTrangThai();

                function getdataphongban() {
                    blockUI.start();
                    var data = userProfile.getProfile();
                    if (data.isLoggedIn) {
                        $scope.userName = data.username;
                        var resp = loginservice.getdata("api/admin/getalltreephongban");
                        resp.then(function (response) {
                            if (response.data.length > 0) {
                                $scope.datatree = response.data;
                                $scope.nodeselectID = $scope.datatree[0].id;
                                $scope.nodeselect.MAPHONG = undefined;
                                $scope.actionbp = false;
                                //getdataInnit();
                            }

                            blockUI.stop();
                        }
                            , function errorCallback(response) {
                                $scope.datatree = [];
                                blockUI.stop();
                                $scope.actionbp = true;
                            });
                    }
                }

                function checkTrangThai() {
                    var data = userProfile.getProfile();
                    $scope.userName = data.username;
                    $scope.roleName = data.roleName;
                    //console.log($scope.roleName);
                    if (data.roleName == "Admin") {
                        //getVanBanDen_Admin();
                        $scope.userName = "";
                        LocTheoSo();
                    }
                    else {
                        //getVanBanDen_CanBo(data.username);
                        LocTheoSo();
                    }
                }

                $scope.opennewVanban = function (item) {
                    var parentElem =
                        angular.element($document[0].querySelector('.main-content'));
                    var modalInstance = $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'vanbandenEdit.html',
                        controller: 'vanbandenCtrl',
                        controllerAs: '$ctrl',
                        size: 'full',
                        appendTo: parentElem,
                        resolve: {
                            idselect: function () {
                                if (item != null) {
                                    return item;
                                }
                                else return null;
                            }
                        }
                    });
                    modalInstance.result.then(function (c) {
                        LocTheoSo();
                        //getdataInnit();
                        if (c == 1) {
                            $scope.items = {};
                            $scope.opennew();
                        }

                    }, function () {
                    });
                }

                $scope.viewfilepdf = function (tenFile) {
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
                                return tenFile;
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

                /////////////////// CHUYỂN VB SANG THÔNG BÁO ////////////////////
                $scope.ChuyenVB = function (item) {
                    var resp = loginservice.postdata("api/QLVanBan/ChuyenVB_SangThongBao", $.param(item));
                    resp.then(function (response) {
                        alert("Văn Bản Đã Được Chuyển Sang Thông Báo");
                        item.MOREINFO1 = response.data;
                    }
                        , function errorCallback(response) {
                            console.log(response.data.message);
                        });
                }

                /////////////////// PHÂN TRANG  ////////////////////
                $scope.PhanTrang = function () {
                    $scope.start = ($scope.bigCurrentPage - 1) * $scope.itemsPerPage;
                    LocTheoSo();
                }

                ///////////////// SET ITEMPERPAGES ////////////////////////
                $scope.setItemPerPages = function () {
                    $scope.itemsPerPage = $scope.page;
                    $scope.bigCurrentPage = 1;
                    $scope.start = ($scope.bigCurrentPage - 1) * $scope.itemsPerPage;
                    LocTheoSo();
                }

                /////////////////// TÌM KIẾM + LỌC THEO SỔ VÀ ĐÃ XEM-CHƯA XEM ////////////////////             
                function checkTT(svb) {
                    if (svb == 0) {
                        $scope.tt0 = true;
                        $scope.tt2 = false;
                        $scope.tt3 = false;
                        $scope.tt4 = false;
                        //checkTrangThai();
                    }
                    else if (svb == 2) {
                        $scope.tt0 = false;
                        $scope.tt2 = true;
                        $scope.tt3 = false;
                        $scope.tt4 = false;
                    }
                    else if (svb == 3) {
                        $scope.tt0 = false;
                        $scope.tt2 = false;
                        $scope.tt3 = true;
                        $scope.tt4 = false;
                    }
                    else if (svb == 4) {
                        $scope.tt0 = false;
                        $scope.tt2 = false;
                        $scope.tt3 = false;
                        $scope.tt4 = true;
                    }
                }

                function checkDaXem(tt) {
                    if (tt == -1) {
                        $scope.tttatca = true;
                        $scope.ttdaxem = false;
                        $scope.ttchuaxem = false;
                    }
                    else if (tt == 1) {
                        $scope.tttatca = false;
                        $scope.ttdaxem = true;
                        $scope.ttchuaxem = false;
                    }
                    else if (tt == 0) {
                        $scope.tttatca = false;
                        $scope.ttdaxem = false;
                        $scope.ttchuaxem = true;
                    }
                }

                $scope.SetSoVB = function (SoVanBanID) {
                    $scope.SoVanBanID = SoVanBanID;
                    checkTT(SoVanBanID);
                    LocTheoSo();
                }

                $scope.SetTrangThai = function (TrangThai) {
                    if ($scope.userName == "") {
                        return;
                    }
                    $scope.DaXem = TrangThai;
                    checkDaXem(TrangThai);
                    LocTheoSo();
                }

                $scope.TimKiem = function () {
                    LocTheoSo();
                }

                function LocTheoSo() {
                    blockUI.start();
                    var param = "?SoVanBanID=" + $scope.SoVanBanID + "&LoaiVB=" + $scope.LoaiVB + "&CANBO=" + $scope.userName + "&DaXem=" + $scope.DaXem + "&SearchString=" + $scope.SearchString + "&Start=" + $scope.start + "&End=" + $scope.itemsPerPage;
                    //console.log(param);
                    var resp = loginservice.getdata("api/QLVanBan/getVB_SearchFilterAll" + param);
                    resp.then(function (response) {
                        $scope.DsVanBan = response.data;
                        blockUI.stop();
                        //console.log($scope.DsVanBan);
                        if ($scope.DsVanBan.length == 0) {
                            alert("Không tìm thấy văn bản thỏa tiêu chí trên");
                            $scope.bigTotalItems = 0;
                        }
                        else $scope.bigTotalItems = response.data[0].Total;
                    }
                        , function errorCallback(response) {
                            $scope.datatree = [];
                            blockUI.stop();
                            $scope.actionbp = true;
                        });
                }              
            }])
        ;
}());