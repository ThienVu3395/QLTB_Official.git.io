angular.module("oamsapp")
    .controller("ThemBaiViet", function ($scope, CommonController, FileUploader, blockUI) {
        // Khai Báo OBJ THÊM
        $scope.objThem = {
            TinNoiBat: false,
            HienThi: false,
            TapTinDinhKem: [],
            HinhAnh: null,
            NgayHetHan: null,
            NgayHetHanTM: null,
            NgayHetHanTC: null,
        }

        // Giả Lập Việc Duyệt Tin
        localStorage.setItem("Permission", "0");

        // Kiểm Tra Quyền Khi Duyệt Tin
        $scope.checkPermission = function () {
            let t = localStorage.getItem("Permission");
            if (t == "0") {
                alert("Bạn Chưa Được Cấp Quyền Để Duyệt Tin");
                $scope.objThem.HienThi = false;
            }
            else {
                $scope.objThem.HienThi != $scope.objThem.HienThi;
            }
        }

        // Lấy Danh sách loại tin
        $scope.LayDanhSachLoaiTin = function () {
            //var res = CommonController.getData(CommonController.urlAPI.API_LayLoaiTin_ThemBaiViet, "");
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachLoaiTin, ""); // test demo
            res.then(
                function succ(response) {
                    $scope.DanhSachLoaiTin = response.data;
                    let wall = {
                        MaLoaiTin: 0,
                        Ten: "Tường Công Ty",
                    }
                    $scope.DanhSachLoaiTin.push(wall);
                    $scope.MaLoaiTin = $scope.DanhSachLoaiTin[0];
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // UpLoad
        var baseURL = window.location.protocol + "//" + window.location.host + "/";
        var appURL = { pathAPI: baseURL };

        //Upload Hình Ảnh
        var uploaderImage = $scope.uploaderImage = new FileUploader({
            url: appURL.pathAPI + CommonController.urlAPI.API_UploadImage,
            withCredentials: true
        });

        uploaderImage.filters.push({
            name: 'upImg',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                //debugger
                if ('|tif|tiff|jpg|jpeg|bmp|gif|'.indexOf(type) !== -1) {
                    setTimeout(deferred.resolve, 1e3);
                    return true;
                }
                else {
                    alert("Không hỗ trợ định dạng file này!!");
                    return false;
                }
            }
        });

        $scope.removeImg = function (event) {
            event.preventDefault();
            if (confirm("Bạn có chắc xóa ảnh này chứ ?")) {
                uploaderImage.clearQueue();
                $scope.objThem.HinhAnh = null;
            }
        }

        uploaderImage.onAfterAddingFile = function (item) {
            $scope.objThem.HinhAnh = item.file.name;
        }

        //Upload Tập Tin
        var uploaderFile = $scope.uploaderFile = new FileUploader({
            url: appURL.pathAPI + CommonController.urlAPI.API_UploadFile,
            withCredentials: true
        });

        uploaderFile.filters.push({
            name: 'upFile',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        $scope.removeFile = function (item, event, index) {
            event.preventDefault();
            if (confirm("Bạn có chắc xóa tệp này chứ ?")) {
                uploaderFile.removeFromQueue(item);
                $scope.objThem.TapTinDinhKem.splice(index, 1);
            }
            else return;
        }

        uploaderFile.onAfterAddingFile = function (item) {
            let objTapTin = {
                Ten: item.file.name,
                Url: item.file.name,
            }
            $scope.objThem.TapTinDinhKem.push(objTapTin);
        }

        // Thêm Bài Viết
        $scope.ThemBaiViet = function () {
            if (confirm("Bạn chắc chắn thêm bài viết với nội dung như trên chứ ?")) {
                $scope.objThem.MaLoaiTin = $scope.MaLoaiTin.MaLoaiTin;
                $scope.objThem.NoiDung = document.getElementById("editor1").innerHTML;
                if (uploaderImage.queue.length > 0) {
                    uploaderImage.uploadAll();
                }
                if (uploaderFile.queue.length > 0) {
                    uploaderFile.uploadAll();
                }
                blockUI.start();
                let API = "";
                if ($scope.objThem.MaLoaiTin !== 0) {
                    API = CommonController.urlAPI.API_ThemBaiViet;
                }
                else {
                    API = CommonController.urlAPI.API_ThemBaiViet_Tuong;
                }
                var res = CommonController.postData(API, $scope.objThem);
                res.then(
                    function succ(response) {
                        blockUI.stop();
                        alert(response.data);
                        location.href = "";
                    },

                    function errorCallback(response) {
                        console.log(response.data.message)
                    }
                )
            }
            else return;
        }
    })