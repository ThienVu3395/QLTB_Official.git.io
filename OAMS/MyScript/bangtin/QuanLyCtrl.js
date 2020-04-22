angular.module("oamsapp")
    .controller("adminBT", function ($scope, CommonController, FileUploader, blockUI, $timeout, $log, $sce) {
        // Init cho trang quản trị
        $scope.itemsPerPage = 10;
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        $scope.Init = function (status) {
            $scope.DsLoaiTin = [];
            $scope.LayDanhSachLoaiTin();
            var hamcho = function () {
                if ($scope.DsLoaiTin.length == 0) {
                    $timeout(hamcho, 300);
                }
                else {
                    blockUI.stop();
                    $scope.bigCurrentPage = 1;
                    let limit = ($scope.bigCurrentPage - 1) * $scope.itemsPerPage;
                    $scope.param = "?page=" + limit + "&pageLimit=" + $scope.itemsPerPage;
                    if (status == 'qlbv') {
                        $scope.TieuDe = "Bài Viết";
                        $scope.status = "qlbv";
                        $scope.LayBaiVietTatCa();
                    }
                    else if (status == 'qlbl') {
                        $scope.TieuDe = "Bình Luận";
                        $scope.status = "qlbl";
                        //$scope.LayBinhLuan();
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
                    console.log(response.data.message);
                }
            );
        }

        // Lấy Toàn Bộ Danh Sách Bài Viết
        $scope.LayBaiVietTatCa = function () {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachBaiViet, $scope.param);
            res.then(
                function succ(response) {
                    $scope.DanhSach = response.data;
                    $scope.bigTotalItems = $scope.DanhSach[0].CountTin;
                    blockUI.stop();
                },

                function errorCallback(response) {
                    console.log(response.data.message);
                }
            );
        }

        // Lấy Bài Viết Theo Điều Kiện
        $scope.LayBaiViet_Loc = function (MaLoaiTin) {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachBaiViet_Loc, $scope.param + "&MaLoaiTin=" + MaLoaiTin);
            res.then(
                function succ(response) {
                    $scope.DanhSach = response.data;
                    $scope.bigTotalItems = $scope.DanhSach[0].CountTin;
                    blockUI.stop();
                },

                function errorCallback(response) {
                    console.log(response.data.message);
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
                    $scope.bigTotalItems = $scope.DanhSach.length;
                    blockUI.stop();
                },

                function errorCallback(response) {
                    console.log(response.data.message);
                }
            );
        }

        // Lấy Danh Sách Phân Trang
        $scope.LayDanhSach_PhanTrang = function (status) {
            let limit = ($scope.bigCurrentPage - 1) * $scope.itemsPerPage;
            $scope.param = "?page=" + limit + "&pageLimit=" + $scope.itemsPerPage;
            if (status == 'qlbl') {
                $scope.LayBinhLuan();
            }
            else if (status == 'qlbv') {
                $scope.LayBaiVietTatCa();
            }
        }

        // Lấy Chi Tiết Bài Viết
        $scope.LayChiTietBaiViet = function (MaTinTuc) {
            $scope.totalItems = 64;
            $scope.currentPage = 4;
            let param = "?MaTinTuc=" + MaTinTuc;
            var res = CommonController.getData(CommonController.urlAPI.API_LayChiTietBaiViet, param);
            res.then(
                function succ(response) {
                    $scope.TTBV = response.data;
                    console.log($scope.TTBV);
                    blockUI.stop();
                },

                function errorCallback(response) {
                    console.log(response.data.message);
                }
            );
        }

        // Lấy Chi Tiết Bình Luận
        $scope.LayChiTietBinhLuan = function (MaTinTuc) {
            let param = "?MaTinTuc=" + MaTinTuc;
            var res = CommonController.getData(CommonController.urlAPI.API_LayChiTietBinhLuan, param);
            res.then(
                function succ(response) {
                    $scope.TTBV = response.data;
                    console.log($scope.TTBV);
                    blockUI.stop();
                },

                function errorCallback(response) {
                    console.log(response.data.message);
                }
            );
        }

        ///////////////// CÁC HÀM ĐỊNH NGHĨA RIÊNG ///////////
        //Hàm chuyển chữ thành kiểu viết hoa đầu
        //$scope.capitalize = function (string) {
        //    return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
        //}

        // Render ra HTML
        $scope.htmlSafe = function (data) {
            return $sce.trustAsHtml(data);
        }

        // Hiển Thị Ngày Giờ
        $scope.ReturnDate = function (date) {
            return moment(date).format("DD/MM/YYYY , h:mm:ss a");
        }

        // Hàm cắt chữ
        $scope.SliceString = function (string, limit) {
            if (string.length > limit) {
                return string = "...";
            }
            else return "";
        }
    })