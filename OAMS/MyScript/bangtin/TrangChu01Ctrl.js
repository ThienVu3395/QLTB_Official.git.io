angular.module("oamsapp")
    .controller("TC01Ctrl", function ($scope, CommonController, FileUploader, $timeout, blockUI) {
        // Hàm + biến khởi tạo ban đầu
        $scope.totalItems = 64;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 3;

        $scope.Init = function () {
            $scope.LayTinNoiBat();
            $scope.LayTinXemNhieu();
            $scope.LayTinThongBao();
            $scope.LayTinSuKien();
            $scope.LayTinSawaco();
            $scope.LayTinTuong();
            $scope.LaySinhNhat();
        }

        // Lấy tin nổi bật
        $scope.LayTinNoiBat = function () {
            var res = CommonController.getData(CommonController.urlAPI.API_LayTinNoiBat, "");
            res.then(
                function succ(response) {
                    $scope.DanhSachTinNoiBat = response.data;
                    $scope.NoiBat1 = $scope.DanhSachTinNoiBat[0];
                    $scope.NoiBat2 = $scope.DanhSachTinNoiBat[1];
                    $scope.NoiBat3 = $scope.DanhSachTinNoiBat[2];
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Lấy tin xem nhiều
        $scope.LayTinXemNhieu = function () {
            var res = CommonController.getData(CommonController.urlAPI.API_LayTinXemNhieu, "");
            res.then(
                function succ(response) {
                    $scope.DanhSachTinXemNhieu = response.data;
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

        // Lấy tin Tường
        $scope.LayTinTuong = function () {
            var res = CommonController.getData(CommonController.urlAPI.API_LayTinTuong, "");
            res.then(
                function succ(response) {
                    $scope.DanhSachTuong = response.data;
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Lấy User theo sinh nhật
        $scope.LaySinhNhat = function () {
            let current = new Date();
            let param = "?Month=" + (current.getMonth() + 1);
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

        // Phần Init của Danh Mục Tin
        $scope.InitDanhMuc = function (MaLoaiTin) {
            console.log(MaLoaiTin);
        }

        // Phần Init của Chi Tiết Tin
        $scope.InitChiTiet = function (MaTinTuc) {
            console.log(MaTinTuc);
        }
    })