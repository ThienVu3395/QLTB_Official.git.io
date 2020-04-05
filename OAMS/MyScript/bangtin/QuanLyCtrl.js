angular.module("oamsapp")
    .controller("adminBT", function ($scope, CommonController, FileUploader, blockUI ,$timeout,$log) {
        $scope.Init = function (status) {
            $scope.DsLoaiTin = [];
            $scope.LayDanhSachLoaiTin();
            var hamcho = function () {
                if ($scope.DsLoaiTin.length == 0) {
                    $timeout(hamcho, 400);
                }
                else {
                    blockUI.stop();
                    if (status == 'qlbv') {
                        $scope.TieuDe = "Bài Viết";
                    }
                    else if (status == 'qlbl') {
                        $scope.TieuDe = "Bình Luận";
                    }
                }
            }
            $timeout(hamcho, 400);           
        }

        // Lấy Danh Sách Loại Tin
        $scope.LayDanhSachLoaiTin = function () {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachLoaiTin, '');
            res.then(
                function succ(response) {
                    $scope.DsLoaiTin = response.data;
                },

                function errorCallback(response) {
                    return response.data.message;
                }
            );
        }

        // Lấy Toàn Bộ Danh Sách Bài Viết ( mặc định ở trang 1 )
        $scope.LayDanhSachBaiViet = function () {
            blockUI.start({
                message: 'Xin Vui Lòng Chờ...',
            });
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachLoaiTin, '');
            res.then(
                function succ(response) {
                    $scope.DsLoaiTin = response.data;
                },

                function errorCallback(response) {
                    return response.data.message;
                }
            );
        }

        $scope.totalItems = 64;
        $scope.currentPage = 1;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            $log.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
    })