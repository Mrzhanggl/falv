/*




*/
APP.getJssdk = function(callback) {
    var _this = this;
    var _callback = callback ? callback : function(){};
    APP.send('/PC/Wx/jssdkConf.json?source=2', function(res) {
        //alert(JSON.stringify(res));
        var data = res.data;
        _this.jssdk = data;
        if (res.errno == '0') {
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'chooseWXPay',
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    'onMenuShareWeibo',
                    'onMenuShareQQ',
                    'onMenuShareQZone',
                    'getNetworkType'
                ]
            });
            
            if (window.location.pathname != '/Member/liveDetails.html' && window.location.pathname != '/Member/liveLecturerDetails.html') {
                _this.setShare();
            }
            
        }
        _callback();
    });
},
APP.setShare =  function(config) {
    var _path_url = "/Member/liveIndex.html";
    // if (window.location.pathname == '/Member/liveDetails.html') {
    //     _path_url = '/Member/liveDetails.html'
    // }
    var _link = window.location.origin + _path_url;
    var _configAll = {
        title: '法驴Live 为您赋能法律知识',
        desc: '人人必备的律师大咖干货：婚姻家事、房屋产权、投资理财、刑事案件、消费侵权……',
        link: _link,
        imgUrl: 'http://www.falv58.com/Public/Home/member/img/slogo.png',
        success: function() {},
        cancel: function() {}
    }

    _configAll = config ? config : _configAll;
    wx.ready(function() {
        //分享给朋友
        wx.onMenuShareAppMessage(_configAll);
        //QQ
        wx.onMenuShareQQ(_configAll);
        //QQ微博
        wx.onMenuShareWeibo(_configAll);
        //QQ空间
        wx.onMenuShareQZone(_configAll);
        //分享到朋友圈
        wx.onMenuShareTimeline(_configAll);
    });
},

APP.logout = function(callback) {
    var _this = this;
    var _callback = callback ? callback : function() {};
    $.showLoading('数据提交中');
    APP.send('/PC/User/logout.json?type=1', function(res) {
        $.hideLoading();
        if (res.errno == '0') { 
            window.location.href = '/Member/index.html';
        }
        _callback(res);
    });
},
APP.getWxUrl = function() {
    //不用自动授权登录
    var _data = [
        '/Member/liveIndex.html',
        '/Member/liveSearch.html',
        '/Member/liveList.html',
        '/Member/liveDetails.html'
    ]
    var _loca_url = window.location.pathname;
    for (var i=0,len=_data.length; i<len; i++) {
        if (_loca_url == _data[i]) {
            return true;
        }
    }
    return false;
},
// APP.getLogUrl = function() {
//     //不用登录
//     var _data = [
//         '/Member/liveIndex.html',
//         '/Member/liveSearch.html',
//         '/Member/liveList.html',
//         '/Member/liveDetails.html'
//     ];
//     var _loca_url = window.location.pathname;
//     for (var i=0,len=_data.length; i<len; i++) {
//         if (_loca_url == _data[i]) {
//             return true;
//         }
//     }
//     return false;
// },
APP.init = function(callback, url) {
    var _this = this;
    var _url = url ? url : window.location.href;
    var _callback = callback ? callback : function(){};
    //微信授权
    _this.send("/PC/Wx/getOpenid.json?source=1", function(res) {
        if (res.errno != '0') {
            if (APP.getOrderChannel() == '11') {
                _this.authorization = true;
                _callback();
            } else {
                window.location.href = ajax_url+'/PC/Wx/authorizedForFaLv.json?type=snsapi_userinfo&url='+encodeURIComponent(_url);
            }
    } else {
            _this.authorization = true;
            _callback();
        }
    });
},
APP.getInfo = function(vm, callback) {
    var _this = this;
    if (window.location.pathname != _this.first_page) {
        sessionStorage.setItem("loading", "true");
    }
    if (_this.authorization || _this.getWxUrl()) {
        _this.initInfo(vm, callback);
    } else {
        _this.init(function() {
            _this.initInfo(vm, callback);
        });
    }
    _this.getJssdk();
},
APP.initInfo = function(vm, callback) {
    var _this = this;
    var _vm = vm;
    var _callback = callback ? callback : function() {};
        _this.send("/PC/User/userInfo.json", function(res) {
        // alert(JSON.stringify(res))
        if (res.errno == '0') {
            _vm.info_login = true;
            _this.send('/PC/Wx/getOpenid.json?source=1', function(res2) {
                //alert(JSON.stringify(res2.data))
                if (res2.errno == '0') {
                    res.data.wechat_headimgurl = res2.data.headimgurl;
                    res.data.wechat_nickname = res2.data.nickname;
                    _vm.info = res.data;
                }
            })
            // _vm.page.show = 'home';

        } else {
            if (!_this.getWxUrl()) {
                //alert(APP.getParam("from"))
                _this.WXLogin(_vm);
            } else {
                _vm.page.show = 'home';
            }
            
            //window.location.href = '/Member/login.html?from='+encodeURIComponent(window.location.href);
        }
        _callback(res);
    });



},





