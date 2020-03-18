(function () {
    "use strict"
    angular.module("oamsapp")
         .controller("homecontroller",
            ["$rootScope", "$document", "$scope", "$uibModal", "appSettings", "loginservice", "userProfile","ChatService",
    function ($rootScope, $document, $scope, $uibModal, appSettings, loginservice, userProfile, ChatService) {
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
        
        $scope.Chats = ChatService;
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
    }]);
}());