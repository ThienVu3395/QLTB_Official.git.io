angular.module("oamsapp")
    .controller("QlbtCrl", function ($scope, CommonController, FileUploader) {
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

        // UpLoad hình ảnh
        var baseURL = window.location.protocol + "//" + window.location.host + "/";
        var appURL = { pathAPI: baseURL };
        var uploader = $scope.uploader = new FileUploader({
            url: appURL.pathAPI + 'API/QuanLyBangTin/UploadFiles',
            withCredentials: true
        });
        uploader.filters.push({
            name: 'docFilter1',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                //debugger
                if ('|pdf|tif|tiff|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1)
                    return true;
                else {
                    alert("Không hỗ trợ định dạng file này!!");
                    return false;
                }
            }
        });
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                $scope.HinhAnh = item.name;
                setTimeout(deferred.resolve, 1e3);
            }
        });

        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            //console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            fileItem.upload();
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            //console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            //console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            //console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            //console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            //console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            //console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            //console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            //console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            //console.info('onCompleteAll');
        };

        // Thêm Bài Viết
        $scope.objThem = {
            Hot: false,
            TrangThai: false
        }
        $scope.ThemBaiViet = function () {
            $scope.objThem.MaLoaiTin = $scope.tmMaLoaiTin.MaLoaiTin;
            $scope.objThem.NoiDung = document.getElementById("editor1").innerHTML;
            $scope.objThem.HinhAnh = $scope.HinhAnh;
            console.log($scope.objThem);
        }

    })