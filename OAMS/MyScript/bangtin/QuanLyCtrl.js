angular.module("oamsapp")
    .controller("adminBT", function ($scope, CommonController, FileUploader, blockUI, $timeout, $log) {
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
                        $scope.LayBaiViet();
                    }
                    else if (status == 'qlbl') {
                        $scope.TieuDe = "Bình Luận";
                        $scope.status = "qlbl";
                        //$scope.LayBinhLuan();
                    }
                    $scope.resetStatus();
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
        $scope.LayBaiViet = function () {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachBaiViet, $scope.param);
            res.then(
                function succ(response) {
                    $scope.DanhSach = response.data;
                    console.log($scope.DanhSach);
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
                $scope.LayBaiViet();
            }
        }

        // Lấy Chi Tiết Bài Viết
        $scope.LayChiTietBaiViet = function (index) {
            let variable = document.getElementById("mess" + index);
            if (variable.className == "message-item message-unread message-inline-open") {
                variable.className = "message-item message-unread";
                document.getElementById("content" + index).className = "message-content hide";
            }
            else if (variable.className == "message-item message-unread") {
                variable.className = "message-item message-unread message-inline-open";
                document.getElementById("content" + index).className = "message-content";
            }
        }

        // Lấy Chi Tiết Bình Luận
        $scope.ctBinhLuan = false;

        $scope.LayChiTietBinhLuan = function (MaTinTuc) {
            $scope.ctBinhLuan = true;
            document.getElementById("id-message-infobar").className = "message-infobar hide";
            document.getElementById("toolbarComment").className = "";
            document.getElementById("leftToolBar").className = "messagebar-item-left hide";
            document.getElementById("searchInput").className = "nav-search minimized hide";
            document.getElementById("contentComment").className = "message-container";
            document.getElementById("pagiMain").className = "message-footer clearfix hide";
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

        // Nút back trở ra để đổi giao diện về trạng thái như cũ
        $scope.resetStatus = function () {
            document.getElementById("id-message-infobar").className = "message-infobar";
            document.getElementById("toolbarComment").className = "hide";
            document.getElementById("leftToolBar").className = "messagebar-item-left";
            document.getElementById("searchInput").className = "nav-search minimized";
            document.getElementById("contentComment").className = "message-container hide";
            //document.getElementById("pagiMain").className = "message-footer clearfix";
            $scope.ctBinhLuan = false;
        }

        ///////////////// CÁC HÀM ĐỊNH NGHĨA RIÊNG ///////////
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