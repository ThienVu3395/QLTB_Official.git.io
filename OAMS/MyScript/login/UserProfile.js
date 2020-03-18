(function () {
    "use strict"
   
    angular.module("aims.service", ['blockUI', 'angularBootstrapNavTree', 'angularFileUpload', 'ngAnimate', 'ui.bootstrap','ui.select', 'ngSanitize', 'SignalR', 'pdfjsViewer'])
        .config(function (blockUIConfig) { 'blockUI',
            //blockUIConfigProvider.message('Fun with config');
        blockUIConfig.delay = 200;
            blockUIConfig.autoBlock = true;
            blockUIConfig.blockBrowserNavigation = true;
            //blockUIConfigProvider.template('<div class="block-ui-overlay">{{ message }}</div>');
        })
        .filter('propsFilter', function () {
            return function (items, props) {
                var out = [];

                if (angular.isArray(items)) {
                    var keys = Object.keys(props);

                    items.forEach(function (item) {
                        var itemMatches = false;

                        for (var i = 0; i < keys.length; i++) {
                            var prop = keys[i];
                            var text = props[prop].toLowerCase();
                            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }

                        if (itemMatches) {
                            out.push(item);
                        }
                    });
                } else {
                    // Let the output be the input untouched
                    out = items;
                }

                return out;
            };
        })
    .constant("appSettings", Settings)
    .factory("userProfile", ["appSettings", 
        function ($rootScope) {
            var setProfile = function (username, access_token, refresh_token, roleName) {
                localStorage.setItem('username', username);
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);
                localStorage.setItem('roleName', roleName);
            };
            var setProfileExten = function (fileusername, ulrimage) {
                localStorage.setItem('fileusername', fileusername);
                localStorage.setItem('ulrimage', ulrimage);
            };
            var getProfileExten = function () {
                var profilee = {
                    fileusername: localStorage.getItem('fileusername'),
                    ulrimage: localStorage.getItem('ulrimage'),
                }
                return profilee;
            };
            var getProfile = function () {
                var profile = {
                    isLoggedIn: localStorage.getItem('accessToken') != null,
                    username: localStorage.getItem('username'),
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken'),
                    roleName: localStorage.getItem('roleName')
                }
                return profile;
            }
            var addShopingcart = function (typeitem, iditem) {
                var i = typeitem + "-" + iditem + ";";
                if (localStorage.getItem('countitemsShopingcart') == null) {
                    clearShopingcart();
                }
                var items = getShopingcart();
                var count = getcountShoping() + 1;
                items = items + i;
                localStorage.setItem('countitemsShopingcart', count);
                localStorage.setItem('itemsShopingcart', items);
                //NumItem.prepForBroadcast(count);
            };
            var removeShopingcart = function (typeitem, iditem) {
                var count = getcountShoping()
                if (count >= 0) {
                    var i = typeitem + "-" + iditem + ";";
                    count--;
                    var items = getShopingcart();
                    items = items.replace(i, "");
                    localStorage.setItem('countitemsShopingcart', count);
                    localStorage.setItem('itemsShopingcart', items);
                }
            };
            var getShopingcart = function () {
                var items = localStorage.getItem('itemsShopingcart');
                return items;
            };
            var getcountShoping = function () {
                var _count = parseInt(localStorage.getItem('countitemsShopingcart'));
                return _count;
            };
            var setShoping = function (n, items) {
                localStorage.setItem('countitemsShopingcart', n);
                localStorage.setItem('itemsShopingcart', items);
            };
            var clearShopingcart = function () {
                localStorage.setItem('countitemsShopingcart', 0);
                localStorage.setItem('itemsShopingcart', "");
            };
            var clearall = function () {
                localStorage.removeItem("username");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("countitemsShopingcart");
                localStorage.removeItem("itemsShopingcart");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("item_projectactive");
            };
            var saveitem = function (itemname, itemvalue) {
                localStorage.setItem("item_" + itemname, itemvalue);
            };
            var getsaveitem = function(itemname) {
                return localStorage.getItem("item_" + itemname);
            };
            var clearsaveitem = function(itemname) {
                localStorage.removeItem("item_" + itemname);
            };
            return {
                clearall: clearall,
                setProfile: setProfile,
                getProfile: getProfile,
                addShopingcart: addShopingcart,
                getShopingcart: getShopingcart,
                clearShopingcart: clearShopingcart,
                getcountShoping: getcountShoping,
                removeShopingcart: removeShopingcart,
                getProfileExten: getProfileExten,
                setProfileExten: setProfileExten,
                setShoping: setShoping,
                saveitem: saveitem,
                getsaveitem: getsaveitem,
                clearsaveitem: clearsaveitem
            }
        }
    ])
    .factory("loginservice", ["appSettings", "userProfile", "$http",
function (appSettings, userProfile, $http) {
    this.login = function (userlogin) {
        var resp = $http({
            url: appSettings.serverPath + "Token",
            method: "POST",
            data: $.param({ grant_type: 'password', username: userlogin.username, password: userlogin.password }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return resp;
    };
    this.postdata = function (urlapi, data) {
        
        var accesstoken = userProfile.getProfile().access_token;
        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
        var resp = $http({
            url: appSettings.serverPath + urlapi,
            method: "POST",
            data: data,
            headers:
                        {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': authHeaders.Authorization
                        },
        });
        return resp;
    };
    this.getdata = function (urlapi) {
        var accesstoken = userProfile.getProfile().access_token;
        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
        var resp = $http({
            url: appSettings.serverPath + urlapi,
            method: "GET",
            headers:
                        {
                            'Authorization': authHeaders.Authorization
                        },
        });
        return resp;
    };
    this.getdatafile = function (urlapi) {
        var accesstoken = userProfile.getProfile().access_token;
        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
        var resp = $http({
            url: appSettings.serverPath + urlapi,
            method: "GET",
            responseType: 'arraybuffer',
            headers:
                       {
                           'foo': 'bar',
                           'Authorization': authHeaders.Authorization
                       },
        });
        return resp;
    };
    return {
        login: this.login,
        postdata: this.postdata,
        getdata: this.getdata,
        getdatafile: this.getdatafile
    }
}
    ])
    .factory('ChatService',
    ["$http", "$rootScope", "$location", "Hub", "$timeout", "userProfile", "appSettings",
    function ($http, $rootScope, $location, Hub, $timeout, userProfile, appSettings) {
        var Chats = this;

        //Chat ViewModel
        //var Chat = function (chat) {
        //    if (!chat) chat = {};

        //    var Chat = {
        //        UserName: chat.UserName || 'UserX',
        //        ChatMessage: chat.ChatMessage || 'MessageY'
        //    }

        //    return Chat;
        //}
        Chats.UserList = [];
        Chats.windowsChats = [];
        //Hub setup
        var accesstoken = userProfile.getProfile().access_token;
        var hub = new Hub("chatHub", {
            listeners: {
                'onConnected': function (id, userName, allUsers, messages) {
                    Chats.CountNotification = messages.Notifications.length;
                    Chats.DataNotification = messages.Notifications;
                    Chats.UserList = messages.dataUserOnline;
                    Chats.id = id;
                    for (var i = 0; i < Chats.UserList.length; i++) {
                        if (Chats.UserList[i].Fileimage == undefined || Chats.UserList[i].Fileimage == '') {
                            Chats.UserList[i].Fileimage = appSettings.serverPath + 'Content/image/user.png';
                        }
                        else {
                            Chats.UserList[i].Fileimage = appSettings.serverPath + Chats.UserList[i].Fileimage;
                        }
                        Chats.UserList[i].TimeUp = moment().add(5, 'hours').toDate();
                    }
                    $rootScope.$apply();
                    $rootScope.$broadcast('onConnectedF', id);
                },
                'onreceivedNotifications': function (messages) {
                    Chats.CountNotification = messages.length;
                    Chats.DataNotification = messages;
                    $rootScope.$apply();
                },
                'userNewconnected': function (messages) {
                    var k = false;
                    for (var i = 0; i < Chats.UserList.length; i++) {
                        if (Chats.UserList[i].Name == messages.Name) {
                            Chats.UserList[i].TimeUp = moment().add(5, 'hours').toDate();
                            k = true;
                        }
                    }
                    if (k == false) {
                        var inew = messages;
                        inew.Fileimage = "";
                        if (inew.Fileimage == undefined || inew.Fileimage == '') {
                            inew.Fileimage = appSettings.serverPath + 'Content/image/user.png';
                        }
                        else {
                            inew.Fileimage = appSettings.serverPath + inew.Fileimage;
                        }
                        inew.TimeUp = moment().add(5, 'hours').toDate();
                        Chats.UserList.push(inew);
                    }
                    
                    $rootScope.$apply();
                },
                'userDisconnected': function (messages) {
                    for (var i = 0; i < Chats.UserList.length; i++) {
                        if (Chats.UserList[i].Name == messages) {

                            Chats.UserList[i].TimeUp = moment().add(1, 'minutes').toDate();
                        }
                    }
                    $rootScope.$apply();
                },
                'received': function (messages) {
                    var k = false;
                    for (var i = 0; i < Chats.windowsChats.length; i++) {
                        if (Chats.windowsChats[i].Name == messages.sender) {
                            Chats.windowsChats[i].Conversations.push({ Name: messages.sender, content: messages.message });
                            k = true;
                            break;
                        }
                    }
                    if (k == false) {
                        
                        for (var i = 0; i < Chats.UserList.length; i++) {
                            if (Chats.UserList[i].Name == messages.sender) {
                                var winnew = {};
                                winnew.Name = messages.sender;
                                winnew.Fileimage = Chats.UserList[i].Fileimage;
                                winnew.FullName = Chats.UserList[i].FullName;
                                winnew.Conversations = [];
                                winnew.Conversations.push({ Name: messages.sender, content: messages.message });
                                Chats.windowsChats.push(winnew);
                                break;
                            }

                        }
                        
                    }
                    $rootScope.$apply();
                    $rootScope.$broadcast('newWinchat', messages.sender);
                },
                'otherloginOntime': function (messages) {
                    $rootScope.$broadcast('otherloginOntime', messages.username);
                },
                "updatesend": function (messages) {
                    var k = false;
                    for (var i = 0; i < Chats.windowsChats.length; i++) {
                        if (Chats.windowsChats[i].Name == messages.sendto) {
                            Chats.windowsChats[i].Conversations.push({ Name: "_Me", content: messages.message });
                            k = true;
                            break;
                        }
                    }
                    if (k == false) {

                        for (var i = 0; i < Chats.UserList.length; i++) {
                            if (Chats.UserList[i].Name == messages.sendto) {
                                var winnew = {};
                                winnew.Name = messages.sendto;
                                winnew.Fileimage = Chats.UserList[i].Fileimage;
                                winnew.FullName = Chats.UserList[i].FullName;
                                winnew.Conversations = [];
                                winnew.Conversations.push({ Name: "_Me", content: messages.message });
                                Chats.windowsChats.push(winnew);
                                break;
                            }

                        }

                    }
                    $rootScope.$apply();
                    $rootScope.$broadcast('newWinchat', messages.sendto);
                }
            },
            methods: ['onConnected'],
            queryParams: {
                'token': accesstoken
            },
            rootPath: "/" + appSettings.serverApp + "signalr",
            errorHandler: function (error) {
                
            },
            hubDisconnected: function () {
                if (hub.connection.lastError) {
                    hub.connection.start();
                }
            },
            transport: 'webSockets',
            logging: true
        });
        Chats.CountNotification = "0";
        Chats.all = [];
        Chats.add = function (userName, chatMessage) {
            Chats.all.push(new Chat({ UserName: userName, ChatMessage: chatMessage }));
        }
        Chats.send = function (userName, chatMessage) {
            hub.invoke("Send", chatMessage , userName )
            .done(function () {
                //console.log ('Invocation of NewContosoChatMessage succeeded');
            }).fail(function (error) {
                //console.log('Invocation of NewContosoChatMessage failed. Error: ' + error);
            });
            //send(userName, chatMessage);
        }

        return Chats;
    }])
    ;
})();
