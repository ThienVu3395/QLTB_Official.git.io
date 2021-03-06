﻿angular.module("oamsapp")
    .controller("TC00Ctrl", function ($scope, CommonController, $timeout, blockUI, $sce) {
        // Hàm + biến khởi tạo ban đầu
        $scope.itemsPerPage = 10;
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        $scope.TieuDe = "Bảng Tin Tường Công Ty";

        //////////////////////////////////// Trang Chủ //////////////////////////////////
        $scope.Init = function () {  
            $scope.DanhSachLoaiTin = [];
            $scope.LayDanhSachLoaiTin();
            var hamcho = function () {
                if ($scope.DanhSachLoaiTin.length == 0) {
                    $timeout(hamcho, 300);
                }
                else {
                    blockUI.stop();
                    $scope.bigCurrentPage = 1;
                    $scope.MaLoaiTin = $scope.DanhSachLoaiTin[0].MaLoaiTin;
                    $scope.LayDanhSachBaiViet($scope.MaLoaiTin, 'layds');
                    //$scope.LayBaiVietTuong();
                    //$scope.LaySinhNhat();
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
        $scope.LayDanhSachBaiViet = function (MaLoaiTin, status) {
            let limit = 0;
            if (status == 'layds') {
                $scope.bigCurrentPage = 1;
                limit = ($scope.bigCurrentPage - 1) * $scope.itemsPerPage;
            }
            else if (status == 'phantrang') {
                limit = ($scope.bigCurrentPage - 1) * $scope.itemsPerPage;
            }
            $scope.MaLoaiTin = MaLoaiTin;
            $scope.param = "?page=" + limit + "&pageLimit=" + $scope.itemsPerPage + "&MaLoaiTin=" + MaLoaiTin;
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachBaiViet_TheoDanhMuc_PhanTrang, $scope.param);
            res.then(
                function succ(response) {
                    $scope.DanhSachTinTuc = response.data;
                    blockUI.stop();
                    if ($scope.DanhSachTinTuc.length > 0) {
                        $scope.bigTotalItems = $scope.DanhSachTinTuc[0].CountTin;
                        $scope.TemplateList = $scope.DanhSachTinTuc[0].TemplateList;
                    }
                    else {
                        $scope.bigTotalItems = 0;
                        alert("Phần tin này đang cập nhật...");
                    }
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
                    $scope.ThongTinBV.TieuDe = $scope.capitalize($scope.ThongTinBV.TieuDe);
                    $scope.ThongTinBV.MoTa = $scope.capitalize($scope.ThongTinBV.MoTa);
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )

        }

        // Lấy Bài Viết Tường Công Ty
        $scope.rm = false;
        $scope.page = 1;
        $scope.BaiVietTuong = [];
        $scope.LayBaiVietTuong = function () {
            let item = 3;
            let limit = ($scope.page - 1) * item;
            $scope.param = "?page=" + limit + "&pageLimit=" + item;
            var res = CommonController.getData(CommonController.urlAPI.API_LayBaiVietTuong, $scope.param);
            res.then(
                function succ(response) {
                    if (response.data.length > 0) {
                        for (let i = 0; i < response.data.length; i++) {
                            $scope.BaiVietTuong.push(response.data[i]);
                        }
                        $scope.page += 1;
                    }
                    else alert("Không Tìm Thấy Bài Viết");
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Chia sẻ bài viết lên tường
        $scope.ChiaSeBaiViet = function (item) {
            if (window.confirm("Bạn muốn chia sẻ bài viết này lên tường chứ ?")) {
                var res = CommonController.postData(CommonController.urlAPI.API_ChiaSeBaiViet, item);
                res.then(
                    function succ(response) {
                        alert(response.data);
                        item.ChiaSe = false;
                    },

                    function errorCallback(response) {
                        console.log(response.data.message)
                    }
                )
            }
            else return;
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

        // Gửi Bình Luận
        $scope.GuiBinhLuan = function (MaTinTuc) {
            let noidung = document.getElementById("NoiDung" + MaTinTuc).value;
            let objBinhLuan = {
                MaTinTuc: MaTinTuc,
                NoiDung: noidung,
            }
            var res = CommonController.postData(CommonController.urlAPI.API_GuiBinhLuan, objBinhLuan);
            res.then(
                function succ(response) {
                    alert(response.data);
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Đổi tiêu đề
        $scope.doiTieuDe = function (tieude) {
            $scope.TieuDe = tieude;
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
                    //console.log($scope.DanhSachUser);
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
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        //////////////////////////////////// Trang Chi Tiết //////////////////////////////////
        $scope.InitChiTiet = function (MaTinTuc) {
            $scope.LayChiTietBaiViet(MaTinTuc);
            $scope.LayBaiVietTuong();
            $scope.LaySinhNhatTheoThang(4);
        }

        //////////////////////////// Các Hàm Viết Sử dụng chung /////////////////
        //Hàm chuyển chữ thành kiểu viết hoa đầu
        $scope.capitalize = function (string) {
            return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
        }

        // Hàm cắt chữ
        $scope.SliceString = function (string, limit) {
            if (string.length > limit) {
                return string = "...";
            }
            else return "";
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

        // Render ra HTML
        $scope.htmlSafe = function (data) {
            return $sce.trustAsHtml(data);
        }
    })