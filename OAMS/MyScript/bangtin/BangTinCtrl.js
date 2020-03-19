angular.module("CommonApp")
    .controller("QlbtCrl", function ($scope, CommonController) {
        //Lấy danh sách Loại Tin
        $scope.LayDanhSachLoaiTin = function () {
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachLoaiTin, "");
            res.then(
                function succ(response) {
                    $scope.DanhSachLoaiTin = response.data;
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        //Lấy danh sách Tin Tức
        $scope.LayDanhSachTinTuc = function () {
            if (sessionStorage.length == 0) {
                var url = "http://" + window.location.host;
                window.location.href = url;
            }
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachTinTuc, "");
            res.then(
                function succ(response) {
                    $scope.DanhSachTinTuc = response.data;
                    console.log($scope.DanhSachTinTuc);
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Show chi tiết bài viết
        $scope.showBtn = function (index) {
            let detail = document.getElementById("tableDetail" + index);
            let btn = document.getElementById("showBtn" + index).childNodes[1];
            if (detail.className == "detail-row ng-scope") {
                detail.className = "detail-row open ng-scope";
                btn.className = "ace-icon fa fa-angle-double-up";
            }
            else {
                detail.className = "detail-row ng-scope";
                btn.className = "ace-icon fa fa-angle-double-down";
            }
        }
    })