angular.module("oamsapp")
    .controller("ThemBaiViet", function ($scope, CommonController, FileUploader, $timeout, blockUI) {
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