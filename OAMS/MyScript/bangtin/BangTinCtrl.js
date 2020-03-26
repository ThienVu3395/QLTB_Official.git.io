angular.module("oamsapp")
    .controller("QlbtCrl", function ($scope, CommonController) {
        //Lấy danh sách Loại Tin
        $scope.sinhNhat = false;
        $scope.LayDanhSachLoaiTin = function () {
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachLoaiTin, "");
            res.then(
                function succ(response) {
                    $scope.DanhSachLoaiTin = response.data;
                    $scope.tmMaLoaiTin = $scope.DanhSachLoaiTin[0];
                    $scope.CountUser = $scope.DanhSachLoaiTin[0].CountUser;
                    $scope.Month = $scope.DanhSachLoaiTin[0].Month;
                    $scope.MaLoaiTin = $scope.DanhSachLoaiTin[0].MaLoaiTin;
                    $scope.DanhSachTinTuc = $scope.LayDanhSachBaiViet($scope.MaLoaiTin);
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        //Lấy danh sách Tin Tức + phân trang
        $scope.totalItems = 64;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 3;
        $scope.LayDanhSachBaiViet = function (MaLoaiTin, Pages) {
            if (Pages !== $scope.currentPage) {
                $scope.currentPage = 1;
            }
            $scope.MaLoaiTin = MaLoaiTin;
            $scope.P = Pages;
            $scope.ttshow = false;
            $scope.sinhNhat = false;
            let pageItems = {
                MaLoaiTin: $scope.MaLoaiTin,
                itemPerPage: $scope.itemsPerPage,
                Limit: Math.round((Pages - 1) * $scope.itemsPerPage)
            }
            var res = CommonController.postData(CommonController.urlAPI.API_LayDanhSachBaiViet_PhanTrang, pageItems);
            res.then(
                function succ(response) {
                    $scope.DanhSachTinTuc = response.data;
                    $scope.TemplateList = $scope.DanhSachTinTuc[0].TemplateList;
                    $scope.totalItems = response.data[0].CountTin;
                    $scope.ttshow = false;
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Lấy User theo sinh nhật
        $scope.LaySinhNhat = function (month) {
            $scope.sinhNhat = true;
            document.getElementById("sn" + $scope.Month).className = "btn btn-app btn-danger btn-xs";
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

        // Show chi tiết bài viết
        $scope.ttshow = false;
        $scope.showBtn = function (MaTinTuc) {
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

        // Gửi Bình Luận
        $scope.BinhLuan = {
            NoiDung: "",
            MaTinTuc: 0,
            HinhAnh: 'https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png',
            DonVi: "P.Công Nghệ Thông Tin",
            TenNguoiDung : "Lê Hoàng Thiên Vũ"
        }
        $scope.GuiBinhLuan = function (MaTinTuc) {
            $scope.BinhLuan.MaTinTuc = MaTinTuc;
            //let index = $scope.BaiVietTuong.findIndex(x => x.MaTinTuc == MaTinTuc);
            //$scope.BaiVietTuong[index].BinhLuan.push($scope.BinhLuan);
            console.log($scope.BinhLuan);
            //var res = CommonController.postData(CommonController.urlAPI.API_GuiBinhLuan, $scope.BinhLuan);
            //res.then(
            //    function succ(response) {
            //        $scope.DanhSachTinTuc = response.data;
            //        $scope.totalItems = response.data[0].CountTin;
            //    },

            //    function errorCallback(response) {
            //        console.log(response.data.message)
            //    }
            //)
        }
    })