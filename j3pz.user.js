// ==UserScript==
// @name         j3pz
// @namespace    https://github.com/WingGao/MyUserScript
// @version      0.1
// @description  剑三配置扩容
// @author       WingGao
// @match        https://www.j3pz.com/*
// @grant        GM_xmlhttpRequest
// @connect *
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...
//源代码app.min.js?v=2.630
// a.saveCase Line2205
// a.loadCase L2214
//["$scope", "$rootScope", "$location", "Utils", "toastr", "$http", "$modal", "$window", "$sce", "hotkeys", "$modalStack", function(a, b, c, d, e, f, g, h, i, j, k) {
function init() {
    console.log('j3pz init');
    var eleLoad = document.getElementById('load');
    if (eleLoad == null) return;
    var scope = angular.element(eleLoad).scope();
    var $http = angular.element(eleLoad).injector().get('$http');
    var $rootScope = angular.element(eleLoad).injector().get('$rootScope');
    var toastr = angular.element(eleLoad).injector().get('toastr');
    var utils = angular.element(eleLoad).injector().get('Utils');
    scope.$on("saveCase", function (b) {
        console.log('j3pz on saveCase');
    });
    var loadedInte = setInterval(function () {
        if ($rootScope.saveList.isLoad) {
            clearInterval(loadedInte);
            console.log('loaded');
            //load list
            var eleSaveControler = document.getElementsByClassName('navbar-right');
            var listScope = angular.element(eleSaveControler).scope();
            listScope.init = function () {
                $rootScope.saveList.isLoad || ($rootScope.saveList.list = [],
                    $http.get("https://www.j3pz.com/api/getSaveList.php").success(function (a) {
                        a.err ? toastr.error(a.errReason) : (angular.forEach(a, function (a, b) {
                            var c = {
                                name: a.name,
                                id: a.saveid
                            };
                            this.push(c)
                        }, $rootScope.saveList.list),
                            $rootScope.saveList.isLoad = !0)
                    }));
                //load from my server
                $http.get("https://127.0.0.1:8000/OneScripts/j3pz_list").success(function (res) {
                    angular.forEach(res, function (a, b) {
                        var c = {
                            name: '[' + a.menpai + '] ' + a.name,
                            id: a.saveid
                        };
                        $rootScope.saveList.list.push(c);
                    });
                });
            };
            listScope.init();
            //load case
            var pzscope = scope.$parent.$parent;
            pzscope.loadCase = function(c) {
                var a = pzscope;
                var b = $rootScope;
                var e = toastr;
                var d = utils;
                var g = angular.copy(b.focus);
                console.log(c);
                var url = "https://www.j3pz.com/api/load.php?id=" + c;
                if(c > 1460350731600) {
                    url = "https://127.0.0.1:8000/OneScripts/j3pz_load?id="+c;
                }
                $http.get(url).success(function(c) {
                    var f, h, i, j, k;
                    if (c.err)
                        e.error(c.errReason);
                    else {
                        for (b.attributeStone = [d.transDBStoneToJsObj(c.attributestone[0]), d.transDBStoneToJsObj(c.attributestone[1])],
                                 f = 0; 2 > f; f++)
                            for (h = 0; 4 > h; h++)
                                b.attributeStoneLists[f][h].isSet = 3 == h ? b.attributeStoneLists[f][2].isSet : null  != c.attributestone[f].attr[h].attribute,
                                    b.attributeStoneLists[f][h].setAs = 3 == h ? c.attributestone[f].name : c.attributestone[f].attr[h].attribute,
                                0 == f && a.$broadcast("setAttributeStone", h);
                        for (i = [{
                            name: "成男",
                            body: 33,
                            spunk: 32,
                            spirit: 33,
                            strength: 32,
                            agility: 33
                        }, {
                            name: "成女",
                            body: 33,
                            spunk: 32,
                            spirit: 33,
                            strength: 32,
                            agility: 33
                        }, {
                            name: "萝莉",
                            body: 33,
                            spunk: 32,
                            spirit: 33,
                            strength: 32,
                            agility: 33
                        }, {
                            name: "正太",
                            body: 33,
                            spunk: 32,
                            spirit: 33,
                            strength: 32,
                            agility: 33
                        }],
                                 b.role = i[parseInt(c.tixing)],
                                 a.$broadcast("setTixing", b.role),
                                 f = 0; f < positions.length; f++)
                            for (b.focus = positions[f],
                                     b.equipLists[b.focus].setAs.name = c.equips[b.focus].equip.name,
                                     b.enhanceLists[b.focus].setAs.id = c.equips[b.focus].enhance.P_ID,
                                     a.setEquipByObj(c.equips[b.focus].equip, b.focus),
                                     b.equips[b.focus].xilian.level = c.equips[b.focus].xilian.level,
                                     b.equips[b.focus].xilian.ratio = c.equips[b.focus].xilian.ratio,
                                     j = d.xilian(c.equips[b.focus].xilian.origin, c.equips[b.focus].xilian.target, c.equips[b.focus].xilian.level, c.equips[b.focus].xilian.ratio),
                                     b.equips[b.focus].setStrengthen(c.equips[b.focus].strengthen),
                                     b.equips[b.focus].enhance = {},
                                     angular.forEach(c.equips[b.focus].enhance, function(a, b) {
                                         "0" != a && 0 != a && this.setEnhance(b, a)
                                     }, b.equips[b.focus]),
                                     h = 0; h < b.equips[b.focus].holes.number; h++)
                                d.changeColor(h, c.equips[b.focus].cuilianColour[h]),
                                    d.changeAttr(h, c.equips[b.focus].cuilianAttr[h]),
                                    k = "-1" == c.equips[b.focus].holeIn[h] ? {
                                        img: "-1-6",
                                        level: 6,
                                        type: -1
                                    } : stones[parseInt(c.equips[b.focus].holeLevel[h]) + 1][c.equips[b.focus].holeIn[h]],
                                    d.onDrop(k, h);
                        for (a.navSelect(g),
                                 angular.forEach(b.buffController.activeBuff, function(a, c) {
                                     a.isCheck = !1,
                                         b.buffController.buff[a.index].isCheck = !1
                                 }),
                                 f = 0; f < c.buff.length; f++)
                            "" != c.buff[f] && (b.buffController.activeBuff[c.buff[f]].isCheck = !0,
                                b.buffController.buff[b.buffController.activeBuff[c.buff[f]].index].isCheck = !0);
                        a.$broadcast("initBuff")
                    }
                }).error(function() {
                    e.error("载入方案失败,请重试")
                })
            };

            var oldSaveCaseFunc = scope.saveCase;
            scope.$apply(function () {
                scope.saveCase = function (id, name) {
                    if (id > 1460350731600 || id == 0) {
                        var d = scope.getSaveObj(id, name, 0);
                        $http.post("http://127.0.0.1:8000/OneScripts/j3pz_save", d).success(function (c) {
                            c.err ? toastr.error(c.errReason) : (toastr.success("保存方案成功"),
                            0 == b && scope.$broadcast("saveCase"))
                        }).error(function (a) {
                            toastr.error("保存方案失败，请重试")
                        })
                    } else {
                        oldSaveCaseFunc(id, name)
                    }
                }
            });
        }
    }, 300);
}
//app.controller("PeizhuangCtrl", ["$scope", "$rootScope", "$location", "Utils", "toastr", "$http", "$modal", "$window", "$sce", "hotkeys", "$modalStack", function(a, b, c, d, e, f, g, h, i, j, k) {
//L2000
angular.module("J3pz").factory('wingHttpInterceptor', function ($q) {
    console.log('wingHttpInterceptor');
    return {
        'request': function (config) {
            console.log(config);
            return config;
        }
    };
});

angular.module("J3pz").config(['$httpProvider', function ($httpProvider) {
    console.log('$httpProvider');
    $httpProvider.interceptors.push('wingHttpInterceptor');
}]);


function injecthttp() {
    var $http = angular.element(document.body).injector().get('$http');
    $http.defaults.xsrfHeaderName = "my";
    $http.defaults.headers.common['wingHeaderFn'] = function (config) {
        console.log('url:', config.url);
        return 'www';
    };
    $http.defaults.transformResponse = function (data, header) {
        console.log(data, header);
    };
}
angular.element(document).ready(init);
//angular.element(document).ready(injecthttp);

