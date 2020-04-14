angular.module("oamsapp")
    .controller("TC00Ctrl", function ($scope, CommonController, $timeout, blockUI) {
        // Hàm + biến khởi tạo ban đầu
        $scope.totalItems = 64;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 4;
        $scope.ttshow = false;

        $scope.Init = function () {
            $scope.DanhSachLoaiTin = [];
            $scope.TieuDe = "Bảng Tin Tường Công Ty";
            $scope.LayDanhSachLoaiTin();
            var hamcho = function () {
                if ($scope.DanhSachLoaiTin.length == 0) {
                    $timeout(hamcho, 300);
                }
                else {
                    blockUI.stop();
                    $scope.currentPage = 1;
                    // Tạo biến tháng sinh nhật
                    $scope.MaLoaiTin = $scope.DanhSachLoaiTin[0].MaLoaiTin;
                    $scope.LayDanhSachBaiViet($scope.MaLoaiTin);
                    $scope.LayBaiVietTuong();
                    $scope.LaySinhNhat();
                }
            }
            $timeout(hamcho, 300);
        }

        // Lấy Danh sách loại tin
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

        // Lấy Danh Sách Bài Viết
        $scope.LayDanhSachBaiViet = function (MaLoaiTin) {
            let limit = ($scope.currentPage - 1) * $scope.itemsPerPage;
            $scope.MaLoaiTin = MaLoaiTin;
            $scope.param = "?page=" + limit + "&pageLimit=" + $scope.itemsPerPage + "&MaLoaiTin=" + MaLoaiTin;
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachBaiViet_TheoDanhMuc_PhanTrang, $scope.param);
            res.then(
                function succ(response) {
                    $scope.DanhSachTinTuc = response.data;
                    $scope.ttshow = false;
                    $scope.totalItems = $scope.DanhSachTinTuc[0].CountTin;
                    $scope.TemplateList = $scope.DanhSachTinTuc[0].TemplateList;
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Lấy Chi Tiết Bài Viết
        $scope.LayChiTietBaiViet = function (MaTinTuc) {
            let param = "?MaTinTuc=" + MaTinTuc;
            var res = CommonController.getData(CommonController.urlAPI.API_LayChiTietBaiViet, param);
            res.then(
                function succ(response) {
                    $scope.ThongTinBV = response.data;
                    $scope.ttshow = true;
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )

        }

        // Lấy Bài Viết Tường Công Ty
        $scope.rm = false;
        $scope.LayBaiVietTuong = function () {
            var res = CommonController.getData(CommonController.urlAPI.API_LayBaiVietTuong, "");
            res.then(
                function succ(response) {
                    $scope.BaiVietTuong = response.data;
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Đọc tiếp - Thu Gọn
        $scope.read = function (status) {
            if (status == 'more') {
                $scope.rm = true;
            }
            else if (status == 'less') {
                $scope.rm = false;
            }
        }

        // Đổi tiêu đề
        $scope.doiTieuDe = function (tieude) {
            $scope.TieuDe = tieude;
        }

        // Show bình luận bài viết tường
        $scope.XemBinhLuan = function (index) {
            let comment = document.getElementById("comment" + index);
            let angle = document.getElementById("angle" + index);
            if (comment.className == "detail-row") {
                comment.className = "detail-row open";
                angle.className = "ace-icon fa fa-angle-double-up";
            }
            else if (comment.className == "detail-row open") {
                comment.className = "detail-row";
                angle.className = "ace-icon fa fa-angle-double-down";
            }
        }

        // Lấy sinh nhật mặc định
        $scope.LaySinhNhat = function () {
            let current = new Date();
            let param = "?Month=" + (current.getMonth() + 1);
            document.getElementById("sn" + (current.getMonth() + 1)).className = "btn btn-app btn-danger btn-xs";
            var res = CommonController.getData(CommonController.urlAPI.API_LaySinhNhat, param);
            res.then(
                function succ(response) {
                    $scope.DanhSachUser = response.data;
                    console.log($scope.DanhSachUser);
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Lấy sinh nhật theo tháng
        $scope.LaySinhNhatTheoThang = function (month) {
            $scope.m = month;
            let param = "?Month=" + month;
            var res = CommonController.getData(CommonController.urlAPI.API_LaySinhNhat, param);
            res.then(
                function succ(response) {
                    $scope.DanhSachUser = response.data;
                    console.log($scope.DanhSachUser);
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Hiển Thị dd/mm/yy
        $scope.ReturnDDMMYY = function (date) {
            return moment(date).format("DD/MM/YY");
        }

        // Hiển Thị dd/mm/yyyy
        $scope.ReturnDDMMYYYY = function (date) {
            return moment(date).format("DD/MM/YYYY");
        }

        // Hiển Thị hh
        $scope.ReturnHMM = function (date) {
            return moment(date).format("h:mm a")
        }

        // Hiển Thị Ngày Giờ
        $scope.ReturnFullDateTime = function (date) {
            return moment(date).format("DD/MM/YYYY , h:mm:ss a");
        }
    })