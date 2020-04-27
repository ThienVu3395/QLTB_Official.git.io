(function () {
    "use strict"
    angular.module("oamsapp")
        .controller("homecontroller",
            ["$rootScope", "$document", "$scope", "$uibModal", "$timeout", "$element", "appSettings", "loginservice", "userProfile",
                function ($rootScope, $document, $scope, $uibModal, $timeout, $element, appSettings, loginservice, userProfile) {
                    $scope.homeurl = appSettings.serverPath;
                    $scope.dataLoggedIn = {};
                    $scope.isLoggedIn = false;
                    $scope.userName = "";
                    $scope.FulluserName = "";
                    $scope.ulrimage = "";
                    $scope.access_token = "";
                    $scope.roleName = "";
                    $scope.viewwwin = false;
                    getdataUser();

                    //$scope.Notification = 
                    //$scope.Chats.onConnected();
                    function getdataUser() {
                        var data = userProfile.getProfile();
                        if (data.isLoggedIn) {
                            $scope.isLoggedIn = data.isLoggedIn;
                            $scope.userName = data.username;
                            $scope.access_token = data.access_token;
                            $scope.roleName = data.roleName;
                            $scope.viewwwin = $scope.roleName != 'Docgia';
                            var datae = userProfile.getProfileExten();
                            $scope.FulluserName = datae.fileusername;
                            if (datae.ulrimage != null && datae.ulrimage != '' && datae.ulrimage != 'null') {
                                $scope.ulrimage = appSettings.serverPath + datae.ulrimage;
                            }
                            else {
                                $scope.ulrimage = appSettings.serverPath + 'Content/image/user.png';
                            }
                        }
                        else {
                            // window.location.href = appSettings.serverPath + appSettings.serverLogin;
                        }
                    }
                    $scope.chuyenthongbao = function (item) {
                        if (item.inttype == 1)
                            window.location.href = appSettings.serverPath + "Qlkhaithac/xetduyetYeucau?id=" + item.intkey + "&idct=" + item.intkey1;
                        else if (item.inttype == 2)
                            window.location.href = appSettings.serverPath + "Qlkhaithac/dsycduyettaikhoan";
                        else window.location.href = appSettings.serverPath + "Baoquan/qlxuattailieu";
                    }
                    $scope.$on('otherloginOntime', function (e, data) {
                        $scope.logout();
                    });
                    $scope.logout = function () {
                        var respd;
                        respd = loginservice.postdata("api/Account/Logout");
                        respd.then(function (response) {
                            userProfile.clearall();
                            window.location.href = appSettings.serverPath + appSettings.serverLogin;
                        }, function errorCallback(response) {
                            userProfile.clearall();
                            window.location.href = appSettings.serverPath + appSettings.serverLogin;
                        });

                    };
                    $scope.hosocanhan = function () {
                        var parentElem =
                            angular.element($document[0].querySelector('.main_container'))
                        var modalInstance = $uibModal.open({
                            animation: true,
                            backdrop: 'static',
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '_ProfilePopup.html',
                            controller: 'hosocanhancontroller',
                            controllerAs: '$ctrl',
                            size: 'lg',
                            appendTo: parentElem,
                            resolve: {
                                loginservice: loginservice,
                                userProfile: userProfile,
                                appSettings: appSettings
                            }
                        });
                        modalInstance.result.then(function (c) {
                        }, function () {
                        });
                    }
                    $scope.changepass = function () {
                        var parentElem =
                            angular.element($document[0].querySelector('.main_container'))
                        var modalInstance = $uibModal.open({
                            animation: true,
                            backdrop: 'static',
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: '_ChangpassPopup.html',
                            controller: 'doimatkhaucontroller',
                            controllerAs: '$ctrl',
                            //size: 'lg',
                            appendTo: parentElem,
                            resolve: {
                                loginservice: loginservice,
                                userProfile: userProfile,
                                appSettings: appSettings
                            }
                        });
                        modalInstance.result.then(function (c) {
                        }, function () {
                        });
                    }
                    $scope.deleteshopping = function () {
                        if (confirm("Bạn có muốn xóa hết tài liệu này ra khỏi yêu cầu?")) {
                            userProfile.clearShopingcart();
                            $scope.countitem = userProfile.getcountShoping();
                            $rootScope.$broadcast('handleBroadcast', 0);
                        }
                    };
                    $scope.countitem = userProfile.getcountShoping();


                    $scope.$on('handleBroadcast', function () {
                        $scope.countitem = userProfile.getcountShoping();
                    });


                    $scope.pData = [];
                    $scope.idfunction;
                    getdatachucnang();
                    function getdatachucnang() {
                        var respd;
                        //respd = loginservice.getdata("api/acountinfo/getuserchucnanggroup");
                        //respd.then(function (response) {
                        //    $scope.pData = response.data;
                        //}, function errorCallback(response) {

                        //});
                    }

                }])
        .controller("Chatcontroller",
            ["$rootScope", "$document", "$scope", "$uibModal", "$timeout", "$element", "appSettings", "loginservice", "userProfile", "ChatService",
                function ($rootScope, $document, $scope, $uibModal, $timeout, $element, appSettings, loginservice, userProfile, ChatService) {
                    $scope.homeurl = appSettings.serverPath;
                    $scope.dataLoggedIn = {};
                    $scope.isLoggedIn = false;
                    $scope.userName = "";
                    $scope.FulluserName = "";
                    $scope.ulrimage = "";
                    $scope.access_token = "";
                    $scope.roleName = "";
                    $scope.viewwwin = false;
                    getdataUser();
                    function getdataUser() {
                        var data = userProfile.getProfile();
                        if (data.isLoggedIn) {
                            $scope.isLoggedIn = data.isLoggedIn;
                            $scope.userName = data.username;
                            $scope.access_token = data.access_token;
                            $scope.roleName = data.roleName;
                            $scope.viewwwin = $scope.roleName != 'Docgia';
                            var datae = userProfile.getProfileExten();
                            $scope.FulluserName = datae.fileusername;
                            if (datae.ulrimage != null && datae.ulrimage != '' && datae.ulrimage != 'null') {
                                $scope.ulrimage = appSettings.serverPath + datae.ulrimage;
                            }
                            else {
                                $scope.ulrimage = appSettings.serverPath + 'Content/image/user.png';
                            }
                        }
                        else {
                            // window.location.href = appSettings.serverPath + appSettings.serverLogin;
                        }
                    }
                    //Chat----------
                    $scope.Chats = ChatService;
                    $scope.sendchat = function (item) {
                        if (item.contentchat != undefined && item.contentchat != '') {
                            item.Conversations.push({ Name: '_Me', content: item.contentchat, status: true })
                            $scope.Chats.send(item.Name, item.contentchat);
                            item.contentchat = "";
                            $timeout(function () {
                                var elems = $element.find('#bodychat' + item.Name);
                                if (elems.length > 0)
                                    elems.scrollTop(elems[0].scrollHeight);
                                // Should return array of ng-repeated elements!
                            });
                        }

                    }
                    //userProfile.saveitem("openchatuser");
                    $scope.openchat = userProfile.getsaveitem('openchatuser');

                    $scope.clickopenchat = function () {
                        if ($scope.openchat == '1') {
                            userProfile.saveitem('openchatuser', '0');
                        }
                        else {
                            userProfile.saveitem('openchatuser', '1');
                        }
                    }

                    $scope.useronlineCurr = function () {
                        return function (item) {
                            return item.TimeUp > moment().toDate();
                        };
                    };
                    //$scope.windowsChats = [];
                    $scope.closewinChat = function (toUser) {
                        for (var i = 0; i < $scope.Chats.windowsChats.length; i++) {
                            if ($scope.Chats.windowsChats[i].Name == toUser) {
                                $scope.Chats.windowsChats.splice(i, 1);
                                $scope.listChats = $scope.listChats.replace('_;' + toUser + ';', '');
                                userProfile.saveitem('listChats', $scope.listChats);
                                if ($scope.Chats.windowsChats.length == 0) {
                                    //$('#home3').trigger('click');
                                    $('[href="#home3"]').tab('show');
                                }
                                break;
                            }
                        }
                    }
                    $scope.newwindowChat = function (toUser, reload) {
                        var isnew = true;
                        for (var i = 0; i < $scope.Chats.windowsChats.length; i++) {
                            if ($scope.Chats.windowsChats[i].Name == toUser) {
                                isnew = false;
                                $timeout(function () {
                                    var elems = $element.find('[href="#chat' + toUser + '"]');
                                    elems.tab('show');

                                    // Should return array of ng-repeated elements!
                                });
                            }
                        }
                        if (isnew) {
                            if (reload) {
                                if ($scope.listChats != undefined && $scope.listChats != '') {
                                    $scope.listChats += '_;' + toUser + ';';
                                    userProfile.saveitem('listChats', $scope.listChats);
                                } else {
                                    $scope.listChats = '_;' + toUser + ';';
                                    userProfile.saveitem('listChats', $scope.listChats);
                                }
                            }

                            for (var i = 0; i < $scope.Chats.UserList.length; i++) {
                                if ($scope.Chats.UserList[i].Name == toUser) {
                                    var winnew = {};
                                    winnew.Name = toUser;
                                    winnew.Fileimage = $scope.Chats.UserList[i].Fileimage;
                                    winnew.FullName = $scope.Chats.UserList[i].FullName;
                                    winnew.Conversations = [];
                                    $scope.Chats.windowsChats.push(winnew);
                                    if (reload) {
                                        $timeout(function () {
                                            var elems = $element.find('[href="#chat' + winnew.Name + '"]');
                                            elems.tab('show');

                                            // Should return array of ng-repeated elements!
                                        });
                                    }
                                    var respd = loginservice.postdata("api/userinfo/getchatdata", $.param({ valstring1: toUser }));
                                    respd.then(function (response) {
                                        if (response.data != null) {
                                            if (response.data.data != null)
                                                for (var k = 0; k < response.data.data.length; k++) {
                                                    $scope.Chats.windowsChats[$scope.Chats.windowsChats.length - 1].Conversations.push(response.data.data[k]);
                                                }
                                            $timeout(function () {
                                                var elems1 = $element.find('#bodychat' + toUser);
                                                if (elems1.length > 0)
                                                    elems1.scrollTop(elems1[0].scrollHeight);
                                            });
                                        }
                                    }, function errorCallback(response) {

                                    });
                                    break;
                                }
                            }

                        }
                    }
                    loadopenchat();
                    function loadopenchat() {
                        if ($scope.openchat == '1') {
                            var c = $("#ace-settings-box");
                            if (c.length > 0) {
                                if (c[0].className.indexOf('open') >= 0) {

                                }
                                else {
                                    $("#ace-settings-box").toggleClass("open");
                                }
                            }
                        }
                    }
                    $scope.keydownsearch = function (item) {
                        if (event.keyCode == 13) {
                            $scope.sendchat(item);
                        }
                    }
                    $scope.unread = false;
                    $scope.readedmes = function (item) {
                        $scope.unread = false;
                        item.isnew = false;
                    }
                    $scope.$on('newWinchat', function (e, data) {
                        $timeout(function () {
                            var elems = $element.find('[href="#chat' + data + '"]');
                            elems.tab('show');
                            var elems1 = $element.find('#bodychat' + data);
                            if (elems1.length > 0)
                                elems1.scrollTop(elems1[0].scrollHeight);
                            $scope.unread = true;
                            for (var i = 0; i < $scope.Chats.windowsChats.length; i++)
                                if ($scope.Chats.windowsChats[i].Name == data) {
                                    $scope.Chats.windowsChats[i].isnew = true;
                                }

                            var audio = new Audio(appSettings.serverPath + 'Content/audio/all-eyes-on-me.mp3');
                            audio.play();
                            // Should return array of ng-repeated elements!
                        });

                    });
                    $scope.$on('onConnectedF', function (e, data) {
                        if ($scope.Chats.id == data) {
                            $scope.listChats = userProfile.getsaveitem('listChats').toString();
                            if ($scope.listChats != undefined && $scope.listChats != '') {
                                var li = $scope.listChats.split('_');
                                for (var i = 0; i < li.length; i++) {
                                    var ui = li[i].replace(';', '');
                                    ui = ui.replace(';', '');
                                    if (ui != '' && ui != undefined && ui != '0')
                                        $timeout(function () {
                                            $scope.newwindowChat(ui, false);
                                        });
                                }
                            }
                        }

                    });


                }])
        .controller("functionmenu",
            ["$rootScope", "$document", "$scope", "$uibModal", "appSettings", "loginservice", "userProfile",
                function ($rootScope, $document, $scope, $uibModal, appSettings, loginservice, userProfile) {

                    $scope.pData = [];
                    $scope.pgroupData = [];
                    $scope.idfunction;
                    $scope.onload = function (id) {
                        $scope.idfunction = id;
                    }
                    $scope.pshow = [];

                    function getdatachucnang() {
                        var respd = loginservice.getdata("api/userinfo/getuserchucnang");
                        respd.then(function (response) {
                            $scope.pData = response.data;
                            for (var i = 0; i < $scope.pData.length; i++) {

                                $scope.activelink[$scope.pData[i].ID] = "";
                                if ($scope.pData[i].LINKS) {
                                    if ($scope.url.indexOf($scope.pData[i].LINKS) >= 0) {
                                        $scope.activelink[$scope.pData[i].ID] = "active";
                                        $scope.activegroup[$scope.pData[i].NHOMID] = "active open";
                                    }
                                }
                                $scope.pData[i].LINKS = appSettings.serverPath + $scope.pData[i].LINKS;
                            }
                        }, function errorCallback(response) {
                            $scope.pData = [];
                        });
                    }
                    getdatagroupchucnang();
                    function getdatagroupchucnang() {
                        var respd = loginservice.getdata("api/userinfo/getusergroupchucnang");
                        respd.then(function (response) {
                            $scope.pgroupData = response.data;
                            for (var i = 0; i < $scope.pgroupData.length; i++) {
                                $scope.activegroup[$scope.pgroupData[i].ID] = "";
                            }
                            getdatachucnang();
                        }, function errorCallback(response) {
                            $scope.pgroupData = [];
                        });
                    }
                    $scope.url = window.location.href;
                    $scope.activegroup = {};
                    $scope.activelink = {};
                    gethucnangactive();
                    function gethucnangactive() {
                        $scope.activegroup[100] = "";
                        if ($scope.url.indexOf("/Home") > 0) $scope.activegroup[100] = "active";

                        ////------------------------------------
                        //if ($scope.url.indexOf("/Admin") > 0) $scope.activegroup[6] = "active open";

                        //if ($scope.url.indexOf("/Admin/dsnhanvien") > 0) $scope.activelink[19] = "active";
                        //if ($scope.url.indexOf("/Admin/phanquyen") > 0) $scope.activelink[20] = "active";
                        //if ($scope.url.indexOf("/Admin/cauhinh") > 0) $scope.activelink[21] = "active";
                        //if ($scope.url.indexOf("/Admin/logsystem") > 0) $scope.activelink[22] = "active";
                        //if ($scope.url.indexOf("/Admin/nhomquyen") > 0) $scope.activelink[23] = "active";
                    }
                    $scope.show = function (id) {
                        for (var i = 0; i < $scope.pData.length; i++) {
                            if (id == $scope.pData[i].ID)
                                return true;
                        }
                        return true;
                    }
                    $scope.showgroup = function (id) {
                        for (var i = 0; i < $scope.pData.length; i++) {
                            if (id == $scope.pData[i].NHOMID)
                                return true;
                        }
                        return true;
                    }
                }])

        //Phần của Vũ thêm vào để quản lý bảng tin
        .factory("CommonController", ["$http", "blockUI",
            function ($http) {
                // Tạo UrlAPI động
                var baseURL = window.location.protocol + "//" + window.location.host + "/";
                var appURL = { pathAPI: baseURL };

                // Hàm Get API
                this.getData = (urlAPI, Param) => {
                    var res = $http({
                        url: appURL.pathAPI + urlAPI + Param,
                        method: 'GET'
                    });
                    return res;
                };

                // Hàm Post API
                this.postData = (urlAPI, Data) => {
                    var res = $http({
                        url: appURL.pathAPI + urlAPI,
                        method: 'POST',
                        data: Data,
                        headers: { 'Content-Type': 'application/json' }
                    })
                    return res
                };

                // Hàm Delete API   
                this.deleteData = (urlAPI, param) => {
                    var res = $http({
                        url: appURL.pathAPI + urlAPI + param,
                        method: 'DELETE'
                    })
                    return res;
                }

                // Danh sách các APIs
                var urlAPI = {
                    // Trang Chủ
                    API_LayDanhSachLoaiTin: "API/QuanLyBangTin/LayDanhSachLoaiTin",
                    API_LaySinhNhat: "API/QuanLyBangTin/LaySinhNhat",
                    API_LayChiTietBaiViet: "API/QuanLyBangTin/LayChiTietBaiViet",              
                    API_LayChiTietBaiViet_Tuong: "API/AdminBangTin/LayChiTietBaiViet_Tuong",              
                    API_LayDanhSachBaiViet_TheoDanhMuc_PhanTrang: "API/QuanLyBangTin/LayDanhSachBaiViet_TheoDanhMuc_PhanTrang",
                    API_LayBaiVietTuong: "API/QuanLyBangTin/LayBaiVietTuong",
                    API_LayBaiVietTuong_DieuKien: "API/QuanLyBangTin/LayBaiVietTuong_DieuKien",
                    API_LayBaiVietTuong_TatCa: "API/QuanLyBangTin/LayBaiVietTuong_TatCa",
                    API_GuiBinhLuan: "API/QuanLyBangTin/GuiBinhLuan",

                    // Trang chủ dự phòng
                    API_LayTinNoiBat: "API/QuanLyBangTin/LayTinNoiBat",
              
                    // Thêm Bài Viết
                    API_LayLoaiTin_ThemBaiViet: "API/QuanLyBangTin/LayLoaiTin_ThemBaiViet",
                    API_UploadImage: "API/QuanLyBangTin/UploadImage",
                    API_UploadFile: "API/QuanLyBangTin/UploadFiles",
                    API_ThemBaiViet: "API/QuanLyBangTin/ThemBaiViet",
                    API_ThemBaiViet_Tuong: "API/QuanLyBangTin/ThemBaiViet_Tuong",

                    // Admin
                    API_LayDanhSachBaiViet: "API/AdminBangTin/LayDanhSachBaiViet",
                    API_LayDanhSachBaiViet_TheoDanhMuc: "API/AdminBangTin/LayDanhSachBaiViet_TheoDanhMuc",
                    API_LayDanhSachBaiViet_TheoHienThi: "API/AdminBangTin/LayDanhSachBaiViet_TheoHienThi",
                    API_LayDanhSachBaiViet_TheoDieuKien: "API/AdminBangTin/LayDanhSachBaiViet_TheoDieuKien",

                    API_PhanTrang_TatCa: "API/AdminBangTin/PhanTrang_TatCa",
                    API_PhanTrang_TheoDanhMuc: "API/AdminBangTin/PhanTrang_TheoDanhMuc",
                    API_PhanTrang_TheoHienThi: "API/AdminBangTin/PhanTrang_TheoHienThi",
                    API_PhanTrang_TheoDieuKien: "API/AdminBangTin/PhanTrang_TheoDieuKien",
                    API_PhanTrang_Tuong: "API/AdminBangTin/PhanTrang_Tuong",

                    API_DuyetTin: "API/AdminBangTin/DuyetTin",
                    API_HuyDuyetTin : "API/AdminBangTin/HuyDuyetTin",
                    API_XoaTin : "API/AdminBangTin/XoaTin",
                    API_SuaTin: "API/AdminBangTin/SuaTin",

                    //*** Sửa Tin ***//
                    API_XoaHinh: "API/AdminBangTin/XoaHinh",
                    API_CapNhatHinh : "API/AdminBangTin/CapNhatHinh",
                    API_XoaFile: "API/AdminBangTin/XoaFile",
                    API_CapNhatFile: "API/AdminBangTin/CapNhatFile",
                    API_CapNhatThongTin: "API/AdminBangTin/CapNhatThongTin",
                };

                return {
                    getData: this.getData,
                    postData: this.postData,
                    deleteData: this.deleteData,
                    urlAPI: urlAPI,
                }
            }]);
}());