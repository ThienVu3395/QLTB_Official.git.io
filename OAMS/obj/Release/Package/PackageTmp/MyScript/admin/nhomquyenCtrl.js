(function () {
    "use strict"
    angular.module("oamsapp")
    .controller("nhomquyenCtrl", ["$scope", "$timeout", "$http", "$uibModal", "$document", "blockUI", "appSettings", "loginservice", "userProfile",
function ($scope, $timeout, $http, $uibModal, $document, blockUI, appSettings, loginservice, userProfile) {
    
    $scope.actionbp = true;
    $scope.action = true;
    $scope.TotalItems = 0;
    $scope.CurrentPage = 1;
    $scope.maxSize = 5;
    $scope.perPage = 30;
    getdataInnit();
    $scope.pageChanged = function () {
        getdataInnit();
    };
    $scope.idselect = {};
    $scope.selectrows = function (irow) {
        if ($scope.idselect.MANHOM != irow.MANHOM) {
            $scope.actionbp = false;
            $scope.idselect = irow;
            getdataInnitu();
        }
    };
    function getdataInnit() {
        var data = userProfile.getProfile();
        if (data.isLoggedIn) {
            $scope.userName = data.username;
            var resp = loginservice.postdata("api/admin/getallnhomuser", $.param({ valint1: $scope.CurrentPage}));
            resp.then(function (response) {
                $scope.dataInnit = response.data.pdata;
                $scope.TotalItems = response.data.TotalItems;
                $scope.perPage = response.data.perPage;
                $scope.actionbp = true;
            }
            , function errorCallback(response) {
                $scope.actionbp = true;
            });
        }
    }
    //-------------------------------
    $scope.TotalItemsu = 0;
    $scope.CurrentPageu = 1;
    $scope.perPageu = 30;
    
    $scope.pageuChanged = function () {
        getdataInnitu();
    };
    $scope.idselectu = {};
    $scope.selectrowsu = function (irow) {
        if ($scope.idselectu.USERNAME != irow.USERNAME) {
            $scope.action = false;
            $scope.idselectu = irow;
        }
    };
    function getdataInnitu() {
        var data = userProfile.getProfile();
        if (data.isLoggedIn) {
            $scope.userName = data.username;
            var resp = loginservice.postdata("api/admin/getalldatanhanviengroup", $.param({ valint1: $scope.CurrentPageu, valstring1: $scope.idselect.MANHOM }));
            resp.then(function (response) {
                $scope.dataInnitu = response.data.pdata;
                $scope.TotalItemsu = response.data.TotalItems;
                $scope.perPageu = response.data.perPage;
                $scope.action = true;
            }
            , function errorCallback(response) {
                $scope.action = true;
            });
        }
    }
    $scope.newdatauser = function () {
        $scope.items = {};
        $scope.opennew();
    }


    $scope.deletedatauser = function () {
        $scope.idselect = $scope.idselect;
        if (confirm("Bạn có muốn xóa dòng dữ liệu này?")) {
            var resp = loginservice.postdata("api/admin/postremoveuser", $.param({ valstring1: $scope.idselect.MANHOM, valstring2: $scope.idselectu.USERNAME }));
            resp.then(function (response) {
                if (response.data == 1)
                    getdataInnitu();
                else alert("Xóa dữ liệu thất bại!");
            }
            , function errorCallback(response) {
                alert("Xóa dữ liệu thất bại!");
            });
        }
    }
    $scope.opennew = function (parentSelector) {
        var parentElem =
          angular.element($document[0].querySelector('.main-content'));
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'nhanvienContent.html',
            controller: 'dsnhanvienCtrl',
            controllerAs: '$ctrl',
            size: 'lg',
            appendTo: parentElem,
            resolve: {
                idselect: function () {
                    return $scope.idselect;
                }
            }
        });
        modalInstance.result.then(function (c) {
            getdataInnitu();

        }, function () {
            getdataInnitu();
        });
    }
    $scope.newdata = function () {
        $scope.itempb = {};
        $scope.opennewnhom();
    }
    $scope.editdata = function () {
        $scope.itempb = $scope.idselect;
        $scope.opennewnhom();
    }
    $scope.opennewnhom = function (parentSelector) {
        var parentElem =
          angular.element($document[0].querySelector('.main-content'));
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'nhomContent.html',
            controller: 'editnhomCtrl',
            controllerAs: '$ctrl',
            //size: 'lg',
            appendTo: parentElem,
            resolve: {
                idselect: function () {
                    return $scope.itempb;
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
    .controller('dsnhanvienCtrl', ["$scope", "$http", "$uibModalInstance", "appSettings", "loginservice", "userProfile", "idselect", "blockUI",
function ($scope, $http, $uibModalInstance, appSettings, loginservice, userProfile, idselect, blockUI) {
    var $ctrl = this;
    $ctrl.items = idselect;

    var tree;
    $ctrl.nodeselect = {};
    $ctrl.my_tree_handler = function (branch) {
        var _ref;
        if (!$ctrl.nodeselect.MAPHONG) {
            $ctrl.my_tree.on_expand_select();

        }
        $ctrl.nodeselect.MAPHONG = branch.id;
        $ctrl.nodeselect.TENPHONG = branch.label;
        $ctrl.nodeselect.DVQUANLY = "";
        if ((_ref = branch.data) != null ? _ref.description : void 0) {
            $ctrl.nodeselect.DVQUANLY = branch.data.description;
        }
        //userProfile.saveitem("muclucselect", 0);
        $ctrl.nodeselectID = $ctrl.nodeselect.MAPHONG;
        $ctrl.my_tree.expand_branch(branch);
        var p = $ctrl.my_tree.get_parent_branch(branch);
        while (p) {
            $ctrl.my_tree.expand_branch(p);
            p = $ctrl.my_tree.get_parent_branch(p);
        }
        getdataInnit();
    };
    $ctrl.datatree = [];
    $ctrl.my_tree = tree = {};
    getdataphongban();
    function getdataphongban() {
        blockUI.start();
        var data = userProfile.getProfile();
        var resp = loginservice.getdata("api/admin/getalltreephongban");
        resp.then(function (response) {
            if (response.data.length > 0) {
                $ctrl.datatree = response.data;
                $ctrl.nodeselectID = $ctrl.datatree[0].id;
                $ctrl.nodeselect.MAPHONG = undefined;
                $ctrl.actionbp = false;
                getdataInnit();
            }

            blockUI.stop();
        }
        , function errorCallback(response) {
            $ctrl.datatree = [];
            blockUI.stop();
            $ctrl.actionbp = true;
        });
    }


    $ctrl.TotalItems = 0;
    $ctrl.CurrentPage = 1;
    $ctrl.maxSize = 5;
    $ctrl.perPage = 30;
    getdataInnit();
    $ctrl.pageChanged = function () {
        getdataInnit();
    };
    $ctrl.idselect = {};
    $ctrl.selectrows = function (irow) {
        if ($ctrl.idselect.USERNAME != irow.USERNAME) {
            $ctrl.action = false;
            $ctrl.idselect = irow;
        }
    };
    function getdataInnit() {
        var data = userProfile.getProfile();
        var resp = loginservice.postdata("api/admin/getalldatanhanvienbygroup", $.param({ valint1: $ctrl.CurrentPage, valstring1: $ctrl.nodeselectID, valstring2: $ctrl.items.MANHOM }));
        resp.then(function (response) {
            $ctrl.dataInnit = response.data.pdata;
            $ctrl.TotalItems = response.data.TotalItems;
            $ctrl.perPage = response.data.perPage;
            $ctrl.action = true;
            $ctrl.checkall = false;
        }
        , function errorCallback(response) {
            $ctrl.action = true;
        });
    }
    $ctrl.checkallcheck = function(){
        for (var i = 0 ; i < $ctrl.dataInnit.length; i++) {
            $ctrl.dataInnit[i].CHECKED = $ctrl.checkall;
        }
    }
    $ctrl.ok = function () {
        $ctrl.presult = "0";
    };
    $ctrl.sumitformedit = function () {
        savejoingoup();
    };
    $ctrl.ok1 = function () {
        $ctrl.presult = "1";
    };
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    function savejoingoup() {
        var resp = loginservice.postdata("api/admin/postsavejoingroup", $.param({ pdata: $ctrl.dataInnit, MANHOM: $ctrl.items.MANHOM }));
        resp.then(function (response) {
            if (response.data == 1)
                alert("Lưu thành công!");
            else 
                alert("Lưu không thành công!");
        }
        , function errorCallback(response) {
            alert("Không kết nối được với máy chủ!");
        });
    }
}])
    .controller('editnhomCtrl', ["$scope", "$http", "$uibModalInstance", "appSettings", "loginservice", "userProfile", "idselect",
function ($scope, $http, $uibModalInstance, appSettings, loginservice, userProfile, idselect) {
    var $ctrl = this;
    $ctrl.items = idselect;
    $ctrl.reqpass = true;
    if (idselect.TENNHOM) $ctrl.reqpass = false
    $ctrl.presult = "";
    $ctrl.ok = function () {
        $ctrl.presult = "0";
    };
    $ctrl.sumitformedit = function () {
        savenewnhom();
    };
    $ctrl.ok1 = function () {
        $ctrl.presult = "1";
    };
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    function savenewnhom() {
        if ($ctrl.reqpass) {
            var resp = loginservice.postdata("api/admin/postnewnhom", $.param($ctrl.items));
            resp.then(function (response) {
                if ($ctrl.presult == "0")
                    $uibModalInstance.close(0);
                else {
                    $uibModalInstance.close(1);
                }
            }
            , function errorCallback(response) {
                alert("Kết nối đến máy chủ thất bại!");
            });
        }
        else {
            var resp = loginservice.postdata("api/admin/posteditnhom", $.param($ctrl.items));
            resp.then(function (response) {
                if ($ctrl.presult == "0")
                    $uibModalInstance.close(0);
                else {
                    $uibModalInstance.close(1);
                }
            }
            , function errorCallback(response) {
                alert("Kết nối đến máy chủ thất bại!");
            });
        }
    }
}])
    ;
}());