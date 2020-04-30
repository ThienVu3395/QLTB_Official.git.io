angular.module("oamsapp")
    .controller("adminBT", function ($scope, CommonController, blockUI, FileUploader, $timeout, $sce) {
        // Lấy Danh Sách Loại Tin
        $scope.LayDanhSachLoaiTin = function () {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachLoaiTin, '');
            res.then(
                function succ(response) {
                    $scope.DsLoaiTin = response.data;
                    blockUI.stop();
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
            let check = document.getElementById("select4");
            check.className = "ace-icon fa fa-check green";
            let w = document.getElementById("loaiTuong");
            w.className = "ace-icon fa fa-check invisible green";
            for (let i = 0; i < $scope.DsLoaiTin.length; i++) {
                let c = document.getElementById("selectLoai" + $scope.DsLoaiTin[i].MaLoaiTin);
                c.className = "ace-icon fa fa-check invisible green";
            }
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
            let c = document.getElementById("select4");
            c.className = "ace-icon fa fa-check invisible green";
            let w = document.getElementById("loaiTuong");
            w.className = "ace-icon fa fa-check invisible green";
            for (let i = 0; i < $scope.DsLoaiTin.length; i++) {
                let check = document.getElementById("selectLoai" + $scope.DsLoaiTin[i].MaLoaiTin);
                if ($scope.DsLoaiTin[i].MaLoaiTin == MaLoaiTin) {
                    check.className = "ace-icon fa fa-check green";
                }
                else check.className = "ace-icon fa fa-check invisible green";
            }
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
        $scope.LayBaiViet_TheoDieuKien = function (MaLoaiTin, HienThi) {
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
                if ($scope.MaLoaiTin == -1) {
                    $scope.LayBaiVietTuong();
                }
                else {
                    $scope.LayBaiViet_TheoDieuKien($scope.MaLoaiTin, $scope.HienThi);
                }
            }
            else if ($scope.HienThi == -1 && $scope.MaLoaiTin != 0) {
                if ($scope.MaLoaiTin == -1) {
                    $scope.LayBaiVietTuong();
                }
                else {
                    $scope.LayBaiViet_TheoDanhMuc($scope.MaLoaiTin);
                }
            }
            else if ($scope.HienThi != -1 && $scope.MaLoaiTin == 0) {
                $scope.LayBaiViet_TheoHienThi($scope.HienThi);
            }
        }

        // Lấy Bài Viết Tường
        $scope.LayBaiVietTuong = function () {
            let c = document.getElementById("select4");
            c.className = "ace-icon fa fa-check invisible green";
            let w = document.getElementById("loaiTuong");
            w.className = "ace-icon fa fa-check green";
            for (let i = 0; i < $scope.DsLoaiTin.length; i++) {
                let check = document.getElementById("selectLoai" + $scope.DsLoaiTin[i].MaLoaiTin);
                check.className = "ace-icon fa fa-check invisible green";
            }
            $scope.MaLoaiTin = -1;
            $scope.bigCurrentPage = 1;
            let API = "";
            $scope.param = "?page=0" + "&pageLimit=" + $scope.itemsPerPage;
            if ($scope.HienThi == -1) {
                API = CommonController.urlAPI.API_LayBaiVietTuong_TatCa;
            }
            else {
                API = CommonController.urlAPI.API_LayBaiVietTuong_DieuKien;
                $scope.param += "&approved=" + $scope.HienThi;
            }
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(API, $scope.param);
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
            else if ($scope.HienThi != -1) {
                if ($scope.MaLoaiTin == -1) {
                    $scope.PhanTrangTuong_TheoDieuKien($scope.HienThi);
                }
                else if ($scope.MaLoaiTin > 0) {
                    $scope.PhanTrang_TheoDieuKien($scope.MaLoaiTin, $scope.HienThi);
                }
            }
            else if ($scope.HienThi == -1) {
                if ($scope.MaLoaiTin == -1) {
                    $scope.PhanTrangTuong_TatCa();
                }
                else if ($scope.MaLoaiTin > 0) {
                    $scope.PhanTrang_TheoDanhMuc($scope.MaLoaiTin);
                }
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

        // Phân Trang Tường Tất Cả
        $scope.PhanTrangTuong_TatCa = function () {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_PhanTrangTuong_TatCa, $scope.param);
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
        $scope.PhanTrang_TheoDieuKien = function (MaLoaiTin, HienThi) {
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

        // Phân Trang Tường Theo Điều Kiện
        $scope.PhanTrangTuong_TheoDieuKien = function (HienThi) {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            $scope.param += "&approved=" + HienThi;
            console.log(CommonController.urlAPI.API_PhanTrangTuong_TheoDieuKien + $scope.param)
            var res = CommonController.getData(CommonController.urlAPI.API_PhanTrangTuong_TheoDieuKien, $scope.param);
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
        $scope.LayChiTietBaiViet = function (MaTinTuc, MaLoaiTin) {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            let API = "";
            if (MaLoaiTin == -1) {
                API = CommonController.urlAPI.API_LayChiTietBaiViet_Tuong;
            }
            else {
                API = CommonController.urlAPI.API_LayChiTietBaiViet;
            }
            let param = "?MaTinTuc=" + MaTinTuc;
            var res = CommonController.getData(API, param);
            res.then(
                function succ(response) {
                    $scope.TTBV = response.data;
                    blockUI.stop();
                },

                function errorCallback(response) {
                    console.log(response.data.message);
                }
            );
        }

        // Xử lý tin
        $scope.XuLyTin = function (MaTinTuc, HienThi) {
            let string = "";
            if (HienThi == true) {
                string = " duyệt";
            }
            else if (HienThi == false) {
                string = " hủy duyệt";
            }
            if (window.confirm("Bạn chắc chắn" + string + " tin này chứ ?")) {
                let param = "?MaTinTuc=" + MaTinTuc + "&HienThi=" + HienThi;
                var res = CommonController.getData(CommonController.urlAPI.API_XuLyTin, param);
                res.then(
                    function succ(response) {
                        let index = $scope.DanhSach.findIndex(x => x.MaTinTuc == MaTinTuc);
                        $scope.DanhSach[index].HienThi = HienThi;
                        $scope.TTBV.HienThi = HienThi;
                        alert(response.data);
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                    }
                );
            }
            else return;
        }

        // Duyệt or Không Duyệt bình luận
        $scope.XuLyBinhLuan = function (item, status) {
            let objBinhLuan = {
                MaBinhLuan: item.MaBinhLuan,
                MaTinTuc: item.MaTinTuc,
                HienThi: status
            }
            var res = CommonController.postData(CommonController.urlAPI.API_XuLyBinhLuan, objBinhLuan);
            res.then(
                function succ(response) {
                    alert(response.data);
                    item.HienThi = status;
                },

                function errorCallback(response) {
                    console.log(response.data.message);
                    alert("Có Lỗi Phát Sinh");
                }
            );
        }

        // Xóa Tin Thường
        $scope.XoaTin = function (MaTinTuc) {
            if (window.confirm("Bạn chắc chắn xóa tin này chứ ?")) {
                let param = "?MaTinTuc=" + MaTinTuc;
                var res = CommonController.deleteData(CommonController.urlAPI.API_XoaTin, param);
                res.then(
                    function succ(response) {
                        alert(response.data)
                        location.href = "";
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                        alert("Có Lỗi Phát Sinh");
                    }
                );
            }
            else return;
        }

        // Xóa Tin Tường
        $scope.XoaTinTuong = function (MaTinTuc) {
            if (window.confirm("Bạn chắc chắn xóa tin này khỏi tường chứ ?")) {
                let param = "?MaTinTuc=" + MaTinTuc;
                var res = CommonController.deleteData(CommonController.urlAPI.API_XoaTinTuong, param);
                res.then(
                    function succ(response) {
                        alert(response.data)
                        location.href = "";
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                        alert("Có Lỗi Phát Sinh");
                    }
                );
            }
            else return;
        }

        // Xử Lý Tin Tường
        $scope.XuLyTinTuong = function (MaTinTuc, IsApproved) {
            let string = "";
            if (IsApproved == true) {
                string = " duyệt";
            }
            else if (IsApproved == false) {
                string = " hủy duyệt";
            }
            if (window.confirm("Bạn chắc chắn" + string + " tin này chứ ?")) {
                let param = "?MaTinTuc=" + MaTinTuc + "&IsApproved=" + IsApproved;
                var res = CommonController.getData(CommonController.urlAPI.API_XuLyTinhTuong, param);
                res.then(
                    function succ(response) {
                        let index = $scope.DanhSach.findIndex(x => x.MaTinTuc == MaTinTuc);
                        $scope.DanhSach[index].HienThi = IsApproved;
                        $scope.TTBV.HienThi = IsApproved;
                        alert(response.data);
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                    }
                );
            }
            else return;
        }

        ///////////////////////////////////// SỬA TIN THƯỜNG ////////////////////////
        $scope.InitSua = function (MaTinTuc) {
            $scope.TTBV = "";
            $scope.LayChiTietBaiViet(MaTinTuc);
            $scope.DsLoaiTin = [];
            $scope.LayDanhSachLoaiTin();
            var hamcho = function () {
                if ($scope.TTBV == "") {
                    $timeout(hamcho, 300);
                }
                else {
                    blockUI.stop();
                    $scope.DsLoaiTin = [];
                    $scope.LayDanhSachLoaiTin();
                    var hamcho2 = function () {
                        if ($scope.DsLoaiTin.length == 0) {
                            $timeout(hamcho2, 300);
                        }
                        else {
                            blockUI.stop();
                            let index = $scope.DsLoaiTin.findIndex(x => x.MaLoaiTin == $scope.TTBV.MaLoaiTin);
                            $scope.MaLoaiTin = $scope.DsLoaiTin[index];
                            document.getElementById("editor1").innerHTML = $scope.TTBV.NoiDung;
                            document.getElementById("nhhSua").value = $scope.TTBV.NgayHetHan != null ? $scope.ReturnDate2($scope.TTBV.NgayHetHan) : null;
                            document.getElementById("nhhtmSua").value = $scope.TTBV.NgayHetHanTinMoi != null ? $scope.ReturnDate2($scope.TTBV.NgayHetHanTinMoi) : null;
                            document.getElementById("nhhtcSua").value = $scope.TTBV.NgayHetHanTrangChu != null ? $scope.ReturnDate2($scope.TTBV.NgayHetHanTrangChu) : null;
                            $scope.HinhCu = $scope.TTBV.HinhAnh;
                            $scope.FileCu = [...$scope.TTBV.TapTinDinhKem];
                        }
                    }
                    $timeout(hamcho2, 300);
                }
            }
            $timeout(hamcho, 300);
        }

        ///////////////////////////////////// SỬA TIN TƯỜNG ////////////////////////
        $scope.InitSuaTuong = function (MaTinTuc) {
            $scope.TTBV = "";
            $scope.LayChiTietBaiVietTuong(MaTinTuc);
            var hamcho = function () {
                if ($scope.TTBV == "") {
                    $timeout(hamcho, 300);
                }
                else {
                    blockUI.stop();
                    document.getElementById("editor1").innerHTML = $scope.TTBV.NoiDung;
                }
            }
            $timeout(hamcho, 300);
        }

        // Cấu hình đường dẫn
        var baseURL = window.location.protocol + "//" + window.location.host + "/";
        var appURL = { pathAPI: baseURL };

        // *************** Chỉnh sửa - Upload hình *****************
        var uploaderImage = $scope.uploaderImage = new FileUploader({
            url: appURL.pathAPI + CommonController.urlAPI.API_UploadImage,
            withCredentials: true,
        });

        uploaderImage.filters.push({
            name: 'upImg',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                //debugger
                if ('|tif|tiff|jpg|jpeg|bmp|gif|png|'.indexOf(type) !== -1) {
                    setTimeout(deferred.resolve, 1e3);
                    return true;
                }
                else {
                    alert("Không hỗ trợ định dạng file này!!");
                    return false;
                }
            }
        });

        // Xóa hình database
        $scope.xoaHinh = function (MaTinTuc, event) {
            event.preventDefault();
            if (window.confirm("bạn chắc chắn xóa hình chứ")) {
                let param = "?MaTinTuc=" + MaTinTuc;
                var res = CommonController.deleteData(CommonController.urlAPI.API_XoaHinh, param);
                res.then(
                    function succ(response) {
                        alert(response.data)
                        $scope.TTBV.HinhAnh = null;
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                        alert("Có Lỗi Phát Sinh");
                    }
                );
            }
        }

        uploaderImage.onAfterAddingFile = function (item) {
            uploaderImage.uploadItem(item);
        }

        uploaderImage.onSuccessItem = function (item, response, status, headers) {
            if (response !== "Upload Failed" || response !== "Files Is Duplicate,Upload Failed") {
                $scope.TTBV.HinhAnh = item.file.name;
                $scope.TTBV.HinhCu = $scope.HinhCu;
                var res = CommonController.postData(CommonController.urlAPI.API_CapNhatHinh, $scope.TTBV);
                res.then(
                    function succ(response) {
                        alert(response.data);
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                        alert("Có Lỗi Phát Sinh");
                    }
                );
            }
        }

        // Chỉnh sửa - upload tập tin
        var uploaderFile = $scope.uploaderFile = new FileUploader({
            url: appURL.pathAPI + CommonController.urlAPI.API_UploadFile,
            withCredentials: true,
        });

        uploaderFile.filters.push({
            name: 'upFile',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        // Xóa file database
        $scope.xoaFile = function (event, MaTapTin) {
            event.preventDefault();
            if (window.confirm("bạn chắc chắn xóa tập tin chứ")) {
                let param = "?MaTapTin=" + MaTapTin;
                var res = CommonController.deleteData(CommonController.urlAPI.API_XoaFile, param);
                res.then(
                    function succ(response) {
                        alert(response.data)
                        let index = $scope.TTBV.TapTinDinhKem.findIndex(x => x.MaTapTin == MaTapTin);
                        $scope.TTBV.TapTinDinhKem.splice(index, 1);
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                        alert("Có Lỗi Phát Sinh");
                    }
                );
            }
        }

        uploaderFile.onAfterAddingFile = function (item) {
            uploaderFile.uploadItem(item);
        }

        uploaderFile.onSuccessItem = function (item, response, status, headers) {
            if (response !== "Upload Failed" || response !== "Files Is Duplicate,Upload Failed") {
                let objItem = {
                    MaTinTuc: $scope.TTBV.MaTinTuc,
                    MaTapTin: 0,
                    Ten: item.file.name,
                    Url: item.file.name,
                    Size: item.file.size
                }
                var res = CommonController.postData(CommonController.urlAPI.API_CapNhatFile, objItem);
                res.then(
                    function succ(response) {
                        alert("Tập Tin Đã Được Cập Nhật");
                        objItem.MaTapTin = response.data;
                        $scope.TTBV.TapTinDinhKem.push(objItem);
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                        alert("Có Lỗi Phát Sinh");
                    }
                );
            }
        }

        // Cập nhật thông tin
        $scope.CapNhatThongTin = function () {
            if (window.confirm("Bạn chắc chắn cập nhật lại thông tin như trên chứ ?")) {
                $scope.TTBV.MaLoaiTin = $scope.MaLoaiTin.MaLoaiTin;
                $scope.TTBV.NgayHetHan = GetDateTimeFormat(document.getElementById("nhhSua").value);
                $scope.TTBV.NgayHetHanTinMoi = GetDateTimeFormat(document.getElementById("nhhtmSua").value)
                $scope.TTBV.NgayHetHanTrangChu = GetDateTimeFormat(document.getElementById("nhhtcSua").value);
                $scope.TTBV.NoiDung = document.getElementById("editor1").innerHTML;
                var res = CommonController.postData(CommonController.urlAPI.API_CapNhatThongTin, $scope.TTBV);
                res.then(
                    function succ(response) {
                        alert(response.data);
                        location.href = "";
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                        alert("Có Lỗi Phát Sinh");
                    }
                );
            }
            else return;
        }

        // Cập nhật thông tin tường
        $scope.CapNhatThongTinTuong = function () {
            if (window.confirm("Bạn chắc chắn cập nhật lại thông tin như trên chứ ?")) {
                $scope.TTBV.NoiDung = document.getElementById("editor1").innerHTML;
                console.log($scope.TTBV);
                var res = CommonController.postData(CommonController.urlAPI.API_CapNhatThongTin, $scope.TTBV);
                res.then(
                    function succ(response) {
                        alert(response.data);
                        location.href = "";
                    },

                    function errorCallback(response) {
                        console.log(response.data.message);
                        alert("Có Lỗi Phát Sinh");
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

        //Hàm chuyển chữ thành kiểu viết hoa đầu
        $scope.capitalize = function (string) {
            return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
        }

        // Render ra HTML
        $scope.htmlSafe = function (data) {
            return $sce.trustAsHtml(data);
        }

        // Hiển Thị DD/MM/YYYY
        $scope.ReturnDate = function (date) {
            return moment(date).format("DD/MM/YYYY , h:mm:ss a");
        }

        // Hiển Thị DD-MM-YYYY
        $scope.ReturnDate2 = function (date) {
            return moment(date).format("DD-MM-YYYY");
        }

        // Hàm cắt chữ
        $scope.SliceString = function (string, limit) {
            if (string.length > limit) {
                return string = "...";
            }
            else return "";
        }

        // Get Date Format
        function GetDateTimeFormat(string) {
            let d = string[0] + string[1];
            let m = string[3] + string[4];
            let y = string[6] + string[7] + string[8] + string[9];
            return y + "-" + m + "-" + d;
        }
    })