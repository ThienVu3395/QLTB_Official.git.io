angular.module("oamsapp")
    .controller("ThemBaiViet", function ($scope, CommonController, FileUploader) {
        // Get Date Format
        function GetDateTimeFormat(string) {
            let d = string[0] + string[1];
            let m = string[3] + string[4];
            let y = string[6] + string[7] + string[8] + string[9];
            return y + "-" + m + "-" + d;
        }

        // Get Time Format
        function GetTime() {
            let cr = new Date();
            let times = cr.getFullYear() + "-" + (cr.getMonth() + 1) + "-" + cr.getDate() + " " + cr.getHours() + ":" + cr.getMinutes() + ":" + cr.getSeconds() + "." + cr.getMilliseconds();
            return times;
        }

        // Khai Báo OBJ THÊM
        $scope.objThem = {
            TinNoiBat: false,
            HienThi: false,
            TapTinDinhKem: [],
            HinhAnh: "",
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
        $scope.ttup = false;
        $scope.ttIm = false;
        $scope.ttImg = false;
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

        uploaderImage.filters.push({
            name: 'upImg',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
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
        }

        uploaderImage.onAfterAddingFile = function (item) {
            $scope.ttup = true;
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
        }

        uploaderFile.onSuccessItem = function (item, response, status, headers) {
            alert(response);
            let index = uploaderFile.getIndexOfItem(item);
            document.getElementById("ttFile" + index).style.display = 'none';
            document.getElementById("ttFileSuccess" + index).className = "action-buttons";
            if (response !== "Upload Failed" || response !== "Files Is Duplicate,Upload Failed") {
                let objItem = {
                    Ten: item.file.name,
                    Url: item.file.name,
                    Size : item.file.size
                }
                $scope.TapTinDinhKem.push(objItem);
            }
        }

        // Thêm Bài Viết
        $scope.ThemBaiViet = function () {
            $scope.objThem.MaLoaiTin = $scope.MaLoaiTin.MaLoaiTin;
            $scope.objThem.NoiDung = document.getElementById("editor1").innerHTML;
            $scope.objThem.NgayTao = GetTime();
            $scope.objThem.NgayHetHan = GetDateTimeFormat($scope.objThem.NgayHetHan);
            $scope.objThem.NgayHetHanTM = GetDateTimeFormat($scope.objThem.NgayHetHanTM);
            $scope.objThem.NgayHetHanTC = GetDateTimeFormat($scope.objThem.NgayHetHanTC);
            $scope.objThem.TapTinDinhKem = $scope.TapTinDinhKem;
            console.log($scope.objThem);
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
                    alert(response.data);
                    location.href = "";
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }
    })