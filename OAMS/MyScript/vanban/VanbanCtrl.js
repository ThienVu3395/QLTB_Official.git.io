
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

                let itemLoc = {
                    Start: ($scope.bigCurrentPage - 1) * $scope.itemsPerPage,
                    End: $scope.itemsPerPage,
                }

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
                    if (data.roleName == "Admin") {
                        getVanBanDen_Admin();
                    }
                    else {
                        getVanBanDen_CanBo(data.username);
                    }
                }

                function getVanBanDen_CanBo(canbo) {
                    blockUI.start();
                    var resp = loginservice.getdata("api/QLVanBan/getVanBanDen_CanBo?CANBO=" + canbo);
                    resp.then(function (response) {
                        $scope.DsVanBan = response.data;
                        //console.log($scope.DsVanBan);
                        blockUI.stop();
                    }
                        , function errorCallback(response) {
                            $scope.datatree = [];
                            blockUI.stop();
                            $scope.actionbp = true;
                        });
                }

                function getVanBanDen_Admin() {
                    blockUI.start();
                    var resp = loginservice.postdata("api/QLVanBan/getVanBanDen_Admin", $.param(itemLoc));
                    resp.then(function (response) {
                        $scope.DsVanBan = response.data;
                        $scope.bigTotalItems = $scope.DsVanBan[0].Total;
                        blockUI.stop();
                    }
                        , function errorCallback(response) {
                            $scope.datatree = [];
                            blockUI.stop();
                            $scope.actionbp = true;
                        });
                }

                $scope.PhanTrang = function () {
                    blockUI.start();
                    itemLoc.Start = ($scope.bigCurrentPage - 1) * $scope.itemsPerPage;
                    itemLoc.End = $scope.itemsPerPage;
                    var resp = loginservice.postdata("api/QLVanBan/getVanBanDen_Admin", $.param(itemLoc));
                    resp.then(function (response) {
                        $scope.DsVanBan = response.data;
                        $scope.bigTotalItems = $scope.DsVanBan[0].Total;
                        blockUI.stop();
                    }
                        , function errorCallback(response) {
                            $scope.datatree = [];
                            blockUI.stop();
                            $scope.actionbp = true;
                        });
                }

                $scope.setItemPerPages = function () {
                    $scope.itemsPerPage = $scope.page;
                    $scope.bigCurrentPage = 1;
                    $scope.PhanTrang();
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
                        getdataInnit();
                        if (c == 1) {
                            $scope.items = {};
                            $scope.opennew();
                        }

                    }, function () {
                    });
                }

                $scope.ChuyenVB = function (item) {
                    console.log(item);
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
            }])
        ;
}());