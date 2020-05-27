(function () {
    "use strict"
    angular.module("oamsapp")
    .controller('viewfilepdfCtrl', ["$scope", "$http", "$uibModalInstance", "blockUI", "appSettings", "loginservice", "userProfile", "idselect",
function ($scope, $http, $uibModalInstance, blockUI, appSettings, loginservice, userProfile, idselect) {
    var $ctrl = this;

    $ctrl.sumitformedit = function () {

    }
    $ctrl.ok = function () {
        $ctrl.presult = "0";
    };
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $ctrl.urldoc = "http://localhost:36467/Viewfile/viewfileonline";
    $ctrl.pdf = {
        src: '',  // get pdf source from a URL that points to a pdf
        data: null // get pdf source from raw data of a pdf
    };
    $ctrl.Permispdf = {
        download: 'false',  // get pdf source from a URL that points to a pdf
        print: 'false' // get pdf source from raw data of a pdf
    };

    getdatafilePDF();

    function getdatafilePDF() {
        blockUI.start();
        //var resp = loginservice.getdatafile("api/viewfileonline/getviewpdf?id=1");
        var resp = loginservice.getdatafile("api/QLVanBan/getviewpdf?fileName=" + idselect);
        resp.then(function (response) {
            $ctrl.pdf.data = new Uint8Array(response.data);
            if (!$ctrl.reload)
                $ctrl.pageview = 1;
            //document.title = 'FSM - Hệ thống quản trị số hóa tài liệu';
            blockUI.stop();

        }
        , function errorCallback(response) {
            $ctrl.pdf.data = null;
            blockUI.stop();
            //document.title = 'FSM - Hệ thống quản trị số hóa tài liệu';
        });
    }

    $ctrl.onPageLoad = function (page) {
        $ctrl.page1 = page;
        $ctrl.pageview = page;
    };
}]);
}());