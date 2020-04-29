angular.module("oamsapp")
    .controller("suaBVT", function ($scope, CommonController, blockUI, FileUploader, $timeout, $sce) {
        // Lấy Chi Tiết Bài Viết Tường
        $scope.LayChiTietBaiVietTuong = function (MaTinTuc) {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            let param = "?MaTinTuc=" + MaTinTuc;
            var res = CommonController.getData(CommonController.urlAPI.API_LayChiTietBaiViet_Tuong, param);
            res.then(
                function succ(response) {
                    $scope.TTBV = response.data;
                    console.log($scope.TTBV);
                    blockUI.stop();
                },

                function errorCallback(response) {
                    console.log(response.data.message);
                }
            );
        }

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
                var res = CommonController.deleteData(CommonController.urlAPI.API_XoaFileTuong, param);
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
                var res = CommonController.postData(CommonController.urlAPI.API_CapNhatFileTuong, objItem);
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

        // Cập nhật thông tin tường
        $scope.CapNhatThongTinTuong = function () {
            if (window.confirm("Bạn chắc chắn cập nhật lại thông tin như trên chứ ?")) {
                $scope.TTBV.NoiDung = document.getElementById("editor1").innerHTML;
                var res = CommonController.postData(CommonController.urlAPI.API_CapNhatThongTinTuong, $scope.TTBV);
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
    })