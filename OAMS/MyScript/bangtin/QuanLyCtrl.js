angular.module("oamsapp")
    .controller("adminBT", function ($scope, CommonController, blockUI, $timeout, $sce) {
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

        // Init cho trang quản trị
        $scope.itemsPerPage = 10;
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        $scope.Init = function () {
            $scope.DsLoaiTin = [];
            $scope.HienThi = -1;
            $scope.MaLoaiTin = 0;
            $scope.LayDanhSachLoaiTin();
            var hamcho = function () {
                if ($scope.DsLoaiTin.length == 0) {
                    $timeout(hamcho, 300);
                }
                else {
                    blockUI.stop();
                    $scope.bigCurrentPage = 1;
                    $scope.param = "?page=0" + "&pageLimit=" + $scope.itemsPerPage;
                    $scope.TieuDe = "Danh Sách Bài Viết";
                    $scope.status = "qlbv";
                    $scope.LayBaiVietTatCa();
                }
            }
            $timeout(hamcho, 300);
        }

        // Lấy Toàn Bộ Danh Sách Bài Viết
        $scope.LayBaiVietTatCa = function () {
            $scope.MaLoaiTin = 0;
            if ($scope.HienThi != -1) {
                $scope.LayBaiViet_TheoHienThi($scope.HienThi);
            }
            else {
                $scope.bigCurrentPage = 1;
                $scope.param = "?page=0" + "&pageLimit=" + $scope.itemsPerPage;
                var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachBaiViet, $scope.param);
                res.then(
                    function succ(response) {
                        $scope.DanhSach = response.data;
                        $scope.bigTotalItems = $scope.DanhSach[0].CountTin;
                        $scope.TieuDe = "Danh Sách Bài Viết";
                        blockUI.stop();
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                    }
                );
            }
        }

        // Lấy Bài Viết Theo Danh Mục
        $scope.LayBaiViet_TheoDanhMuc = function (MaLoaiTin) {
            $scope.MaLoaiTin = MaLoaiTin;
            if ($scope.HienThi != -1) {
                $scope.LayBaiViet_TheoDieuKien($scope.MaLoaiTin, $scope.HienThi);
            }
            else {
                $scope.bigCurrentPage = 1;
                $scope.param = "?page=0" + "&pageLimit=" + $scope.itemsPerPage + "&MaLoaiTin=" + MaLoaiTin;
                var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachBaiViet_TheoDanhMuc, $scope.param);
                res.then(
                    function succ(response) {
                        $scope.DanhSach = response.data;
                        $scope.bigTotalItems = $scope.DanhSach[0].CountTin;
                        $scope.TieuDe = $scope.DanhSach[0].LoaiTin;
                        blockUI.stop();
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                    }
                );
            }
        }

        // Lấy Bài Viết Theo Hiển Thị
        $scope.LayBaiViet_TheoHienThi = function (HienThi) {
            $scope.bigCurrentPage = 1;
            $scope.param = "?page=0" + "&pageLimit=" + $scope.itemsPerPage + "&HienThi=" + HienThi;
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachBaiViet_TheoHienThi, $scope.param);
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
        $scope.LayBaiViet_TheoDieuKien = function (MaLoaiTin,HienThi) {
            $scope.bigCurrentPage = 1;
            $scope.param = "?page=0" + "&pageLimit=" + $scope.itemsPerPage + "&MaLoaiTin=" + MaLoaiTin + "&HienThi=" + HienThi;
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachBaiViet_TheoDieuKien, $scope.param);
            res.then(
                function succ(response) {
                    $scope.DanhSach = response.data;
                    if ($scope.DanhSach.length > 0) {
                        $scope.bigTotalItems = $scope.DanhSach[0].CountTin;
                    }
                    else {
                        $scope.bigTotalItems = 0;
                        alert("Không Có Kết Quả Phù Hợp");
                    }
                    $scope.TieuDe = $scope.DanhSach[0].LoaiTin;
                    blockUI.stop();
                },

                function errorCallback(response) {
                    console.log(response.data.message);
                }
            );
        }

        // Set Hiển Thị
        $scope.setHienThi = function (hienThi, e) {
            $scope.RemoveClass(e);
            $scope.HienThi = hienThi;
            if ($scope.HienThi == -1 && $scope.MaLoaiTin == 0) {
                $scope.LayBaiVietTatCa();
            }
            else if ($scope.HienThi != -1 && $scope.MaLoaiTin != 0) {
                $scope.LayBaiViet_TheoDieuKien($scope.MaLoaiTin,$scope.HienThi);
            }
            else if ($scope.HienThi == -1 && $scope.MaLoaiTin != 0) {
                $scope.LayBaiViet_TheoDanhMuc($scope.MaLoaiTin);
            }
            else if ($scope.HienThi != -1 && $scope.MaLoaiTin == 0) {
                $scope.LayBaiViet_TheoHienThi($scope.HienThi);
            }
        }

        // Lấy Bài Viết Tường
        $scope.LayBaiVietTuong = function () {
            $scope.MaLoaiTin = -1;
            $scope.param = "?page=0" + "&pageLimit=" + $scope.itemsPerPage;
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_LayBaiVietTuong, $scope.param);
            res.then(
                function succ(response) {
                    $scope.DanhSach = response.data;
                    $scope.bigTotalItems = $scope.DanhSach.length;
                    $scope.TieuDe = "Tường Công Ty";
                    blockUI.stop();
                },

                function errorCallback(response) {
                    console.log(response.data.message);
                }
            );
        }

        // Phân Trang
        $scope.PhanTrang = function () {
            let limit = ($scope.bigCurrentPage - 1) * $scope.itemsPerPage;
            $scope.param = "?page=" + limit + "&pageLimit=" + $scope.itemsPerPage;
            if ($scope.HienThi == -1 && $scope.MaLoaiTin == 0) {
                $scope.PhanTrang_TatCa();
            }
            else if ($scope.HienThi != -1 && $scope.MaLoaiTin != 0) {
                $scope.PhanTrang_TheoDieuKien($scope.MaLoaiTin, $scope.HienThi);
            }
            else if ($scope.HienThi == -1 && $scope.MaLoaiTin != 0) {
                $scope.PhanTrang_TheoDanhMuc($scope.MaLoaiTin);
            }
            else if ($scope.HienThi != -1 && $scope.MaLoaiTin == 0) {
                $scope.PhanTrang_TheoHienThi($scope.HienThi);
            }
        }

        // Phân Trang Tất Cả
        $scope.PhanTrang_TatCa = function () {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_PhanTrang_TatCa, $scope.param);
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

        // Phân Trang Theo Danh Mục
        $scope.PhanTrang_TheoDanhMuc = function (DanhMuc) {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            $scope.param += "&MaLoaiTin=" + DanhMuc;
            var res = CommonController.getData(CommonController.urlAPI.API_PhanTrang_TheoDanhMuc, $scope.param);
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

        // Phân Trang Theo Hiển Thị
        $scope.PhanTrang_TheoHienThi = function (HienThi) {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            $scope.param += "&HienThi=" + HienThi;
            var res = CommonController.getData(CommonController.urlAPI.API_PhanTrang_TheoHienThi, $scope.param);
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

        // Phân Trang Theo Điều Kiện
        $scope.PhanTrang_TheoDieuKien = function (MaLoaiTin,HienThi) {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            $scope.param += "&MaLoaiTin=" + MaLoaiTin + "&HienThi=" + HienThi;
            var res = CommonController.getData(CommonController.urlAPI.API_PhanTrang_TheoDieuKien, $scope.param);
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

        // Duyệt Tin
        $scope.DuyetTin = function (MaTinTuc) {
            if (window.confirm("Bạn chắc chắn duyệt tin này chứ ?")) {
                let param = "?MaTinTuc=" + MaTinTuc;
                var res = CommonController.getData(CommonController.urlAPI.API_DuyetTin, param);
                res.then(
                    function succ(response) {
                        let index = $scope.DanhSach.findIndex(x => x.MaTinTuc == MaTinTuc);
                        $scope.DanhSach[index].HienThi = 1;
                        $scope.TTBV.HienThi = true;
                        alert(response.data);
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                    }
                );
            }
            else return;
        }

        // Hủy Duyệt Tin
        $scope.HuyDuyetTin = function (MaTinTuc) {
            if (window.confirm("Bạn chắc chắn hủy duyệt tin này chứ ?")) {
                let param = "?MaTinTuc=" + MaTinTuc;
                var res = CommonController.getData(CommonController.urlAPI.API_HuyDuyetTin, param);
                res.then(
                    function succ(response) {
                        let index = $scope.DanhSach.findIndex(x => x.MaTinTuc == MaTinTuc);
                        $scope.DanhSach[index].HienThi = 0;
                        $scope.TTBV.HienThi = false;
                        alert(response.data);
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                    }
                );
            }
            else return;
        }

        // Xóa Tin
        $scope.XoaTin = function (MaTinTuc) {
            if (window.confirm("Bạn chắc chắn xóa tin này chứ ?")) {
                let param = "?MaTinTuc=" + MaTinTuc;
                var res = CommonController.getData(CommonController.urlAPI.API_XoaTin, param);
                res.then(
                    function succ(response) {
                        let index = $scope.DanhSach.findIndex(x => x.MaTinTuc == MaTinTuc);
                        $scope.DanhSach.splice(index, 1);
                        alert(response.data);
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                    }
                );
            }
            else return;
        }

        ///////////////// CÁC HÀM ĐỊNH NGHĨA RIÊNG ///////////
        //Remove Class
        $scope.RemoveClass = function (className) {
            if (className == "select1") {
                document.getElementById("select1").className = "ace-icon fa fa-check green";
                document.getElementById("select2").className = "ace-icon fa fa-check invisible green";
                document.getElementById("select3").className = "ace-icon fa fa-check invisible green";
            }
            else if (className == "select2") {
                document.getElementById("select1").className = "ace-icon fa fa-check invisible green";
                document.getElementById("select2").className = "ace-icon fa fa-check green";
                document.getElementById("select3").className = "ace-icon fa fa-check invisible green";
            }
            else if (className == "select3") {
                document.getElementById("select1").className = "ace-icon fa fa-check invisible green";
                document.getElementById("select2").className = "ace-icon fa fa-check invisible green";
                document.getElementById("select3").className = "ace-icon fa fa-check green";
            }
        }
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