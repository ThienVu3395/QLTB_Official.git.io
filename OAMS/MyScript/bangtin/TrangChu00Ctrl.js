angular.module("oamsapp")
    .controller("TC00Ctrl", function ($scope, CommonController, FileUploader, $timeout, blockUI) {
        // Hàm + biến khởi tạo ban đầu
        $scope.totalItems = 64;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 4;
        $scope.ttshow = false;
        $scope.sinhNhat = false;

        $scope.Init = function () {
            $scope.DanhSachLoaiTin = []
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
                    $scope.sinhNhat = false;
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
                    $scope.sinhNhat = false;
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )

        }

        // Lấy Bài Viết Tường Công Ty
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

        // Lấy tin thông báo
        $scope.LayTinThongBao = function () {
            var res = CommonController.getData(CommonController.urlAPI.API_LayTinThongBao, "");
            res.then(
                function succ(response) {
                    $scope.DanhSachThongBao = response.data;
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Lấy tin sự kiện
        $scope.LayTinSuKien = function () {
            var res = CommonController.getData(CommonController.urlAPI.API_LayTinSuKien, "");
            res.then(
                function succ(response) {
                    $scope.DanhSachSuKien = response.data;
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Lấy tin Sawaco
        $scope.LayTinSawaco = function () {
            var res = CommonController.getData(CommonController.urlAPI.API_LayTinSawaco, "");
            res.then(
                function succ(response) {
                    $scope.DanhSachSawaco = response.data;
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
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
                    $scope.sinhNhat = true;
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Lấy sinh nhật theo tháng
        $scope.LaySinhNhatTheoThang = function (month) {
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

        // Tìm Bài Viết
        $scope.TimBaiViet = function () {
            let t = document.getElementsByClassName("input-mini");
            $scope.Start = moment(t[0].value).format('DD-MM-YYYY');
            $scope.End = moment(t[1].value).format('DD-MM-YYYY');
            let objTim = {
                MaLoaiTin: $scope.MaLoaiTin,
                Start: $scope.Start,
                End: $scope.End,
                itemPerPage: $scope.itemsPerPage,
                Limit: Math.round((1 - 1) * $scope.itemsPerPage)
            }
            var res = CommonController.postData(CommonController.urlAPI.API_LocBaiViet, objTim);
            res.then(
                function succ(response) {
                    $scope.DanhSachTinTuc = response.data;
                    if ($scope.DanhSachTinTuc.length != 0) {
                        console.log($scope.DanhSachTinTuc);
                        $scope.DanhSachTinTuc = response.data;
                        $scope.TemplateList = $scope.DanhSachTinTuc[0].TemplateList;
                        $scope.totalItems = response.data[0].CountTin;
                        $scope.ttshow = false;
                        var res2 = CommonController.postData(CommonController.urlAPI.API_LayDanhSachBaiVietLienQuan, objTim);
                        res2.then(
                            function succ(response) {
                                $scope.DanhSachCuHon = response.data;
                            },

                            function errorCallback(response) {
                                console.log(response.data.message)
                            }
                        )
                    }
                    else {
                        $scope.totalItems = 0;
                    }
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }
    })