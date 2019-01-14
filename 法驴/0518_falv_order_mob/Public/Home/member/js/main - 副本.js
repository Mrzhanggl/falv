/*




*/


//toast 显示时间
$.toast.prototype.defaults.duration = 2000;
var ajax_url = "http://www.falv58.com";
var src_url = "http://www.falv58.com";
if (window.location.host!=="www.falv58.com") {
    ajax_url = "http://mest.falv58.com";
    src_url = "http://mest.falv58.com";
}

var APP = {
    first_page: '/Member/index.html',
    authorization: false,
    jssdk: null,
    isPhoneNo: function(phone) {
        var pattern = /^1[23456789]\d{9}$/;
        return pattern.test(phone);
    },
    isEmail: function(emial) {
        var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        return pattern.test(emial);
    },
    isWeiXin: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    isPass: function(pass) {
        var pattern = /^[0-9a-zA-Z]+$/;
        return pattern.test(pass);
    },
    getParam: function(id) {
        var url = location.href + "";
        var regstr = "/(\\?|\\&)" + id + "=([^\\&]+)/";
        var reg = eval(regstr);
        var result = url.match(reg);
        if (result && result[2]) {
            return result[2];
        }
    },
    send: function(url, data, callback) {
        var _callback = typeof(data) == 'function' ? data : callback;
        var _data = typeof(data) != 'function' ? data : {};
        var _type = _data ? 'post' : 'get';
        var _url = ajax_url + url;
        $.ajax({
            type: _type,
            url: _url,
            data: _data,
            xhrFields: {
                withCredentials: true
            },
            success: function(res) { _callback(res); },
            error: function(XMLHttpRequest, textStatus, errorThrown) { $.hideLoading();console.log(XMLHttpRequest, errorThrown, textStatus) },
        })
    },
    imgToUrl: function(data, callback) {
        $.ajax({
            url: ajax_url + '/Public/imgToUrl.json',
            type: 'POST',
            data: data,
            cache: false,
            contentType: false, //不可缺
            processData: false, //不可缺
            success: function(res) { callback(res); }
        });
    },
    getJssdk: function(callback) {
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
               
                
                if (APP.getParam("reg_from_channel") == '24' || APP.getFromChannel() == '24' || APP.getParam("reg_from_channel") == '26' || APP.getFromChannel() == '26' || APP.getParam("reg_from_channel") == '27' || APP.getFromChannel() == '27' || APP.getParam("reg_from_channel") == '28' || APP.getFromChannel() == '28' || APP.getParam("reg_from_channel") == '29' || APP.getFromChannel() == '29' || APP.getParam("reg_from_channel") == '22') {
                    _this.setGoodsListShare();
                } else {
                    _this.setShare();
                }
                
            }
            _callback();
        });
    },
    setShare: function() {
        var _path_url = "/Member/index.html";
        if (window.location.pathname == '/Member/goodsDetails.html') {
            _path_url = window.location.pathname + window.location.search;
        }

        var _link = window.location.origin + _path_url;
        
        var _configAll = {
            title: '法驴，专业解决法律烦恼！',
            desc: '即刻拥有法律服务私人管家',
            link: _link,
            imgUrl: 'http://www.falv58.com/Public/Home/member/img/slogo.png',
            success: function() {
                //alert('success')
                //console.log("success");
            },
            cancel: function() {
                //alert('cancel');
                //console.log("cancel");
            }
        }
    
        wx.ready(function() {
            //分享给朋友
            //alert('ready')
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
    },
    setGoodsListShare: function() {
        var _tab_channel = APP.getOrderChannel();
        var _reg_channel = '24';
        var _title = '“邮”法可依，专业解决法律烦恼！';
        var _path_url = "/Member/goodsList.html";
        if (_tab_channel == '5') {
            _reg_channel = '26';
            _path_url = "/Member/goodsLb.html";
            _title = '珠“联璧”合，专业解决法律烦恼';
        }
        if (_tab_channel == '6') {
            _reg_channel = '27';
            _path_url = "/Member/goodsSyb.html";
            _title = '收银“法”宝，专业解决您的法律烦恼';
        }
        if (_tab_channel == '7') {
            _reg_channel = '28';
            _path_url = "/Member/goodsSybYh.html";
            _title = '收银“法”宝，专业解决您的法律烦恼';
        }
        if (_tab_channel == '8') {
            _reg_channel = '29';
            _path_url = "/Member/goodsSybTx.html";
            _title = '收银“法”宝，专业解决您的法律烦恼';
        }
        if (window.location.pathname == '/Member/goodsDetails.html') {
            if (APP.getParam("reg_from_channel") && APP.getParam("reg_from_channel") != '22') {
                _path_url = '/Member/index.html?reg_from_channel='+APP.getParam("reg_from_channel");
            } else {
                if (APP.getParam("id") == '100479') {
                    _title = '法驴，专业解决法律烦恼！';
                    _path_url = window.location.pathname + window.location.search;
                } else {
                    _path_url = window.location.pathname + window.location.search+'&reg_from_channel='+_reg_channel;
                }
                
            }
            
        }

        var _link = window.location.origin + _path_url;
        var _configAll = {
            title: _title,
            desc: '即刻拥有法律服务私人管家',
            link: _link,
            imgUrl: 'http://www.falv58.com/Public/Home/member/img/slogo.png',
            success: function() {
                //alert('success')
                //console.log("success");
            },
            cancel: function() {
                //alert('cancel');
                //console.log("cancel");
            }
        }
    
        wx.ready(function() {
            //分享给朋友
            //alert('ready')
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
    },
    getSex: function(type) {
        switch (type) {
            case '0':
                return "男"
                break;
            case '1':
                return "女"
                break;
            case '2':
                return "保密"
                break;
            default: 
                return "保密"
        }
    },
    getText: {
        service_state: {
            ' ': '全部订单',
            '0': '待服务',
            '1': '服务中',
            '2': '服务完成',
            '3': '订单取消',
            '5': '待服务'
        },
        order_type: {
            ' ': '0', //邮政
            '80': '1', //东家会
            '81': '2', //环球黑卡
            '82': '3', //腾讯创服
            '83': '0', //邮政 //5联璧 6通联
            '84': '4',  //短信 
        }
    },
    getTimeText: function() {
        // 05-07为“早上好”
        // 07-12为“上午好”
        // 12-13为“中午好”
        // 13-17为“下午好”
        // 17-04为“晚上好”
        var _hour = new Date().getHours();
        if (_hour >= 5 && _hour < 7) {
            return "早上好";
        } else if (_hour >= 7 && _hour < 12) {
            return "上午好";
        } else if (_hour >= 12 && _hour < 13) {
            return "中午好";
        } else if (_hour >= 13 && _hour < 17) {
            return "下午好";
        } else if (_hour >= 17 && _hour < 5) {
            return "晚上好";
        } else {
            return "晚上好";
        }
    },
    checkHeadPic: function(url) {
        if (url === 'images/pic.jpg' || url === '') {
            return 'http://www.7anb.com/Public/Home/Mob/img/default-headpic.png';
        } else {
            return url;
        }
    },
    logout: function(callback) {
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
    getWxUrl: function() {
        //不用自动授权
        var _data = [
            '/Member/goodsList.html',
            '/Member/goodsLb.html',
            '/Member/goodsSyb.html',
            '/Member/goodsSybTx.html',
            '/Member/goodsSybYh.html',
            '/Member/goodsDetails.html',
            '/Member/orderAddChannel.html',
        ]
        var _loca_url = window.location.pathname;
        for (var i=0,len=_data.length; i<len; i++) {
            if (_loca_url == _data[i]) {
                return true;
            }
        }
        return false;
    },
    getLogUrl: function() {
        //不用登录
        var _data = [
            '/Member/login.html',
            '/Member/goodsList.html',
            '/Member/goodsLb.html',
            '/Member/goodsSyb.html',
            '/Member/goodsSybTx.html',
            '/Member/goodsSybYh.html',
            '/Member/goodsDetails.html',
            '/Member/orderAddChannel.html',
        ]
        var _loca_url = window.location.pathname;
        for (var i=0,len=_data.length; i<len; i++) {
            if (_loca_url == _data[i]) {
                return true;
            }
        }
        return false;
    },
    init: function(callback, url) {
        var _this = this;
        var _url = url ? url : window.location.href;
        var _callback = callback ? callback : function(){};
        //微信授权
        _this.send("/PC/Wx/getOpenid.json?source=1", function(res) {
            if (res.errno != '0') {
                window.location.href = ajax_url+'/PC/Wx/authorizedForFaLv.json?type=snsapi_userinfo&url='+encodeURIComponent(_url);
            } else {
                _this.authorization = true;
                _callback();
            }
        });
    },
    getInfo: function(vm, callback) {
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
    initInfo: function(vm, callback) {
        var _this = this;
        var _vm = vm;
        var _callback = callback ? callback : function() {};
         _this.send("/PC/User/userInfo.json", function(res) {
            // alert(JSON.stringify(res))
            //alert(JSON.stringify(res))
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
                //首页 启动页
                if (window.location.pathname == _this.first_page) {
                    if (sessionStorage.getItem("loading") == 'true') {
                        _vm.page.show = 'home';
                    } else {
                        _vm.page.show = 'loading';
                        sessionStorage.setItem("loading", "true");
                        _vm.page.loading = 1;
                        setTimeout(function() {
                            _vm.page.loading = 2;
                        }, 500)
                        setTimeout(function() {
                            _vm.page.loading = 3;
                        }, 1000)
                        setTimeout(function() {
                            _vm.page.loading = 4;
                        }, 1600)
                        setTimeout(function() {
                            _vm.page.loading = 5;
                            _vm.page.show = 'home'; 
                            setInterval(function() {
                                if (_vm.page.loading_p >=4 ) {
                                    return;
                                }
                                _vm.page.loading_p++;
                            }, 500)
                        }, 2200)
                        setTimeout(function() {
                            //2900
                            _vm.page.loading = 6;
                        }, 5100)
                        setTimeout(function() {
                            //3400
                            _vm.page.loading = 0;
                        }, 5600)

                        // setTimeout(function() {
                        //     _vm.page.show = 'home';
                        //     _vm.page.loading = '2';
                        //     setTimeout(function() {
                        //         _vm.page.loading = '0';
                        //     },1000)
                        // }, 2000)
                    }
                }

            } else {
                //首页 启动页
                if (window.location.pathname == _this.first_page) {
                    _vm.page.show = 'loading';
                    sessionStorage.setItem("loading", "true");
                    _vm.page.loading = 1;
                    setTimeout(function() {
                        _vm.page.loading = 2;
                    }, 500)
                    setTimeout(function() {
                        _vm.page.loading = 3;
                    }, 1000)
                    setTimeout(function() {
                        _vm.page.loading = 4;
                    }, 1600)
                    setTimeout(function() {
                        _vm.page.loading = 5;
                        setInterval(function() {
                            if (_vm.page.loading_p >=4 ) {
                                return;
                            }
                            _vm.page.loading_p++;
                        }, 500)
                    }, 2200)
                    setTimeout(function() {
                        //2900
                        _this.WXLogin(_vm);
                    }, 5100)

                } else if (!_this.getWxUrl()) {
                    //alert(APP.getParam("from"))
                    _this.WXLogin(_vm);
                }
                
                //window.location.href = '/Member/login.html?from='+encodeURIComponent(window.location.href);
            }
            _callback(res);
        });



    },
    showActionKf: function(source) {
        var _loca_url = window.location.pathname;
        if (_loca_url == '/Member/goodsDetails.html') {
            if (source && source == 'goodsDetails_top') {
                APP.sendHm("click", "product-ask");
            } else {
                APP.sendHm("click", "product-tell");
            }
        } else if (_loca_url == '/Member/personal.html') {
            APP.sendHm("click", "userCenter-servicer");
        } else if (_loca_url == '/Member/orderList.html') {
            APP.sendHm("click", "orderCenter-servicer");
        } else if (_loca_url == '/Member/orderDetails.html') {
            APP.sendHm("click", "order-servicer");
        }
        $.actions({
            actions: [
                {
                    text: "<a class='s-actionsheet-tel' href='tel:4000183693'><span class='s-actionsheet-kf-span2'>电话咨询（4000183693）</span></a>",
                    onClick: function() {
                        //console.log(233)
                        APP.sendHm("click", "servicer-tell");
                    }
                },
                {
                    text: "<span class='s-actionsheet-kf-span'>在线咨询</span>",
                    onClick: function() {
                        APP.sendHm("click", "servicer-online", function() {
                            APP.sendKf();
                        });
                    }
                }
            ]
        });
    },
    sendKf: function() {
        window.location.href = 'https://www.sobot.com/chat/h5/index.html?sysNum=72ff77ec0e1646f6945ff0aa05fbbe53'; 
    }
}

// APP.init();

APP.setOrderChannel = function(type) {
    var _channel = type ? type : '';
    sessionStorage.setItem("order_from_channel", _channel);
}
APP.getOrderChannel = function() {
    var _channel = sessionStorage.getItem("order_from_channel") ? sessionStorage.getItem("order_from_channel") : '';
    return _channel;
}

APP.setFromChannel = function(type) {
    var _channel = type ? type : '15';
    sessionStorage.setItem("reg_from_channel", _channel);
}

APP.getFromChannel = function() {
    var _channel = sessionStorage.getItem("reg_from_channel") ? sessionStorage.getItem("reg_from_channel") : '15';
    return _channel;
}


APP.setParamChannel = function() {
    var _p = APP.getParam("fromchannel");
    if (_p) {
        sessionStorage.setItem("url_from_channel", _p);
    }
}
APP.getParamChannel = function() {
    return sessionStorage.getItem("url_from_channel") ? sessionStorage.getItem("url_from_channel") : '';
}
//保存 获取的链接来源
APP.setParamChannel();

/* 
    init 注册渠道
*/
APP.initChannel = function() {
    if (APP.getParam("reg_from_channel")=='24') {
        APP.setFromChannel('24')
        APP.setOrderChannel('0')
    } else if (APP.getParam("reg_from_channel")=='22') {
        APP.setFromChannel('22')
        APP.setOrderChannel('1')
    } else if (APP.getParam("reg_from_channel")=='26') {
        APP.setFromChannel('26')
        APP.setOrderChannel('5')
    } else if (APP.getParam("reg_from_channel")=='27') {
        APP.setFromChannel('27')
        APP.setOrderChannel('6')
    } else if (APP.getParam("reg_from_channel")=='28') {
        APP.setFromChannel('28')
        APP.setOrderChannel('7')
    } else if (APP.getParam("reg_from_channel")=='29') {
        APP.setFromChannel('29')
        APP.setOrderChannel('8')
    } else if (APP.getParam("reg_from_channel")=='15') {
        APP.setFromChannel('15')
        APP.setOrderChannel('14')
    }
}
APP.initChannel();


/*
    hm
*/
APP.sendHm = function(action, object, callback) {
    var _fromchannel = APP.getParam("fromchannel") ? APP.getParam("fromchannel") : 'falvvip';
    var _channel = APP.getOrderChannel();

    //本地着陆页
    if (_channel == '0') {
        _fromchannel = "youzheng";
    } else if (_channel == '5') {
        _fromchannel = "lianbi";
    } else if (_channel == '6') {
        _fromchannel = "shouyinbao";
    } else if (_channel == '7') {
        _fromchannel = "shouyinbaoyh";
    } else if (_channel == '8') {
        _fromchannel = "shouyinbaotx";
    }

    //快捷链接 falvvip法驴会员H5 falvfuwu法驴会员服务号
    if (!_channel && APP.getParamChannel()) {
        _fromchannel = APP.getParamChannel();
    }
    
    
    var _json = {
        action: action,
        object: object,
        fromchannel: _fromchannel
    }
    var _callback = callback ? callback : function() {};
    APP.send("/PC/User/visit.json", _json, function() {
        _callback();
    })
}
APP.sendHm("visits");



/*
    短信营销特链
*/
APP.sendMessageHm = function() {
    var _user_marketing_id = APP.getParam("user_marketing_id") ? APP.getParam("user_marketing_id") : '';
    if (_user_marketing_id) {
        APP.send("/PC/User/userOpenMarketingUrl.json?user_marketing_id="+_user_marketing_id, function() {})
    }
}






/*
    微信自动登陆
*/
APP.WXLogin =  function(vm, url) {
    var _this = this;
    var _vm = vm;
    var _url = url ? url : '/Member/index.html';

    var _from_url = '/Member/login.html?from='+encodeURIComponent(_url);
    // if (window.location.pathname !=='/Member/login.html' && window.location.pathname !=='/member/login.html') {
    //     getOpenid();
    // }
    var _return_url = decodeURIComponent(APP.getParam("from"));
    // alert(_return_url)
    // return;
    if (_return_url == '/Member/goodsList.html' || _return_url == '/Member/goodsLb.html' || _return_url == '/Member/goodsSyb.html' || _return_url == '/Member/goodsSybYh.html' || _return_url == '/Member/goodsSybTx.html') {
        _url = _return_url;
    }

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
                     window.location.href = '/Member/index.html';
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
    modal 弹框
*/
APP.modal = {
    top: 0,
    showLayer: function(obj){
        this.top = $(document).scrollTop();
        //弹框

        // <div class="b1-dialog__td clearfix"><a onclick="APP.modal.hideLayer();" class="b1-dialog__close" href="javascript:;"></a></div>\
        // <div class="b1-dialog__hd"><span class="b1-dialog__title">提示</span></div>\
        $(".weui-mask,.b1-dialog").remove();
        var _html = '<div class="weui-mask"></div>\
            <div class="b1-dialog b1-dialog_center JS_dialog" style="display: none;">\
                <div class="b1-dialog__bd JS_dialog_bd"></div>\
                <div class="b1-dialog__ft JS_dialog_ft clearfix">\
                    <div class="b1-dialog__btn JS_dialog_cancel default">取消</div>\
                    <div class="b1-dialog__btn JS_dialog_commit primary">确定</div>\
                </div>\
                <a onclick="APP.modal.hideLayer();" href="javascript:;" class="b1-dialog-close"><i class="iconfont icon-round_close_light"></i></a>\
            </div>';
        $("body").addClass('lock');
        $("#app").append(_html);
        var _layerBg = $(".weui-mask"),
            _layer = $(".JS_dialog"),
            _cansel = $(".JS_dialog_cancel"),
            _commit = $(".JS_dialog_commit"),
            _dialog_bd = $(".JS_dialog_bd"),
            _dialog_ft = $(".JS_dialog_ft");
        setTimeout(function() {
            $(_layer).addClass("b1-dialog--visible");
        },10)
        if(obj.title){
            _layer.find(".b1-dialog__title").html(obj.title);
        } else {
            //_layer.find(".b1-dialog__hd").remove();
        }
        if(obj.text){
            _layer.find(".b1-dialog__bd").html(obj.text);
        }
        //weui-mask--visible
        _layer.css({"display":"block"});
        _layerBg.addClass("weui-mask--visible");

        if(obj.btn) {
            if (obj.btn[0]) {
                _commit.css("display","inline-block");
                _commit.html(obj.btn[0]);
            }
            if (obj.btn[1]) {
                _cansel.css("display","inline-block");
                _cansel.html(obj.btn[1]);
            }
        }
        if (obj.onOK) {
            _commit.on("click",function(){
                obj.onOK();              
            })
        }
        if (obj.onCancal) {
            _cansel.on("click",function(){    
                obj.onCancal();              
            })
        };
        if (obj.btnHide) {
            $(_dialog_ft).html("");
            $(_dialog_bd).addClass("b1-dialog__bdTips");
        }
        
        //禁止ios 蒙版底层滚动
        document.querySelector('.weui-mask').addEventListener('touchstart', function(e) {
            e.preventDefault()
        }, false)
    },
    hideLayer: function() {
        //释放绑定
        //document.querySelector('.weui-mask').removeEventListener('touchstart');
        //关闭弹框
        var timer=null;
        $("body").removeClass('lock');
        //$(".b6-dialog").removeClass('weui-mask--visible').addClass("hideAlert");
        $(".JS_dialog").removeClass("b1-dialog--visible");
        timer = setTimeout(function(){
            clearTimeout(timer);
            $(".weui-mask").remove();
            $(".b1-dialog").remove();
        },200);
        
        $(document).scrollTop(this.top);
    },
}








/*
    阻止移动端窗体滚动
*/
$.smartScroll = function(container, selectorScrollable) {
    // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
    if (!selectorScrollable || container.data('isBindScroll')) {
        return;
    }

    // 是否是搓浏览器
    // 自己在这里添加判断和筛选
    var isSBBrowser;

    var data = {
        posY: 0,
        maxscroll: 0
    };

    // 事件处理
    container.on({
        touchstart: function (event) {
            var events = event.touches[0] || event;
            
            // 先求得是不是滚动元素或者滚动元素的子元素
            var elTarget = $(event.target);
            
            if (!elTarget.length) {
                return;    
            }
            
            var elScroll;
            
            // 获取标记的滚动元素，自身或子元素皆可
            if (elTarget.is(selectorScrollable)) {
                elScroll = elTarget;
            } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
                elScroll = null;
            }
            
            if (!elScroll) {
                return;
            }
            
            // 当前滚动元素标记
            data.elScroll = elScroll;
            
            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = elScroll.scrollTop();
            // 是否可以滚动
            data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
        },
        touchmove: function () {
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0 || isSBBrowser) {
                // 禁止滚动
                event.preventDefault();
            }
            // 滚动元素
            var elScroll = data.elScroll;
            // 当前的滚动高度
            var scrollTop = elScroll.scrollTop();
    
            // 现在移动的垂直位置，用来判断是往上移动还是往下
            var events = event.touches[0] || event;
            // 移动距离
            var distanceY = events.pageY - data.posY;
    
            if (isSBBrowser) {
                elScroll.scrollTop(data.scrollY - distanceY);
                elScroll.trigger('scroll');
                return;
            }
    
            // 上下边缘检测
            if (distanceY > 0 && scrollTop == 0) {
                // 往上滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }
    
            // 下边缘检测
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
                // 往下滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }
        },
        touchend: function () {
            data.maxscroll = 0;
        }    
    });

    // 防止多次重复绑定
    container.data('isBindScroll', true);
};
