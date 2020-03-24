angular.module("oamsapp")
    .controller("QlbtCrl", function ($scope, CommonController) {
        //Lấy danh sách Loại Tin
        $scope.LayDanhSachLoaiTin = function () {
            var res = CommonController.getData(CommonController.urlAPI.API_LayDanhSachLoaiTin, "");
            res.then(
                function succ(response) {
                    $scope.DanhSachLoaiTin = response.data;
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
        $scope.LayDanhSachBaiViet = function (MaLoaiTin,index) {
            $scope.MaLoaiTin = MaLoaiTin;
            let pageItems = {
                MaLoaiTin: $scope.MaLoaiTin,
                Limit: Math.round(($scope.currentPage - 1) * $scope.itemsPerPage),
                itemPerPage: $scope.itemsPerPage
            }
            if ($scope.MaLoaiTin == 5) {
                let date = new Date();
                $scope.month = date.getMonth() + 1;
                if (index !== undefined) {
                    pageItems.Month = index;
                }
                else {
                    pageItems.Month = $scope.month;
                    document.getElementById("sn" + $scope.month).className = "btn btn-app btn-danger btn-xs";
                }
            }
            var res = CommonController.postData(CommonController.urlAPI.API_LayDanhSachBaiViet_PhanTrang, pageItems);
            res.then(
                function succ(response) {
                    if (response.data.length !== 0) {
                        $scope.DanhSachTinTuc = response.data;
                        $scope.totalItems = response.data[0].CountTin;
                    }
                    else {
                        $scope.DanhSachTinTuc = [
                            {
                                TieuDe: `Danh Sách Bài Viết Cho Danh Mục Này Đang Cập Nhật`,
                            }
                        ]
                    }
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )
        }

        // Show chi tiết bài viết
        $scope.showBtn = function (MaTinTuc) {
            let param = "?MaTinTuc=" + MaTinTuc;
            var res = CommonController.getData(CommonController.urlAPI.API_LayChiTietBaiViet, param);
            res.then(
                function succ(response) {
                    //console.log(response.data);
                    $scope.ThongTinBV = response.data;
                    let newClicked = document.getElementById("ctContent" + MaTinTuc);
                    if (newClicked.className == "widget-box hide") {
                        newClicked.className = "widget-box";
                        document.getElementById("ct" + MaTinTuc).className = "red bigger-110";
                        newClicked.innerHTML = `<div class="widget-header widget-header-flat">
                                                    <h4 class="widget-title smaller">Nội Dung Chi Tiết</h4>
                                                </div>

                                                <div class="widget-body">
                                                    <div class="widget-main">
                                                        <dl id="dt-list-1">
                                                            <dt>Nội Dung</dt>
                                                            <dd>${$scope.ThongTinBV.NoiDung}</dd>
                                                            <dt>Tập Tin Đính Kèm</dt>
                                                            <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
                                                            <dt>Tác Giả</dt>
                                                            <dd>${$scope.ThongTinBV.TacGia}</dd>
                                                        </dl>
                                                    </div>
                                                </div>`;
                    }
                    else {
                        document.getElementById("ct" + MaTinTuc).className = "dark";
                        newClicked.className = "widget-box hide";
                    }
                },

                function errorCallback(response) {
                    console.log(response.data.message)
                }
            )

        }
    })