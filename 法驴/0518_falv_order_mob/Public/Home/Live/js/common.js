/*




*/


//toast 显示时间
$.toast.prototype.defaults.duration = 1000;
var ajax_url = "https://www.falv58.com";
var src_url = "https://www.falv58.com";
if (window.location.host!=="www.falv58.com") {
    ajax_url = "https://mest.falv58.com";
    src_url = "https://mest.falv58.com";
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
    versions: function(){
        var u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
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
    getNetworkType: function() {
        var ua = navigator.userAgent;
        var networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other';
        networkStr = networkStr.toLowerCase().replace('nettype/', '');
        var networkType;
        switch (networkStr) {
            case 'wifi':
                networkType = 'wifi';
                break;
            case '4g':
                networkType = '4g';
                break;
            case '3g':
                networkType = '3g';
                break;
            case '3gnet':
                networkType = '3g';
                break;
            case '2g':
                networkType = '2g';
                break;
            default:
                networkType = 'other';
        }
        return networkType;
    },
    bytesToSize: function(limit) {
        var size = "";
		size = (limit / (1024 * 1024)).toFixed(0);
        size = size < 1 ? 1 : size;
		return size;

    },
    checkHeadPic: function(url) {
        if (url === 'images/pic.jpg' || url === '') {
            return 'http://www.7anb.com/Public/Home/Mob/img/default-headpic.png';
        } else {
            return url;
        }
    },
    sendKf: function() {
        window.location.href = 'https://www.sobot.com/chat/h5/index.html?sysNum=72ff77ec0e1646f6945ff0aa05fbbe53'; 
    }
}

// APP.init();

APP.setOrderChannel = function(type) {
    var _channel = type ? type : '14';
    sessionStorage.setItem("order_from_channel", _channel);
}
APP.getOrderChannel = function() {
    var _channel = sessionStorage.getItem("order_from_channel") ? sessionStorage.getItem("order_from_channel") : '14';
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
//获取链接来源
APP.setParamChannel();


/* 
    init 渠道
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