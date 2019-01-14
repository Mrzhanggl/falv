/*




*/
APP.getJssdk = function(callback) {
    var _this = this;
    var _callback = callback ? callback : function(){};
    console.log("sdk")
    APP.send('/PC/Wx/jssdkConf.json?source=2', function(res) {
        //alert(JSON.stringify(res));
        var data = res.data;
        _this.jssdk = data;
        if (res.errno == '0') {
            wx.config({
                debug:false,
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
            
            if (window.location.pathname != '/Member/mTopicDetails.html') {
                _this.setShare();
                console.log("调用分享")
            }
            
        }
        _callback();
    });
};
APP.setShare =  function(config) {
    var _path_url = "/Member/mIndex.html";
    // if (window.location.pathname == '/Member/liveDetails.html') {
    //     _path_url = '/Member/liveDetails.html'
    // }
    
    // 是否为安居客页面的分享
    if(APP.getOrderChannel()=='14'){
        console.log("安居客分享")
        if (window.location.pathname == '/newVip/newmIndex.html'|| window.location.pathname == '/Member/jMatching.html' || window.location.pathname == '/Member/jAppointTime.html' || window.location.pathname == '/Member/jTimeGoPay.html' ) {
            _path_url = "/newVip/newmIndex.html";
            // alert(_path_url)
        }
        else if (window.location.pathname == '/Member/mPersonal.html' ) {
            _path_url = window.location.pathname + window.location.search;
            // alert(_path_url)
        }
        else if (window.location.pathname == '/Member/mInfo.html') {
            _path_url = '/Member/mPersonal.html?fromtype=ajk' + window.location.search;
            // alert(_path_url)
        
        }
        else  if (window.location.pathname == '/Member/mSuggest.html' ) {
            _path_url = '/Member/mPersonal.html?fromtype=ajk' + window.location.search;
            // alert(_path_url)
        }
        else   if (window.location.pathname == '/Member/jTimeDetails.html') {
            _path_url = window.location.pathname + window.location.search;
        }
        else   if (window.location.pathname == '/Member/orderList.html') {
            _path_url = window.location.pathname + window.location.search;
        }
        else  if (window.location.pathname == '/Member/orderDetails.html') {
            _path_url = "/newVip/newmIndex.html";
        }
        else{
             _path_url = "/newVip/newmIndex.html";
        }
        

    }
    else if(APP.getOrderChannel()=='13'){
        console.log("华夏分享")
         if (window.location.pathname == '/Member/orderDetails.html') {
            _path_url = "/Member/goodsHx.html"; 
        }
        if (window.location.pathname == '/Member/orderList.html') {
            _path_url = window.location.pathname + window.location.search;
        }
    }
    else{
        console.log("通用分享")
        if (window.location.pathname == '/Member/jTimeDetails.html') {
            _path_url = window.location.pathname + window.location.search;
        }
        if (window.location.pathname == '/Member/orderList.html') {
            _path_url = window.location.pathname + window.location.search;
        }
        if (window.location.pathname == '/Member/orderDetails.html') {
            _path_url = window.location.pathname + window.location.search;
        }
        
    }
    // alert(_path_url)
    var _link = window.location.origin + _path_url;
    var _configAll = {
        title: '法驴，专业解决法律烦恼！',
        desc: '即刻拥有法律服务私人管家',
        link: _link ,
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
                APP.sendHm({
                    action: "click",
                    object: "onMenuShareAppMessage"
                })
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
                })
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
    //不用自动授权登录

    var _data = [
        '/Member/mIndex.html',
        '/Member/mTopicSearch.html',
        '/Member/mGoodsList.html',
        '/Member/mTopicList.html',
        '/Member/mTopicDetails.html',
        '/Member/mArticleDetails.html',
        '/Member/mAbout.html',
        '/Member/mSuggest.html',
        '/Member/agreement.html',
        '/Member/jTimeDetails.html'
    ]
    var _loca_url = window.location.pathname;
    for (var i=0,len=_data.length; i<len; i++) {
        if (_loca_url == _data[i]) {
            return true;
        }
    }
    return false;
};
//微信授权
APP.init = function(callback, url) {
    var _this = this;
    var _url = url ? url : window.location.href;
    var _callback = callback ? callback : function(){};
    //微信授权
    _this.send("/PC/Wx/getOpenid.json?source=1", function(res) {
        if (res.errno != '0') {
            //钉钉
            if (APP.getOrderChannel() == '11' || APP.getOrderChannel() == '12'||APP.getOrderChannel() == '16'||APP.getOrderChannel() == '23') {
                _this.authorization = true;
                _callback();
            } else {
                window.location.href = ajax_url+'/PC/Wx/authorizedForFaLv.json?type=snsapi_userinfo&url='+encodeURIComponent(_url);
                _callback(res);
            }
        } else {
            _this.authorization = true;
            _callback();
        }
    });
};
APP.getInfo = function(vm, callback) {
    var _this = this;
    //法驴会员loading页
    if (window.location.pathname != _this.first_page) {
        sessionStorage.setItem("loading", "true");
    }
    //是否授权页面
    if (_this.getWxUrl() || _this.authorization) {
        _this.initInfo(vm, callback);
    } else {
        _this.init(function() {
            _this.initInfo(vm, callback);
        });
    }
    _this.getJssdk();
};
//用户信息
APP.initInfo = function(vm, callback) {
    var _this = this;
    var _vm = vm;
    var _callback = callback ? callback : function() {};
    _this.send("/PC/User/userInfo.json?source=1", function(res) {
        // alert(JSON.stringify(res))
        //alert(JSON.stringify(res))
        if (res.errno == '0') {
            _vm.info_login = true;
            _this.send('/PC/Wx/getOpenid.json?source=1', function(res2) {
                //alert(JSON.stringify(res2.data))
                if (res2.errno == '0') {
                    res.data.wechat_headimgurl = res2.data.headimgurl;
                    res.data.wechat_nickname = res2.data.nickname;
                    res.data['wechat_city'] = res2.data.city;
                    res.data['wechat_sex'] = res2.data.sex;
                    _vm.info = res.data;
                }
                 _callback(res);
            })
            // _vm.page.show = 'home';

        } else {
            if (!_this.getWxUrl()) {
                //alert(APP.getParam("from"))
                _this.WXLogin(_vm,"",_callback);
            } else {
                _vm.page.show = 'home';
            }
            //_vm.page.show = 'home';
            
            //window.location.href = '/Member/login.html?from='+encodeURIComponent(window.location.href);
            _callback(res);
        }
    });
};



/*
    咨询弹窗
*/
APP.showActionKf = function(source) {
    var _loca_url = window.location.pathname;
    if (_loca_url == '/Member/goodsDetails.html') {
        if (source && source == 'goodsDetails_top') {
            APP.sendHm({
                action: "click",
                object: "product-ask"
            })
        } else {
             APP.sendHm({
                action: "click",
                object: "product-tell"
            })
        }
    } else if (_loca_url == '/Member/personal.html') {
        APP.sendHm({
            action: "click",
            object: "userCenter-servicer"
        })

    } else if (_loca_url == '/Member/orderList.html') {
        APP.sendHm({
            action: "click",
            object: "orderCenter-servicer"
        })
    } else if (_loca_url == '/Member/orderDetails.html') {
        APP.sendHm({
            action: "click",
            object: "order-servicer"
        })
    }

    var _actions = [
        {
            text: "<a class='s-actionsheet-tel' href='tel:4000183693'><span class='s-actionsheet-kf-span2'>电话咨询（4000183693）</span></a>",
            onClick: function() {
                //console.log(233)
                APP.sendHm({
                    action: "click",
                    object: "servicer-tell"
                })
            }
        },
        // {
        //     text: "<span class='s-actionsheet-kf-span'>在线咨询</span>",
        //     onClick: function() {
        //         APP.sendHm({
        //             action: "click",
        //             object: "servicer-online"
        //         }, function() {
        //             APP.sendKf();
        //         })
        //     }
        // }
    ]


    //钉钉渠道
    if (APP.getOrderChannel() == "11") {
        _actions.splice(1, 1)
    }

    $.actions({
        actions: _actions
    });
};



/*
    视频分类icon
*/
APP.getLiveClassIcon = {
    "0" : '/Public/Home/Live/img/n1.png',
    "4" : '/Public/Home/Live/img/n2.png',
    "1" : '/Public/Home/Live/img/n3.png',
    "2" : '/Public/Home/Live/img/n4.png',
    "3" : '/Public/Home/Live/img/n5.png'
}


/*
    3height
*/
APP.listCheckHeight = function(start, data) {
    //
   // return;
    var _data = data;
    var _h = $(".JS_m_commentList").height() * 3;
    for (var i=start, len=_data.length; i<len; i++) {
        //console.log($(".JS_list_text"+i).height())
        if ($(".JS_list_text"+i).height() && $(".JS_list_text"+i).height() > _h) {
            $(".JS_list_text"+i).addClass("overText_3");
            //console.log($(".JS_list_text"+i).height())
            $(".JS_list_text_more"+i).css({display: "block"});
        }
    }
};
APP.showListHeight = function(index) {
    if ($(".JS_list_text_more"+index).hasClass("active")) {
        $(".JS_list_text"+index).addClass("overText_3");
        $(".JS_list_text_more"+index).removeClass("active");
    } else {
        $(".JS_list_text"+index).removeClass("overText_3");
        $(".JS_list_text_more"+index).addClass("active");
    }
};

APP.listCheckHeightHot = function(start, data) {
    //
   // return;
    var _data = data;
    var _h = $(".JS_m_commentList").height() * 3;
    for (var i=start, len=_data.length; i<len; i++) {
        //console.log($(".JS_list_text"+i).height())
        if ($(".JS_listHot_text"+i).height() && $(".JS_listHot_text"+i).height() > _h) {
            $(".JS_listHot_text"+i).addClass("overText_3");
            //console.log($(".JS_list_text"+i).height())
            $(".JS_listHot_text_more"+i).css({display: "block"});
        }
    }
};
APP.showListHeightHot = function(index) {
    if ($(".JS_listHot_text_more"+index).hasClass("active")) {
        $(".JS_listHot_text"+index).addClass("overText_3");
        $(".JS_listHot_text_more"+index).removeClass("active");
    } else {
        $(".JS_listHot_text"+index).removeClass("overText_3");
        $(".JS_listHot_text_more"+index).addClass("active");
    }
};





/*
    微信自动登陆
*/
APP.WXLogin =  function(vm, url,callback) {
    var _this = this;
    var _vm = vm;
    var _url = url ? url : window.location.pathname+window.location.search;
    //'/Member/liveIndex.html'
    
    var _from_url = '/Member/login.html?from='+encodeURIComponent(_url);

    // if (window.location.pathname == '/Member/login.html' && !url) {
    //     _url =  APP.getParam("from") ? APP.getParam("from") : "/Member/mIndex.html";
    // }

    // if (window.location.pathname !=='/Member/login.html' && window.location.pathname !=='/member/login.html') {
    //     getOpenid();
    // }
    //var _return_url = APP.getParam("from") ? decodeURIComponent(APP.getParam("from")) : _url;
    // alert(_from_url)
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

                    //必须登录页面
                    if (!_this.getWxUrl()) {
                    
                        if (window.location.pathname != '/Member/login.html') {
                            window.location.href = _from_url;
                        } else {
                            vm.page.show = 'login';
                        }

                    }
                   
                } else {
                    //有 登陆
                    //alert(JSON.stringify(_data))
                    bindLogin(vm, _url,callback);
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
    function bindLogin(vm, url,callback) {
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
                if(APP.getOrderChannel=='14'){
                    callback()
                }else{
                    window.location.href = url;
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
    showLayerTips: function(obj) {
        this.top = $(document).scrollTop();
        //弹框
        $(".weui-mask,.b1-dialog").remove();
        var _html = '<div class="weui-mask"></div>\
            <div class="b1-dialog b1-dialog_center JS_dialog" style="display: none;">\
                <div class="b1-dialog__hd2"></div>\
                <div class="b1-dialog__bd JS_dialog_bd"></div>\
                <div class="b1-dialog__ft JS_dialog_ft clearfix">\
                    <div class="b1-dialog__btn JS_dialog_cancel default">取消</div>\
                    <div class="b1-dialog__btn JS_dialog_commit primary">确定</div>\
                </div>\
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
    showLayer: function(obj){
        this.top = $(document).scrollTop();
        //弹框
        $(".weui-mask,.b1-dialog").remove();
        var _html = '<div class="weui-mask"></div>\
            <div class="b1-dialog b1-dialog_center JS_dialog" style="display: none;">\
                <div class="b1-dialog__bd JS_dialog_bd"></div>\
                <div class="b1-dialog__ft JS_dialog_ft clearfix">\
                    <div class="b1-dialog__btn JS_dialog_cancel default">取消</div>\
                    <div class="b1-dialog__btn JS_dialog_commit primary">确定</div>\
                </div>\
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
    showTimeTips: function(obj) {
        this.top = $(document).scrollTop();
        //弹框
        $(".weui-mask,.b1-dialog").remove();
        var _html = '<div class="weui-mask"></div>\
            <div class="b1-dialog b1-dialog_center JS_dialog" style="display: none;">\
                <div class="b1-dialog__hd b1-dialog__hd3 JS_dialog_hd"><strong>须知</strong></div>\
                <div class="b1-dialog__bd b1-dialog__bd3 JS_dialog_bd"></div>\
                <div class="b1-dialog__ft b1-dialog__ft3  JS_dialog_ft clearfix">\
                    <div class="b1-dialog__btn3 JS_dialog_commit m-btn m-btn_1">知道了</div>\
                </div>\
            </div>';
        $("body").addClass('lock');
        $("#app").append(_html);
        var _layerBg = $(".weui-mask"),
            _layer = $(".JS_dialog"),
            _cansel = $(".JS_dialog_cancel"),
            _commit = $(".JS_dialog_commit"),
            _dialog_hd = $(".JS_dialog_hd"),
            _dialog_bd = $(".JS_dialog_bd"),
            _dialog_ft = $(".JS_dialog_ft");
        setTimeout(function() {
            $(_layer).addClass("b1-dialog--visible");
        },10)
        if(obj.text){
            _layer.find(".b1-dialog__bd").html(obj.text);
        }
        //weui-mask--visible
        _layer.css({"display":"block"});
        _layerBg.addClass("weui-mask--visible");
        if (obj.title) {
            _dialog_hd.find("strong").html(obj.title);
        }
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
            _commit.on("click",function(e){
                obj.onOK();
                e.preventDefault();         
            })
        }
        if (obj.onCancal) {
            _cansel.on("click",function(e){    
                obj.onCancal();  
                e.preventDefault();            
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
        //禁止ios 蒙版底层滚动
        document.querySelector('.b1-dialog').addEventListener('touchmove', function(e) {
            e.preventDefault()
        }, false)
    }
};




