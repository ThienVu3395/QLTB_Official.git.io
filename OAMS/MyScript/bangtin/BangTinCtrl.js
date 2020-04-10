angular.module("oamsapp")
    .controller("QlbtCrl", function ($scope, CommonController, FileUploader, $timeout, blockUI) {
        // Hàm + biến khởi tạo ban đầu
        $scope.totalItems = 64;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 3;
        $scope.ttshow = false;
        $scope.sinhNhat = false;

        $scope.InitUpdate = function () {
            $scope.LayTinNoiBat();
            $scope.LayTinXemNhieu();
        }

        // Lấy tin nổi bật
        $scope.LayTinNoiBat = function () {
            var res = CommonController.getData(CommonController.urlAPI.API_LayTinNoiBat, "");
            res.then(
                function succ(response) {
                    $scope.DanhSachTinNoiBat = response.data;
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
                    console.log($scope.DanhSachTinXemNhieu);
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

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
                    let date = new Date();
                    $scope.month = date.getMonth() + 1;
                    $scope.MaLoaiTin = $scope.DanhSachLoaiTin[0].MaLoaiTin;
                    $scope.LayDanhSachBaiViet($scope.MaLoaiTin);
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
            console.log(CommonController.urlAPI.API_LayDanhSachBaiViet_TheoDanhMuc_PhanTrang + $scope.param);
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

        // Lấy User theo sinh nhật
        $scope.LaySinhNhat = function (month) {
            document.getElementById("sn" + $scope.month).className = "btn btn-app btn-danger btn-xs";
            let param = "?Month=" + month;
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

        // Hiển Thị Ngày Giờ
        $scope.ReturnFullDateTime = function (date) {
            return moment(date).format("DD/MM/YYYY , h:mm:ss a");
        }

        // Hiển Thị Ngày
        $scope.ReturnDate = function (date) {
            return moment(date).format("DD/MM/YYYY");
        }

        // Lấy Chi Tiết Bài Viết
        $scope.LayChiTietBaiViet = function (MaTinTuc) {
            let param = "?MaTinTuc=" + MaTinTuc;
            var res = CommonController.getData(CommonController.urlAPI.API_LayChiTietBaiViet, param);
            res.then(
                function succ(response) {
                    $scope.ThongTinBV = response.data;
                    console.log($scope.ThongTinBV);
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













        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //Lấy danh sách Loại Tin
        $scope.sinhNhat = false;
        //$scope.LayDanhSachLoaiTin = function () {
        //    let date = new Date();
        //    $scope.day = date.getDate().toString().length == 1 ? "0" + date.getDate() : date.getDate();
        //    $scope.month = (date.getMonth() + 1).toString().length == 1 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        //    $scope.Start = $scope.day + "-" + $scope.month + "-" + date.getFullYear();
        //    $scope.End = $scope.day + "-" + $scope.month + "-" + date.getFullYear();
        //    var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachLoaiTin, "");
        //    res.then(
        //        function succ(response) {
        //            $scope.DanhSachLoaiTin = response.data;
        //            $scope.tmMaLoaiTin = $scope.DanhSachLoaiTin[0];
        //            $scope.CountUser = $scope.DanhSachLoaiTin[0].CountUser;
        //            $scope.Month = $scope.DanhSachLoaiTin[0].Month;
        //            $scope.MaLoaiTin = $scope.DanhSachLoaiTin[0].MaLoaiTin;
        //            $scope.DanhSachTinTuc = $scope.LayDanhSachBaiViet($scope.MaLoaiTin, 1);
        //        },

        //        function errorCallback(response) {
        //            console.log(response.data.message)
        //        }
        //    )
        //}

        //Lấy danh sách Tin Tức + phân trang
        //$scope.LayDanhSachBaiViet = function (MaLoaiTin, Pages) {
        //    if (Pages !== $scope.currentPage) {
        //        $scope.currentPage = 1;
        //    }
        //    $scope.MaLoaiTin = MaLoaiTin;
        //    $scope.P = Pages;
        //    $scope.ttshow = false;
        //    $scope.sinhNhat = false;
        //    let pageItems = {
        //        MaLoaiTin: $scope.MaLoaiTin,
        //        itemPerPage: $scope.itemsPerPage,
        //        Limit: Math.round((Pages - 1) * $scope.itemsPerPage),
        //        Start: $scope.Start,
        //        End: $scope.End,
        //    }
        //    var res = CommonController.postData(CommonController.urlAPI.API_LayDanhSachBaiViet_PhanTrang, pageItems);
        //    res.then(
        //        function succ(response) {
        //            $scope.DanhSachTinTuc = response.data;
        //            if ($scope.DanhSachTinTuc.length != 0) {
        //                $scope.DanhSachTinTuc = response.data;
        //                $scope.TemplateList = $scope.DanhSachTinTuc[0].TemplateList;
        //                $scope.totalItems = response.data[0].CountTin;
        //                $scope.ttshow = false;
        //                var res2 = CommonController.postData(CommonController.urlAPI.API_LayDanhSachBaiVietLienQuan, pageItems);
        //                res2.then(
        //                    function succ(response) {
        //                        $scope.DanhSachCuHon = response.data;
        //                    },

        //                    function errorCallback(response) {
        //                        console.log(response.data.message)
        //                    }
        //                )
        //            }
        //            else {
        //                $scope.totalItems = 0;
        //            }
        //        },

        //        function errorCallback(response) {
        //            console.log(response.data.message)
        //        }
        //    )
        //}

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

        // Show chi tiết bài viết
        //$scope.showBtn = function (MaTinTuc) {
        //    let param = "?MaTinTuc=" + MaTinTuc;
        //    var res = CommonController.getData(CommonController.urlAPI.API_LayChiTietBaiViet, param);
        //    res.then(
        //        function succ(response) {
        //            $scope.ThongTinBV = response.data;
        //            console.log($scope.ThongTinBV);
        //            $scope.ttshow = true;
        //        },

        //        function errorCallback(response) {
        //            console.log(response.data.message)
        //        }
        //    )

        //}



        // Gửi Bình Luận
        $scope.BinhLuan = {
            NoiDung: "",
            MaTinTuc: 0,
            HinhAnh: 'https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png',
            DonVi: "P.Công Nghệ Thông Tin",
            TenNguoiDung: "Lê Hoàng Thiên Vũ"
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

        // UpLoad
        var baseURL = window.location.protocol + "//" + window.location.host + "/";
        var appURL = { pathAPI: baseURL };

        //Upload Hình Ảnh
        $scope.ttup = false;
        $scope.ttIm = false;
        $scope.ttImg = false;
        var uploaderImage = $scope.uploaderImage = new FileUploader({
            url: appURL.pathAPI + 'API/QuanLyBangTin/UploadImage',
            withCredentials: true
        });

        uploaderImage.filters.push({
            name: 'upImg',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                if ('|pdf|tif|tiff|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1) {
                    setTimeout(deferred.resolve, 1e3);
                    return true;
                }
                else {
                    alert("Không hỗ trợ định dạng file này!!");
                    return false;
                }
            }
        });

        $scope.uploadImg = function (item) {
            if (confirm("Bạn có chắc up ảnh này lên chứ ?")) {
                uploaderImage.uploadItem(item);
            }
            return;
        }

        $scope.removeImg = function () {
            if (confirm("Bạn có chắc xóa ảnh này chứ ?")) {
                uploaderImage.clearQueue();
                $scope.HinhAnh = {};
                $scope.ttIm = false;
                $scope.ttImg = false;
            }
            return;
        }

        uploaderImage.onAfterAddingFile = function (item) {
            $scope.ttup = true;
            let ds = document.getElementById("collapseOne");
            ds.className = "panel-collapse collapse in";
            $scope.HinhAnh = item;
            $scope.ttIm = true;
            $scope.ttImg = true;
        }

        uploaderImage.onSuccessItem = function (item, response, status, headers) {
            alert(response);
            $scope.ttImg = false;
            $scope.ttIm = true;
            if (response !== "Upload Failed" || response !== "Files Is Duplicate,Upload Failed") {
                $scope.objThem.HinhAnh = item.file.name;
            }
        }

        //Upload Tập Tin
        $scope.TapTinDinhKem = [];
        var uploaderFile = $scope.uploaderFile = new FileUploader({
            url: appURL.pathAPI + 'API/QuanLyBangTin/UploadFiles',
            withCredentials: true
        });

        uploaderFile.filters.push({
            name: 'upFile',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                //debugger
                if ('|pdf|tif|tiff|jpg|jpeg|bmp|gif|'.indexOf(type) !== -1) {
                    setTimeout(deferred.resolve, 1e3);
                    return true;
                }
                else {
                    alert("Không hỗ trợ định dạng file này!!");
                    return false;
                }
            }
        });

        $scope.uploadfile = function (item) {
            if (confirm("Bạn có chắc up tệp này lên chứ ?")) {
                uploaderFile.uploadItem(item);
            }
            return;
        }

        $scope.removeFile = function (item) {
            if (confirm("Bạn có chắc xóa tệp này chứ ?")) {
                uploaderFile.removeFromQueue(item);
            }
            return;
        }

        uploaderFile.onAfterAddingFile = function (item) {
            $scope.ttup = true;
            let ds = document.getElementById("collapseOne");
            ds.className = "panel-collapse collapse in";
        }

        uploaderFile.onSuccessItem = function (item, response, status, headers) {
            alert(response);
            let index = uploaderFile.getIndexOfItem(item);
            document.getElementById("ttFile" + index).style.display = 'none';
            if (response !== "Upload Failed" || response !== "Files Is Duplicate,Upload Failed") {
                let objItem = {
                    Ten: item.file.name,
                    Url: item.file.name,
                }
                $scope.TapTinDinhKem.push(objItem);
            }
        }

        // Thêm Bài Viết
        $scope.objThem = {
            TinNoiBat: false,
            HienThi: false,
            TapTinDinhKem: $scope.TapTinDinhKem,
            HinhAnh: "",
        }

        $scope.ThemBaiViet = function () {
            $scope.objThem.MaLoaiTin = $scope.tmMaLoaiTin.MaLoaiTin;
            $scope.objThem.NoiDung = document.getElementById("editor1").innerHTML;
            console.log($scope.objThem);
            var res = CommonController.postData(CommonController.urlAPI.API_ThemBaiViet, $scope.objThem);
            res.then(
                function succ(response) {
                    alert(response.data);
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }
    })