/*
    视频分类icon
*/
APP.getLiveClassIcon = {
    "0" : '/Public/Home/Live/img/n1@2x.png',
    "4" : '/Public/Home/Live/img/n2@2x.png',
    "1" : '/Public/Home/Live/img/n3@2x.png',
    "2" : '/Public/Home/Live/img/n4@2x.png',
    "3" : '/Public/Home/Live/img/n5@2x.png'
}



/*
    微信自动登陆
*/
APP.WXLogin =  function(vm, url) {
    var _this = this;
    var _vm = vm;
    var _url = url ? url : window.location.pathname+window.location.search;
    //'/Member/liveIndex.html'

    var _from_url = '/Member/login.html?from='+encodeURIComponent(_url);
    // if (window.location.pathname !=='/Member/login.html' && window.location.pathname !=='/member/login.html') {
    //     getOpenid();
    // }
    //var _return_url = APP.getParam("from") ? decodeURIComponent(APP.getParam("from")) : _url;
    // alert(_return_url)
    // return;
     //_url = _return_url;
    

    getOpenid();

    function getOpenid() {
        _this.send('/PC/Wx/getOpenid.json?source=1', function(res) {
            if (res.errno == '0') {
                var _data = res.data;
                //微信无绑定信息
                if (_data && _data.length == 0) {
                   //无绑定账号 跳转绑定
                    //_vm.page.show = 'login';
                    if (window.location.pathname != '/Member/login.html') {
                        window.location.href = _from_url;
                    } else {
                        vm.page.show = 'login';
                    }
                   
                } else {
                    //有 登陆
                    //alert(JSON.stringify(_data))
                    bindLogin(vm, _url);
                }
            }  else if (res.errno == '-4' || res.errno == -4 ){
                //_vm.page.show = 'login';
                window.location.href = _from_url;
            } else {
                //$.toast(res.msg, 'text');
                //window.location.href = _from_url;
            }
        });
    };
    function bindLogin(vm, url) {
        var _vm = vm;
        var _json = {
            phone: '',
            password: '',
            code: '',
            type: 3
        }
        _this.send('/PC/UserLogin/login.json', _json, function(res) {
            //alert(JSON.stringify(res))
            if (res.errno == '0') {
                //登录成功
                var _data = res.data;
                // APP.initInfo(_vm, function() {
                //     alert(23)
                // });
                //alert(url)
                if (url) {
                     window.location.href = url;
                } else {
                     window.location.href = '/Member/liveIndex.html';
                }
               
                //window.location.reload();
                // APP.send('/PC/User/userInfo.json', function(res) {
                //     if (res.errno == '0') {
                //         window.location.reload();
                //     }   
                // });
                
            } else if (res.errno == '-4' || res.errno == -4 ){
                _vm.page.show = 'login';
                //window.location.href = _from_url;
            } else {
                //console.log(3233)
                $.toast(res.msg, 'text');
            }
        });
    };
};



/*
    fastclick
*/
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

