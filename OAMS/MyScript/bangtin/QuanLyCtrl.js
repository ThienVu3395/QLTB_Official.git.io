angular.module("oamsapp")
    .controller("adminBT", function ($scope, CommonController, FileUploader, blockUI, $timeout, $log) {
        // Init cho trang quản trị
        $scope.currentPage = 1;
        $scope.itemPerPage = 5;
        $scope.Init = function (status) {
            $scope.DsLoaiTin = [];
            $scope.LayDanhSachLoaiTin();
            var hamcho = function () {
                if ($scope.DsLoaiTin.length == 0) {
                    $timeout(hamcho, 300);
                }
                else {
                    blockUI.stop();
                    $scope.currentPage = 1;
                    let limit = ($scope.currentPage - 1) * $scope.itemPerPage;
                    $scope.param = "?page=" + limit + "&pageLimit=" + $scope.itemPerPage;
                    if (status == 'qlbv') {
                        $scope.TieuDe = "Bài Viết";
                        $scope.status = "qlbv";
                        $scope.LayBaiViet();
                    }
                    else if (status == 'qlbl') {
                        $scope.TieuDe = "Bình Luận";
                        $scope.status = "qlbl";
                        $scope.LayBinhLuan();
                    }
                }
            }
            $timeout(hamcho, 300);
        }

        // Lấy Danh Sách Loại Tin
        $scope.LayDanhSachLoaiTin = function () {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachLoaiTin, '');
            res.then(
                function succ(response) {
                    $scope.DsLoaiTin = response.data;
                },

                function errorCallback(response) {
                    return response.data.message;
                }
            );
        }

        // Lấy Toàn Bộ Danh Sách Bài Viết
        $scope.LayBaiViet = function () {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachBaiViet, $scope.param);
            res.then(
                function succ(response) {
                    $scope.DanhSach = response.data;
                    $scope.totalItems = $scope.DanhSach[0].CountTin;
                    $scope.Tong = $scope.totalItems + " Bài Viết";
                    blockUI.stop();
                },

                function errorCallback(response) {
                    return response.data.message;
                }
            );
        }

        // Lấy Toàn Bộ Danh Sách Bình Luận
        $scope.LayBinhLuan = function () {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_LayBinhLuan, $scope.param);
            res.then(
                function succ(response) {
                    $scope.DanhSach = response.data;
                    $scope.totalItems = $scope.DanhSach.length;
                    $scope.Tong = $scope.totalItems + " Bình Luận";
                    blockUI.stop();
                },

                function errorCallback(response) {
                    return response.data.message;
                }
            );
        }

        // Lấy Danh Sách Phân Trang
        $scope.LayDanhSach_PhanTrang = function (status) {
            let limit = ($scope.currentPage - 1) * $scope.itemPerPage;
            $scope.param = "?page=" + limit + "&pageLimit=" + $scope.itemPerPage;
            if (status == 'qlbl') {
                $scope.LayBinhLuan();
            }
            else if (status == 'qlbv') {
                $scope.LayBaiViet();
            }
        }

        // Hiển Thị Ngày Giờ
        $scope.ReturnDate = function (date) {
            return moment(date).format("DD/MM/YYYY h:mm:ss a");
        }

        // Lấy Chi Tiết Bài Viết
        $scope.LayChiTietBaiViet = function () {
            let variable = document.getElementById("mess0");
            if (variable.className == "message-item message-unread message-inline-open") {
                variable.className = "message-item message-unread";
                document.getElementById("content0").className = "message-content hide";
            }
            else if (variable.className == "message-item message-unread") {
                variable.className = "message-item message-unread message-inline-open";
                document.getElementById("content0").className = "message-content";
            }
        }
    })