(function () {
    "use strict"
    angular.module("oamsapp")
    .controller("dsnhanvienCtrl", ["$scope", "$timeout", "$http", "$uibModal", "$document", "blockUI", "appSettings", "loginservice", "userProfile",
function ($scope, $timeout, $http, $uibModal, $document,blockUI,  appSettings, loginservice, userProfile) {
    var tree;
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
        getdataInnit();
        $scope.actionbp = false;
    };
    $scope.datatree = [];
    $scope.my_tree = tree = {};
    getdataphongban();
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
                    getdataInnit();
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
        if ($scope.idselect.USERNAME != irow.USERNAME) {
            $scope.action = false;
            $scope.idselect = irow;
        }
    };
    function getdataInnit() {
        var data = userProfile.getProfile();
        if (data.isLoggedIn) {
            $scope.userName = data.username;
            var resp = loginservice.postdata("api/admin/getalldatanhanvien", $.param({ valint1: $scope.CurrentPage, valstring1: $scope.nodeselectID }));
            resp.then(function (response) {
                $scope.dataInnit = response.data.pdata;
                $scope.TotalItems = response.data.TotalItems;
                $scope.perPage = response.data.perPage;
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
    $scope.editdatauser = function () {
        $scope.items = $scope.idselect;
        $scope.opennew();
    }

    $scope.deletedatauser = function () {
        $scope.idselect = $scope.idselect;
        if (confirm("Bạn có muốn khóa dòng dữ liệu này?")) {
            var resp = loginservice.postdata("api/admin/khoataikhoan", $.param($scope.idselect));
            resp.then(function (response) {
                getdataInnit();
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
            controller: 'editnhanvienCtrl',
            controllerAs: '$ctrl',
            //size: 'lg',
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
    $scope.newdata = function () {
        $scope.itempb = {};
        $scope.opennewphongban();
    }
    $scope.editdata = function () {
        $scope.itempb = $scope.nodeselect;
        $scope.opennewphongban();
    }
    $scope.opennewphongban = function (parentSelector) {
        var parentElem =
          angular.element($document[0].querySelector('.main-content'));
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'bophanContent.html',
            controller: 'editphongbanCtrl',
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
            getdataphongban();
            if (c == 1) {
                $scope.items = {};
                $scope.opennew();
            }

        }, function () {
        });
    }
}])
    .controller('editnhanvienCtrl', ["$scope", "$http", "$uibModalInstance", "appSettings", "loginservice", "userProfile", "idselect",
function ($scope, $http, $uibModalInstance, appSettings, loginservice, userProfile, idselect) {
    var $ctrl = this;
    $ctrl.items = idselect;
    $ctrl.reqpass = true;
    if (idselect.USERNAME) $ctrl.reqpass = false
    $ctrl.presult = "";
    $ctrl.ok = function () {
        $ctrl.presult = "0";
    };
    $ctrl.sumitformedit = function () {
        savenewphong();
    };
    $ctrl.ok1 = function () {
        $ctrl.presult = "1";
    };
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $ctrl.dschucvu = [];
    $ctrl.dsbophan = [];
    getalldata();
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
    function validatePassword() {
        var newPassword = $ctrl.items.MATKHAU;
        var newPassword1 = $ctrl.items.MATKHAU1;
        if (!$ctrl.reqpass && $ctrl.items.MATKHAU == "") return true;
        var minNumberofChars = 6;
        var maxNumberofChars = 16;
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars) {
            alert("Mật khẩu cần chứa 1 ký tự số và 1 ký tự đặt biệt, có độ dài từ 6  đến 16!");
            return false;
        }
        if (!regularExpression.test(newPassword)) {
            alert("Mật khẩu cần chứa 1 ký tự số và 1 ký tự đặt biệt, có độ dài từ 6  đến 16!");
            return false;
        }
        if (newPassword != newPassword1) {
            alert("Mật khẩu xác nhận không đúng!");
            return false;
        }
        return true;
    }
    function savenewphong() {
        if (validatePassword()) {
            var data = userProfile.getProfile();
            if ($ctrl.reqpass) {
                if (data.isLoggedIn) {
                    var itemsave = {};
                    itemsave.Username = $ctrl.items.USERNAME;
                    itemsave.Password = $ctrl.items.MATKHAU;
                    itemsave.ConfirmPassword = $ctrl.items.MATKHAU1;
                    itemsave.HOLOT = $ctrl.items.HOLOT;
                    itemsave.TEN = $ctrl.items.TEN;
                    itemsave.CHUCVU = $ctrl.items.CHUCVU;
                    itemsave.BOPHAN = $ctrl.items.BOPHAN;
                    itemsave.Email = $ctrl.items.EMAIL;
                    itemsave.KHOA = $ctrl.items.KHOA ? $ctrl.items.KHOA : false;
                    var resp = loginservice.postdata("api/Account/Register", $.param(itemsave));
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
            else {
                if (data.isLoggedIn) {
                    var itemsave = {};
                    var resp = loginservice.postdata("api/admin/saveeditnguoidung", $.param($ctrl.items));
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
        }
    }
}])
    .controller('editphongbanCtrl', ["$scope", "$http", "$uibModalInstance", "appSettings", "loginservice", "userProfile", "idselect",
function ($scope, $http, $uibModalInstance, appSettings, loginservice, userProfile, idselect) {
    var $ctrl = this;
    $ctrl.items = idselect;
    $ctrl.reqpass = true;
    if (idselect.MAPHONG) $ctrl.reqpass = false
    $ctrl.presult = "";
    $ctrl.ok = function () {
        $ctrl.presult = "0";
    };
    $ctrl.sumitformedit = function () {
        savenewphongban();
    };
    $ctrl.ok1 = function () {
        $ctrl.presult = "1";
    };
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $ctrl.dschucvu = [];
    $ctrl.dsbophan = [];
    getalldata();
    function getalldata() {
        var resp1 = loginservice.getdata("api/admin/getallbophanroot");
        resp1.then(function (response) {
            $ctrl.dsbophan = response.data;
        }, function errorCallback(response) {

        });
    }
    function savenewphongban() {
        if ($ctrl.reqpass) {
            var resp = loginservice.postdata("api/admin/postnewphongban", $.param($ctrl.items));
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
            var resp = loginservice.postdata("api/admin/posteditphongban", $.param($ctrl.items));
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