(function () {
    "use strict"
    angular.module("oamsapp")
    .controller("phanquyenCtrl", ["$scope", "$timeout", "$http", "$uibModal", "$document", "blockUI", "appSettings", "loginservice", "userProfile",
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
        if ($scope.changed) {
            if (confirm('Bạn có muốn lưu lại sự thay đổi không?')) {
                $scope.savechange();
            }
        }
        $scope.changed = false;
        if ($scope.idselect.MANHOM != irow.MANHOM) {
            $scope.actionbp = false;
            $scope.idselect = irow;
            $scope.checkall = false;
            getdataInnitu();
        }
    };
    function getdataInnit() {
        var data = userProfile.getProfile();
        if (data.isLoggedIn) {
            $scope.userName = data.username;
            var resp = loginservice.postdata("api/admin/getallnhomuser", $.param({ valint1: $scope.CurrentPage }));
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

    $scope.dataInnitu = [];
    $scope.pgroup = [];
    function getdataInnitu() {
        var data = userProfile.getProfile();
        if (data.isLoggedIn) {
            $scope.userName = data.username;
            var resp = loginservice.postdata("api/admin/getallfunctionbygroup", $.param({ valstring2: $scope.idselect.MANHOM }));
            resp.then(function (response) {
                $scope.dataInnitu = response.data.pdata;
                $scope.pgroup = response.data.pgroup;
            }
            , function errorCallback(response) {
                $scope.dataInnitu = [];
                $scope.pgroup = [];
            });
        }
    }
    $scope.changed = false;
    $scope.checkchange = function () {
        $scope.changed = true;
    }

    $scope.checkallcheck = function () {
        for (var i = 0 ; i < $scope.dataInnitu.length; i++) {
            $scope.dataInnitu[i].CHECKED = $scope.checkall;
        }
    }
    $scope.savechange = function () {
        var resp = loginservice.postdata("api/admin/postsavechangequyen", $.param({ pdata: $scope.dataInnitu, MANHOM: $scope.idselect.MANHOM }));
        resp.then(function (response) {
            if (response.data == 1) {
                alert('Ghi nhận dữ liệu thành công!');
            }
            else {
                alert('Ghi nhận dữ liệu thất bại!');
            }
            getdataInnitu();
            $scope.changed = false;
        }
        , function errorCallback(response) {
            alert('Kết nối với máy chủ thất bại!');
        });
    }
}])
    ;
}());