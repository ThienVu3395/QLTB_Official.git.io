
(function () {
    "use strict"
    angular.module("oamsapp")
        .controller('bnlegridCtrl',
        ["$scope", "$timeout", "$http", "$uibModal", "$document", "appSettings", "loginservice", "userProfile",
    function ($scope, $timeout, $http, $uibModal, $document, appSettings, loginservice, userProfile) {

        $scope.itemselect = "";
        $scope.datarows = [];
        $scope.datacols = [];
        $scope.TotalItems = 0;
        $scope.CurrentPage = 1;
        $scope.maxSize = 5;
        $scope.perPage = 20;
        $scope.action = true;
        $scope.viewmode = "";
        $scope.formname = "";
        $scope.funcid = getParameterByName("f");
        if ($scope.funcid) {
            getdataItems();
        }
        function getdataItems() {
            var data = userProfile.getProfile();
            if (data.isLoggedIn) {
                var resp = loginservice.postdata("api/funcbase/getalldatapage", $.param({ valint1: $scope.CurrentPage, valstring1: $scope.funcid }));
                resp.then(function (response) {
                    if (response.data != null) {
                        $scope.datarows = response.data.datarows;
                        $scope.datacols = response.data.datacols;
                        $scope.TotalItems = response.data.TotalItems;
                        $scope.perPage = response.data.PerPage;
                        $scope.viewmode = response.data.viewmode;
                        $scope.formname = response.data.formname;
                        $scope.itemselect = "";
                        $scope.action = true;
                    }
                }
                , function errorCallback(response) {
                    $scope.itemselect = "";
                    $scope.action = true;
                });
            }

        }
        $scope.itemedit = "";
        $scope.pageChanged = function () {
            getdataItems();
        }
        $scope.actionnew = true;
        $scope.selectitem = function (i) {
            $scope.action = false;
            $scope.itemselect = i.keyrow;
        }

        $scope.newdata = function () {
            $scope.itemedit = "";
            $scope.actionnew = true;
            $scope.opennewdata();
        }

        $scope.openedit = function () {
            $scope.itemedit = $scope.itemselect;
            $scope.actionnew = false;
            $scope.opennewdata();
        }

        $scope.delete = function () {
            if (confirm("Bạn có muốn dòng dữ liệu này không?"))
                deleteitem();
        }
        function deleteitem() {
            var data = userProfile.getProfile();
            if (data.isLoggedIn) {
                var resp = loginservice.postdata("api/funcbase/deletedata", $.param({ Tablename: $scope.funcid, id: $scope.itemselect }));
                resp.then(function (response) {
                    getdataItems();
                }
                , function errorCallback(response) {
                    alert("Xóa dữ liệu không thành công!");
                });
            }
        }

        $scope.opennewdata = function () {
            var parentElem =
                  angular.element($document[0].querySelector('.main-content'));
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'editorItem.html',
                controller: 'ModalPopupCtrl',
                controllerAs: '$ctrl',
                size: $scope.viewmode,
                appendTo: parentElem,
                resolve: {
                    idselect: function () {
                        return $scope.itemedit;
                    },
                    action: function () {
                        return $scope.actionnew;
                    },
                    tablename: function () {
                        return $scope.funcid;
                    },
                    formname: function () {
                        return $scope.formname;
                    },
                    
                    loginservice: loginservice,
                    userProfile: userProfile
                }
            });
            modalInstance.result.then(function (c) {
                getdataItems();
                if (c == 1) {
                    $scope.itemedit = {};
                    $scope.newdata();
                }
            }, function () {
            });
        }
    }])
    .controller('ModalPopupCtrl', //["$scope", "$timeout", "$http", "$uibModal", "$uibModalInstance", "$document", "appSettings", "loginservice", "userProfile",
        function ($scope, $http, $uibModalInstance, idselect, action, tablename,formname, loginservice, userProfile) {
            var $ctrl = this;
            $ctrl.items = idselect;
            $ctrl.action = action;
            $ctrl.tablename = tablename;
            /////////////
            loaddataedit();
            $ctrl.title = "";
            if ($ctrl.action) {
                $ctrl.title = "Thêm mới " + formname;
            }
            else {
                $ctrl.title = "Cập nhật " + formname;
            }
            function loaddataedit() {
                var data = userProfile.getProfile();
                var resp = loginservice.postdata("api/funcbase/getnewdata", $.param({ Tablename: $ctrl.tablename, id: $ctrl.items }));
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
            //////////////

            $ctrl.ok = function () {
                $ctrl.presult = "0";
            };
            $ctrl.sumitformedit = function () {
                savenewdata();
            };
            $ctrl.ok1 = function () {
                $ctrl.presult = "1";
            };
            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            function savenewdata() {
                $ctrl.itemsave = {};
                var data = userProfile.getProfile();
                $ctrl.itemsave.items = {};// = $scope.pControl;
                for (var i = 0; i < $ctrl.pControl.length; i++) {
                    $ctrl.itemsave.id = $ctrl.items;
                    $ctrl.itemsave.Tablename = $ctrl.tablename;
                    $ctrl.itemsave.items[i] = {};
                    $ctrl.itemsave.items[i].id = $ctrl.pControl[i].id;
                    $ctrl.itemsave.items[i].ctype = $ctrl.pControl[i].ctype;
                    $ctrl.itemsave.items[i].label = $ctrl.pControl[i].label;
                    $ctrl.itemsave.items[i].namecol = $ctrl.pControl[i].namecol;
                    $ctrl.itemsave.items[i].viewed = $ctrl.pControl[i].viewed;
                    $ctrl.itemsave.items[i].required = $ctrl.pControl[i].required;
                    if ($ctrl.pControl[i].ctype == 'calendar') {
                        $ctrl.itemsave.items[i].values = $ctrl.pControl[i].values ? $ctrl.pControl[i].values.toISOString().slice(0, 10) : '';
                    }
                    else {
                        $ctrl.itemsave.items[i].values = $ctrl.pControl[i].values;
                    }

                }
                if ($ctrl.action) {
                    if (data.isLoggedIn) {
                        var resp = loginservice.postdata("api/funcbase/savenewdata", $.param($ctrl.itemsave));
                        resp.then(function (response) {
                            if ($ctrl.presult == "0")
                                $uibModalInstance.close(0);
                            else {
                                $uibModalInstance.close(1);
                            }
                        }
                        , function errorCallback(response) {
                            alert("Ghi nhận dữ liệu không thành công!");
                        });
                    }
                }
                else {
                    if (data.isLoggedIn) {
                        var resp = loginservice.postdata("api/funcbase/saveeditdata", $.param($ctrl.itemsave));
                        resp.then(function (response) {
                            if ($ctrl.presult == "0")
                                $uibModalInstance.close(0);
                            else {
                                $uibModalInstance.close(1);
                            }
                        }
                        , function errorCallback(response) {
                            alert("Ghi nhận dữ liệu không thành công!");
                        });
                    }
                }
            }
        });
}());