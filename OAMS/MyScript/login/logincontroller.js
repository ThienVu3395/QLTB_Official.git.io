(function () {
    "use strict"
    angular.module("oamsapp")
        .controller("logincontroller",
            ["$scope", "$http", "appSettings", "loginservice", "userProfile",
    function ($scope, $http, appSettings, loginservice, userProfile) {
       


        $scope.responseData = "";
        
        if (getParameterByName("logout")) {
            logout();
        }
        $scope.userName = "";
        $scope.userRegistrationEmail = "";
        $scope.userRegistrationPassword = "";
        $scope.userRegistrationConfirmPassword = "";

        $scope.userLoginEmail = "Administrator";
        $scope.userLoginPassword = "123@ABC";//1234@Admin;"123@Abc"

        $scope.accessToken = "";
        $scope.refreshToken = "";
        $scope.error = false;
        $scope.errormess = "";
        $scope.dataLogin = userProfile.getProfile();
        if ($scope.dataLogin.isLoggedIn) {
            logout();
        }
        //Function to Login. This will generate Token 
        $scope.login = function () {
            userProfile.clearall();
            //This is the information to pass for token based authentication
            var userLogin = {
                grant_type: 'password',
                username: $scope.userLoginEmail,
                password: $scope.userLoginPassword
            };
            var promiselogin = loginservice.login(userLogin);
            promiselogin.then(function (resp) {
                console.log(resp.data)
                alert("Đăng Nhập Thành Công");
                $scope.userName = resp.data.userName;
                $scope.roleName = resp.data.roleName;
                userProfile.setProfile(resp.data.userName, resp.data.access_token, resp.data.refresh_token, resp.data.roleName);
                //var respd;
                //respd = loginservice.postdata("api/userinfo/getInfoUser", $.param({ username: $scope.userName, shopingcart: "" }));
                //respd.then(function (response) {
                //    if (response.data != null) {
                //        //userProfile.setShoping(response.data.CountShoppingCart, response.data.ShoppingCart);
                //        userProfile.setProfileExten(response.data.HOTEN, response.data.FILEHINH);
                //    }
                    
                window.location.href = appSettings.serverPath + appSettings.serverHome;
                //}
                //, function errorCallback(response) {
                //    $scope.error = true;
                //    $scope.errormess = "Tài khoản đã bị khóa!";
                //    userProfile.clearall();
                //});
                //userProfile.clearShopingcart();

            }, function (err) {
                $scope.errormess = "Tên tài khoản hoặc mật khẩu không tồn tại!";
                $scope.error = true;
                alert($scope.errormess)
            });

        };
        
        function logout() {
            var respd;
            respd = loginservice.postdata("api/Account/Logout");
            respd.then(function (response) {
                userProfile.clearall();
            }, function errorCallback(response) {
                userProfile.clearall();
            });
        };
    }]);
}());