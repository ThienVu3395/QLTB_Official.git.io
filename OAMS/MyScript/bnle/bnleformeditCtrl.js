
(function () {
    "use strict"
    angular.module("oamsapp")
    .controller('fromEditCtrl', //["$scope", "$timeout", "$http", "$uibModal", "$uibModalInstance", "$document", "appSettings", "loginservice", "userProfile",
        function ($scope, $http, $uibModalInstance, idselect, action, tablename, tablefor, formname, loginservice, userProfile) {
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
                            if ($ctrl.pControl[i].ctype == 'foreign') {
                                var t = userProfile.getsaveitem(tablefor + "f");
                                if (t != null) {
                                    if (!$ctrl.pControl[i].values) {
                                        $ctrl.pControl[i].values = t;
                                    }
                                }
                            }
                                
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