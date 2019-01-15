/*




*/
APP.first_page = '/Member/index.html';


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
            
            var _shareChaannel = {
                "24": true,
                "26": true,
                "27": true,
                "28": true,
                "22": true,
                "36": true,
                "37": true
            }

            console.log(APP.getFromChannel())
            var _fromChannel = APP.getFromChannel();
            if (_fromChannel && _shareChaannel[_fromChannel]) {
                //console.log("APP.getFromChannel()")
                _this.setGoodsListShare();
            } else {
                _this.setShare();
            }
            
        }
        _callback();
    });


};
APP.setShare = function() {
    console.log("不可能")
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
                APP.sendHm({
                    action: "click", 
                    object: "onMenuShareAppMessage"
                });
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
                APP.sendHm({
                    action: "click", 
                    object: "onMenuShareTimeline"
                });
            },
        });
    });
};

APP.setGoodsListShare = function() {
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
    if (_tab_channel == '13') {
        _reg_channel = '36';
        _path_url = "/Member/goodsHx.html";
        _title = '法驴，专业解决法律烦恼！';
    }
    if(_tab_channel == '14'){
         _reg_channel = '37';
         _title = '法驴，专业解决法律烦恼！';
        if(window.location.pathname == '/Member/orderAddChannel.html'){
             _reg_channel = '37';
            _path_url = '/Member/goodsDetails.html' + window.location.search+'&reg_from_channel='+_reg_channel;
            _title = '法驴，专业解决法律烦恼！';
            console.log(_path_url)
        }
        // if(window.location.pathname == '/Member/goodsDetails.html'){
        //      _reg_channel = '37';
        //     _path_url = '/newVip/newmIndex.html';
        //     _title = '法驴，专业解决法律烦恼！';
        //     console.log("ajk14产品详情")
        // }
        

    }
    
    if (window.location.pathname == '/Member/goodsDetails.html') {

        if (APP.getParam("reg_from_channel") && APP.getParam("reg_from_channel") != '22') {
            _path_url = '/Member/index.html?reg_from_channel='+APP.getParam("reg_from_channel");

        } else {
            if (APP.getParam("id") == '100479') {
                _title = '法驴，专业解决法律烦恼！';
                _path_url = window.location.pathname + window.location.search;
            } else {
                console.log("正确")

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
                APP.sendHm({
                    action: "click", 
                    object: "onMenuShareAppMessage"
                });
                
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
                APP.sendHm({
                    action: "click", 
                    object: "onMenuShareTimeline"
                });

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
            window.location.href = '/Member/index.html';
        }
        _callback(res);
    });
};
APP.getWxUrl = function() {
    //不用自动授权
    var _data = [
        '/Member/goodsYqb.html',
        '/Member/goodsDd.html',
        '/Member/goodsList.html',
        '/Member/goodsLb.html',
        '/Member/goodsSyb.html',
        '/Member/goodsSybTx.html',
        '/Member/goodsSybYh.html',
        '/Member/goodsDetails.html',
        '/Member/orderAddChannel.html',
        '/Member/goodsHx.html',
        '/Member/goodsCommon.html',
        '/Member/goodsBRC.html',
    ]
    var _loca_url = window.location.pathname;
    for (var i=0,len=_data.length; i<len; i++) {
        if (_loca_url == _data[i]) {
            return true;
        }
    }
    
    return false;
};
// APP.getLogUrl = function() {
//     //不用登录
//     var _data = [
//         '/Member/login.html',
//         '/Member/goodsList.html',
//         '/Member/goodsLb.html',
//         '/Member/goodsSyb.html',
//         '/Member/goodsSybTx.html',
//         '/Member/goodsSybYh.html',
//         '/Member/goodsDetails.html',
//         '/Member/orderAddChannel.html',
//     ]
//     var _loca_url = window.location.pathname;
//     for (var i=0,len=_data.length; i<len; i++) {
//         if (_loca_url == _data[i]) {
//             return true;
//         }
//     }
//     return false;
// };
APP.init = function(callback, url) {
    var _this = this;
    var _url = url ? url : window.location.href;
    var _callback = callback ? callback : function(){};
    //微信授权
    _this.send("/PC/Wx/getOpenid.json?source=1", function(res) {
        if (res.errno != '0') {
            //钉钉 壹钱包
            if (APP.getOrderChannel() == '11' || APP.getOrderChannel() == '12' ||  APP.getOrderChannel() == '16'||  APP.getOrderChannel() == '23'||  APP.getOrderChannel() == '25') {
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
};
APP.getInfo = function(vm, callback) {
    var _this = this;
    if (window.location.pathname != _this.first_page) {
        sessionStorage.setItem("loading", "true");
    }
    if (_this.authorization || _this.getWxUrl()) {
        _this.initInfo(vm, callback);
        // console.log(callback)
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
    var _callback = callback ? callback : function(){};
    
    _this.send("/PC/User/userInfo.json", function(res) {
        // alert(JSON.stringify(res))
        //alert(JSON.stringify(res))
        if (res.errno == '0') {
            _vm.info = res.data;
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
};
APP.showActionKf = function(source) {
    var _loca_url = window.location.pathname;
    if (_loca_url == '/Member/goodsDetails.html') {
        if (source && source == 'goodsDetails_top') {
            APP.sendHm({
                action: "click", 
                object: "product-ask",
                chinese_object: "立即咨询"
            });
        } else {
            APP.sendHm({
                action: "click", 
                object: "product-tell",
                chinese_object: "联系客服"
            });
        }
    } else if (_loca_url == '/Member/personal.html') {
        APP.sendHm({
            action: "click", 
            object: "userCenter-servicer"
        });
    } else if (_loca_url == '/Member/orderList.html') {
        APP.sendHm({
            action: "click", 
            object: "orderCenter-servicer"
        });
    } else if (_loca_url == '/Member/orderDetails.html') {
        APP.sendHm({
            action: "click", 
            object: "order-servicer"
        });
    }

    var _actions = [
        {
            text: "<a class='s-actionsheet-tel' href='tel:4000183693'><span class='s-actionsheet-kf-span2'>电话咨询（4000183693）</span></a>",
            onClick: function() {
                //console.log(233)
                APP.sendHm({
                    action: "click", 
                    object: "servicer-tell",
                });
            }
        },
        // {
        //     text: "<span class='s-actionsheet-kf-span'>在线咨询</span>",
        //     onClick: function() {
        //         APP.sendHm({
        //             action: "click", 
        //             object: "servicer-online",
        //         }, function() {
        //             APP.sendKf();
        //         });
        //         // APP.sendHm("click", "servicer-online", function() {
        //         //     APP.sendKf();
        //         // });
        //     }
        // }
    ]


    //钉钉渠道
    // if (APP.getOrderChannel() == "11") {
    //     _actions.splice(1, 1)
    // }

    $.actions({
        actions: _actions
    });
};





//old
// if (APP.getOrderChannel() != '11') {
//     APP.sendHm({action: "visits"});
// }




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
    //默认法驴首页
    var _url = url ? url : '/Member/index.html';


    //登录返回原页面
    var _orther_url = {
        "/Member/orderAdd.html": true,
    }
    if (_orther_url[window.location.pathname]) {
        _url = window.location.pathname + window.location.search;
    }

    //登录页调起自动登录时判断是否来源着陆页 old
    var _return_url = decodeURIComponent(APP.getParam("from"));
    var _index_url = {
        "/Member/goodsList.html": true,
        "/Member/goodsLb.html": true,
        "/Member/goodsSyb.html": true,
        "/Member/goodsSybYh.html": true,
        "/Member/goodsSybTx.html": true,
        "/Member/goodsDd.html": true
    }
    if (_index_url[_return_url]) {
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
                        window.location.href = '/Member/login.html?from='+encodeURIComponent(_url);
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
                window.location.href = '/Member/login.html?from='+encodeURIComponent(_url);
            } else {
                //$.toast(res.msg, 'text');
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



