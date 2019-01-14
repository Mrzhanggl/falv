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
                    'onMenuShareQZone'
                ]
            });
                   
            _this.setShare();

            
        }
        _callback();
    });
};
APP.setShare =  function(config) {
    var _path_url = "/h5/lawyerreg/jLawyerMatching.html";
    // if (window.location.pathname == '/Member/liveDetails.html') {
    //     _path_url = '/Member/liveDetails.html'
    // }
    var _link = window.location.origin + _path_url;
    var _configAll = {
        title: '法驴，专业解决法律烦恼！',
        desc: '即刻拥有法律服务私人管家',
        link: _link,
        imgUrl: 'http://www.falv58.com/Public/Home/member/img/slogo.png',
        success: function() {},
        cancel: function() {}
    }

    _configAll = config ? config : _configAll;
    wx.ready(function() {
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: _configAll.title,
            desc: _configAll.desc,
            link: _configAll.link,
            imgUrl: _configAll.imgUrl,
            success: function() {
                    APP.sendHm("click", "onMenuShareAppMessage");
            },
        });
        //QQ
        wx.onMenuShareQQ(_configAll);
        //QQ微博
        wx.onMenuShareWeibo(_configAll);
        //QQ空间
        wx.onMenuShareQZone(_configAll);
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: _configAll.title,
            desc: _configAll.desc,
            link: _configAll.link,
            imgUrl: _configAll.imgUrl,
            success: function() {
                    APP.sendHm("click", "onMenuShareTimeline");
            },
        });
    });
};
APP.logout = function(callback) {
    var _this = this;
    var _callback = callback ? callback : function() {};
    $.showLoading('数据提交中');
    APP.send('/PC/User/logout.json?type=1', function(res) {
        $.hideLoading();
        if (res.errno == '0') { 
            window.location.href = '/h5/lawyerreg/quick_supplier.html';
        }
        _callback(res);
    });
};
APP.getWxUrl = function() {
    //不用自动授权登录
    var _data = [
       
    ]
    var _loca_url = window.location.pathname;
    for (var i=0,len=_data.length; i<len; i++) {
        if (_loca_url == _data[i]) {
            return true;
        }
    }
    return false;
};
APP.init = function(callback, url) {
    var _this = this;
    var _url = url ? url : window.location.href;
    var _callback = callback ? callback : function(){};
    _callback();
    //微信授权
    // _this.send("/PC/Wx/getOpenid.json?source=1", function(res) {
    //     if (res.errno != '0') {
    //         window.location.href = ajax_url+'/PC/Wx/authorizedForFaLv.json?type=snsapi_userinfo&url='+encodeURIComponent(_url);
    //     } else {
    //         _this.authorization = true;
    //         _callback();
    //     }
    // });
};
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
};
APP.initInfo = function(vm, callback) {
    var _this = this;
    var _vm = vm;
    var _callback = callback ? callback : function() {};
        _this.send("/PC/User/userInfo.json?source=1", function(res) {
        // alert(JSON.stringify(res))
        //alert(JSON.stringify(res))
        console.log(res)
        if (res.errno == '0') {
            _vm.info_login = true;
            _this.getLawyerInfo(_vm,_callback);
            _this.send('/PC/Wx/getOpenid.json?source=1', function(res2) {
                //alert(JSON.stringify(res2.data))
                if (res2.errno == '0') {
                    res.data.wechat_headimgurl = res2.data.headimgurl;
                    res.data.wechat_nickname = res2.data.nickname;
                    res.data['wechat_city'] = res2.data.city;
                    res.data['wechat_sex'] = res2.data.sex;
                    // _vm.info = res.data;
                }
            })

        } else {
            if (!_this.getWxUrl()) {
                if (window.location.pathname !== '/h5/lawyerreg/jLawyerLogin.html') {
                    window.location.href = '/h5/lawyerreg/jLawyerLogin.html?from='+encodeURIComponent(window.location.pathname+window.location.search);
                }
            } else {
                // _vm.page.show = 'home';
            }
            
            //window.location.href = '/Member/login.html?from='+encodeURIComponent(window.location.href);
            _callback(res);
        }
        
    });

};

APP.getLawyerInfo= function(vm, callback) {
    var _this = vm;
    var _callback = callback ? callback : function() {};
    APP.send('/V2/Lawyer/showLawyer.json', function(res) {
        //console.log(res)
        if (res.errno == '0' || res.errno == '404') {
            var _data = res.data;
            _this.info = _data;
            _this.info_login = true;
            //审核状态
            if (_data && _data.length == 0) {
                //个人用户
                // nextApproval();
            } else if (_data.is_approval== '0'){
                //审核中
                // nextApproval();
            } else if (_data.is_approval == '1' && parseFloat(_data.cash_pledge) > 0) {
                //通过
                
            } else if (_data.is_approval == '1' && parseFloat(_data.cash_pledge) <= 0) {
                //通过 未交押金
                // nextApproval()
            } else if (_data.is_approval == '2') {
                //不通过
                // nextApproval();
            }
        }
        _callback(res);
    });


    function nextApproval() {
        APP.send('/PC/User/logout.json?type=1', function(res) {
            if (res.errno == '0') { 
                window.location.href = '/h5/lawyerreg/jLawyerLogin.html';
            }
        });
    }
}






/*
    hm
*/
APP.sendHm = function(action, object, chinese_object, chinese_url, parameter, callback) {
    var _fromchannel = APP.getParam("fromchannel") ? APP.getParam("fromchannel") : 'falvvip';
    var _channel = sessionStorage.getItem("order_from_channel");

    if (_channel == '0') {
        _fromchannel = "youzheng";
        //邮储
    } else if (_channel == '5') {
        _fromchannel = "lianbi";
    } else if (_channel == '6') {
        _fromchannel = "shouyinbao";
        //收银宝特惠
    } else if (_channel == '7') {
        _fromchannel = "shouyinbaoyh";
        //收银宝优惠
    } else if (_channel == '8') {
        _fromchannel = "shouyinbaotx";
        //收银宝特选
    }


    //快捷链接 falvvip法驴会员H5 falvfuwu法驴会员服务号
    if (!_channel && APP.getParamChannel()) {
        _fromchannel = APP.getParamChannel();
    }
    

    var _json = {
        action: action,
        object: object,
        chinese_object: chinese_object,
        chinese_url: chinese_url,
        parameter: parameter,
        fromchannel: _fromchannel
    }
    var _callback = callback ? callback : function() {};
    APP.send("/PC/User/visit.json", _json, function() {
        _callback();
    })
}