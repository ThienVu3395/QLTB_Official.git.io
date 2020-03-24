(function () {
    "use strict"
    angular.module("oamsapp")
        .controller("homeindexCtrl",
            ["$rootScope", "$document", "$scope", "$uibModal", "appSettings", "loginservice", "userProfile",
                function ($rootScope, $document, $scope, $uibModal, appSettings, loginservice, userProfile) {
                    $scope.pData = [];
                    getdatachucnang();

                    function getdatachucnang() {
                        var respd;
                        //respd = loginservice.getdata("api/acountinfo/getuserchucnanggroup");
                        //respd.then(function (response) {
                        //    $scope.pData = response.data;
                        //    for(var i=0; i<$scope.pData.length; i++ )
                        //    {
                        //        $scope.pData[i].LINKS = appSettings.serverPath + $scope.pData[i].LINKS;
                        //    }
                        //}, function errorCallback(response) {

                        //});
                    }

                }]);
}());