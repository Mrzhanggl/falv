/*




*/


//toast 显示时间
$.toast.prototype.defaults.duration = 1500;
var ajax_url = "https://www.falv58.com";
var src_url = "https://www.falv58.com";
if (window.location.host!=="www.falv58.com") {
    ajax_url = "http://mest.falv58.com";
    src_url = "http://mest.falv58.com";
}

if (window.location.pathname=="/newVip/YzfIndex.html") {
    sessionStorage.setItem('isZFY','true')
}
if(sessionStorage.getItem('isZFY')){
    ajax_url = "http://mest.falv58.com";
    src_url = "http://mest.falv58.com";
}



var APP = {
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
    isdingding: function(){
    　　//判断是不是钉钉
    　　var ua = navigator.userAgent.toLowerCase();
    　　return ua.indexOf("dingtalk") >= 0;
    },
    isPass: function(pass) {
        var pattern = /^[0-9a-zA-Z]+$/;
        return pattern.test(pass);
    },
    isInfoName: function (text) {
        if (!text) {
            return false;
        }
        var pattern = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
        return pattern.test(text);
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
    send: function(url, data, callback,type) {
        var _callback = typeof(data) == 'function' ? data : callback;
        var _data = typeof(data) != 'function' ? data : {};
        var _type = _data ? 'post' : 'get';
        var _url = type?url:(ajax_url + url);
        $.ajax({
            type: _type,
            url: _url,
            data: _data,
            timeout :100000,
            xhrFields: {
                withCredentials: true
            },
            success: function(res) { _callback(res); },
            error: function(XMLHttpRequest, textStatus, errorThrown) { $.hideLoading();console.log(XMLHttpRequest, errorThrown, textStatus) },
        })
    },
    sendTimeOut: function(url, data, callback, timeoutCallback) {
        var _callback = typeof(data) == 'function' ? data : callback;
        var _data = typeof(data) != 'function' ? data : {};
        var _timeoutCallback = typeof(data) == 'function' ? callback : timeoutCallback;
        var _type = _data ? 'post' : 'get';
        var _url = ajax_url + url;
        $.ajax({
        　　url: _url,  
        　　timeout : 5000, //超时时间设置，单位毫秒
        　　type : _type,  
        　　data : _data,  
        　　dataType:'json',
            xhrFields: {
                withCredentials: true
            },
        　　success:function(res){ 
                _callback(res);
        　　},
        　　complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
        　　　　if (status == 'timeout' || status == 'error'){//超时,status还有success,error等值的情况
        　　　　　 _timeoutCallback();
        　　　　}
        　　},
            error: function(XMLHttpRequest, textStatus, errorThrown) { $.hideLoading();console.log(XMLHttpRequest, errorThrown, textStatus) },
        });

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
                return ""
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
        order_state: {
            'all': '全部订单',
            '0': '待支付',
            '1': '服务中',
            '2': '待缴清',
            '3': '已完成',
            '4': '已取消',
            '8': '无需支付',//0 待支付 1服务中 2待缴清 3服务完成 4已取消 5紧急预案 6退款中 7已退款
        },
        order_type: {
            ' ': '0', //邮政
            '80': '1', //东家会
            '81': '2', //环球黑卡
            '82': '3', //腾讯创服
            '83': '0', //邮政 //5联璧 6通联
            '84': '4',  //短信 
        },
        score_text: {
            "0": "请您评价律师的服务",
            "1": "非常不满意，各方面都很差",
            "2": "不满意，比较差",
            "3": "一般，还需改善",
            "4": "比较满意，仍可改善",
            "5": "非常满意，无可挑剔",
        },
        score_star_text: {
            "1": "非常不满意",
            "2": "不满意",
            "3": "一般",
            "4": "比较满意",
            "5": "非常满意",
        },
        order_type_etxt: {
            "0": "产品",
            "9": "视频",
            "10": "视频",
            "11": "电话咨询", //0 => '单项服务', 4 => 'vip', 5 => '合同包', 
                            //6 => '套包', 7 => '专项', 8 => '充值', 
                            //9 => '合集', 10 => '视频', 11 => "计时产品"
        },
        product_case: {
            // "0": "其他",
            // "6": "合同",
            // "7": "婚姻",
            // "8": "房产",
            // "9": "劳动",
            // "10": "交通",
            // "11": "侵权",
            // "43": "投资理财",
            // "44": "刑事",
            // "46": "行政诉讼",
            "0": "其他",
            "6": "合同",
            "7": "婚姻家事",
            "8": "房屋产权",
            "9": "劳动纠纷",
            "10": "交通",
            "11": "消费者权益",
            "43": "投资理财",
            "44": "刑事",
            "46": "行政诉讼",
        }
    },
    getNum: function(num) {
        var num = num + '';
        return num.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
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
    },
    changePic: function(div, callback) {
        var _this = this;
        var _callback = callback ? callback : function(){};
        var Orientation = null; 

        $.each($(div)[0].files, function(i, file) {
            if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
            //获取照片方向角属性，用户旋转控制 
            EXIF.getData(file, function() { 
                EXIF.getAllTags(this);  
                Orientation = EXIF.getTag(this, 'Orientation'); 
            }); 
            
            var reader = new FileReader();
            reader.onload = function () {
                var result = this.result;
                var img = new Image();
                img.src = result;

                if (img.complete) {
                    callback();
                } else {
                    img.onload = callback;
                }
                function callback() {
                    var basestr = _this.compressPic(img, Orientation);
                    _this.compressUpload(basestr, file.type, _callback);
                    img = null;
                }
            };
            reader.readAsDataURL(file);
        });
    },
    compressPic: function(img, Orientation) {
        //    用于压缩图片的canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        //    瓦片canvas
        var tCanvas = document.createElement("canvas");
        var tctx = tCanvas.getContext("2d");
    

        var initSize = img.src.length;
        var width = img.width;
        var height = img.height;

        //
        //console.log(width, height)
        // if (width>height) {
        //     width=height;
        // }
        // if (height>width) {
        //     width=height;
        // }

        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        var ratio;
        if ((ratio = width * height / 4000000)>1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        }else {
            ratio = 1;
        }

        canvas.width = width;
        canvas.height = height;
        //alert(Orientation);

        // var degree =  90 * Math.PI / 180;   
        // ctx.rotate(degree); 
        // ctx.drawImage(img, 0, 0);
        //rotateImg(img,'left',canvas); 
        
        //修复ios 
        if (navigator.userAgent.match(/iphone/i)) {
            //console.log(Orientation); 
            //alert(expectWidth + ',' + expectHeight); 
            //如果方向角不为1，都需要进行旋转 added by lzk 
            if(Orientation != "" && Orientation != 1){ 
                //alert('旋转处理'); 
                switch(Orientation){ 
                    case 6://需要顺时针（向左）90度旋转 
                        //alert('需要顺时针（向左）90度旋转'); 
                        rotateImg(ctx, img,'left',canvas); 
                        break; 
                    case 8://需要逆时针（向右）90度旋转 
                        //alert('需要顺时针（向右）90度旋转'); 
                        rotateImg(ctx, img,'right',canvas); 
                        break; 
                    case 3://需要180度旋转 
                        //alert('需要180度旋转'); 
                        rotateImg(ctx, img,'right',canvas);//转两次 
                        rotateImg(ctx, img,'right',canvas); 
                        break; 
                }        
            } 
        }

        function rotateImg(ctx, img, direction,canvas) {   
            //alert(img); 
            //最小与最大旋转方向，图片旋转4次后回到原方向   
            var min_step = 0;   
            var max_step = 3;   
            //var img = document.getElementById(pid);   
            if (img == null)return;   
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错   
            var height = img.height;   
            var width = img.width;   
            // if (width>height) {
            //     width=height;
            // }
            // if (height>width) {
            //     width=height;
            // }
            //var step = img.getAttribute('step');   
            var step = 2;   
            if (step == null) {   
                step = min_step;   
            }   
            if (direction == 'right') {   
                step++;   
                //旋转到原位置，即超过最大值   
                step > max_step && (step = min_step);   
            } else {   
                step--;   
                step < min_step && (step = max_step);   
            }   
            //img.setAttribute('step', step);   
            /*var canvas = document.getElementById('pic_' + pid);   
            if (canvas == null) {   
                img.style.display = 'none';   
                canvas = document.createElement('canvas');   
                canvas.setAttribute('id', 'pic_' + pid);   
                img.parentNode.appendChild(canvas);   
            }  */ 
            //旋转角度以弧度值为参数   
            var degree = step * 90 * Math.PI / 180;   
            //alert(step)
            switch (step) {   
                case 0:   
                    canvas.width = width;   
                    canvas.height = height;   
                    ctx.drawImage(img, 0, 0);   
                    break;   
                case 1:   
                    canvas.width = height;   
                    canvas.height = width;   
                    //alert(degree)
                    ctx.rotate(degree);   
                    ctx.drawImage(img, 0, -height);   
                    break;   
                case 2:   
                    canvas.width = width;   
                    canvas.height = height;   
                    ctx.rotate(degree);   
                    ctx.drawImage(img, -width, -height);   
                    break;   
                case 3:   
                    canvas.width = height;   
                    canvas.height = width;   
                    ctx.rotate(degree);   
                    ctx.drawImage(img, -width, 0);   
                    break;   
            }   
        }   

        //铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //如果图片像素大于100万则使用瓦片绘制
        var count;
        if ((count = width * height / 1000000) > 1) {
            count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片
            //计算每块瓦片的宽和高
            var nw = ~~(width / count);
            var nh = ~~(height / count);

            tCanvas.width = nw;
            tCanvas.height = nh;
            for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            ctx.drawImage(img, 0, 0, width, height);
        }

        //进行最小压缩
        var ndata = canvas.toDataURL('image/jpeg', 0.4);

        // console.log('压缩前：' + initSize);
        // console.log('压缩后：' + ndata.length);
        // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
    },
    compressUpload: function(basestr, type, callback) {
        //console.log(type)
        var _callback = callback ? callback : function() {};

        var text = window.atob(basestr.split(",")[1]);

        var buffer = new Uint8Array(text.length);

        var pecent = 0, loop = null;

        for (var i = 0; i < text.length; i++) {
            buffer[i] = text.charCodeAt(i);
        }
        
        var blob = getBlob([buffer], type);
        

        function getBlob(buffer, format) {
            try {
                return new Blob(buffer, {type: format});
            } catch (e) {
            var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
            buffer.forEach(function(buf) {
                bb.append(buf);
            });
                return bb.getBlob(format);
            }
        }
        function getFormData() {
            var isNeedShim = ~navigator.userAgent.indexOf('Android')
                && ~navigator.vendor.indexOf('Google')
                && !~navigator.userAgent.indexOf('Chrome')
                && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
            return isNeedShim ? new FormDataShim() : new FormData()
        }

        function FormDataShim() {
            var o = this,
                parts = [],
                boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
                oldSend = XMLHttpRequest.prototype.send;
            this.append = function(name, value, filename) {
                parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
                if (value instanceof Blob) {
                    parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                    parts.push(value);
                }
                else {
                    parts.push('\r\n\r\n' + value);
                }
                parts.push('\r\n');
            };
            // Override XHR send()
            XMLHttpRequest.prototype.send = function(val) {
                var fr,
                    data,
                    oXHR = this;
                if (val === o) {
                    // Append the final boundary string
                    parts.push('--' + boundary + '--\r\n');
                    // Create the blob
                    data = getBlob(parts);
                    // Set up and read the blob into an array to be sent
                    fr = new FileReader();
                    fr.onload = function() {
                    oldSend.call(oXHR, fr.result);
                    };
                    fr.onerror = function(err) {
                    throw err;
                    };
                    fr.readAsArrayBuffer(data);
                    // Set the multipart content type and boudary
                    this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                    XMLHttpRequest.prototype.send = oldSend;
                }
                else {
                    oldSend.call(this, val);
                }
            };
        }
        var formdata = getFormData();
        var _pic_name = Date.parse(new Date()) + '.png';

        formdata.append('imagefile', blob, _pic_name);


        _callback(formdata)
    },
    calcSum: function(sum) {
        //播放量
        var _s = parseFloat(sum);
        var _t = '';
        if (_s>=10000) {
            _s = _s / 10000;
            _t = '' + _s;
            if (_t.split(".").length>1) {
                _s = _s.toFixed(1) + '万';
            } else {
                _s = _s + '万';
            }
        }

        return _s;
    },
    clearHtmlText: function(t) {
        //去除html
        var reTag = /<(?:.|\s)*?>/g;
        return t.replace(reTag,"");
    },
    resetTime: function(time, type) {
        if (type == 'zh') {
            var _d = time.split(" ")[0].split("-");
            return _d[1]+'月'+_d[2]+'日'
        }
        if (type == 'zh_all') {
            var _d = time.split(" ")[0].split("-");
            return _d[0]+'年' + _d[1]+'月'+_d[2]+'日'+' ' + time.split(" ")[1];
        }


        return time;
    },
    randomNum: function(minNum, maxNum){ 
        //返回随机数
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
                default: 
                    return 0; 
                break; 
        } 
    },
    calcCount: function(time) {
        var s = time.replace(/-/g, "/")
        var _s = new Date(s).getTime();
        var _d = new Date().getTime();
        console.log(parseInt((_d - _s)/1000))
        return parseInt((_d - _s)/1000);
    },
    calcMinute: function(s) {
        return  Math.ceil(parseInt(s) / 60);
    },
    formatSeconds: function(value) { 
        var theTime = parseInt(value);// 秒 
        var theTime1 = 0;// 分 
        var theTime2 = 0;// 小时 
        // alert(theTime); 
        if(theTime > 60) { 
            theTime1 = parseInt(theTime/60); 
            theTime = parseInt(theTime%60); 
        // alert(theTime1+"-"+theTime); 
        // if(theTime1 > 60) { 
        //     theTime2 = parseInt(theTime1/60); 
        //     theTime1 = parseInt(theTime1%60); 
        // } 
        } 
        var result = ""+parseInt(theTime)+"秒"; 
        if(theTime1 > 0) { 
            result = ""+parseInt(theTime1)+"分"+result; 
        } 
        // if(theTime2 > 0) { 
        //     result = ""+parseInt(theTime2)+"小时"+result; 
        // } 
        return result; 
    } 
}

// 通用渠道兑换
APP.setCommonChannel = function() {
    sessionStorage.setItem("Common_channel", "true");
}
APP.getCommonChannel = function() {
    var is_common = sessionStorage.getItem("Common_channel") ? sessionStorage.getItem("Common_channel") : '';
    return is_common;
}



// APP.init();

//订单来源
APP.setOrderChannel = function(type) {
    var _channel = type ? type : '';
    sessionStorage.setItem("order_from_channel", _channel);
}
APP.getOrderChannel = function() {
    var _channel = sessionStorage.getItem("order_from_channel") ? sessionStorage.getItem("order_from_channel") : '';
    return _channel;
}

//注册来源
APP.setFromChannel = function(type) {
    //15公众号
    var _channel = type ? type : '15';
    sessionStorage.setItem("reg_from_channel", _channel);
}

APP.getFromChannel = function() {
    var _channel = sessionStorage.getItem("reg_from_channel") ? sessionStorage.getItem("reg_from_channel") : '15';
    return _channel;
}

//通用兑换渠道客户来源区分
APP.setCustomerSourceChannel= function(type) {
    var _channel = type ? type : '';
    sessionStorage.setItem("CustomerSourceChannel", _channel);
}

APP.getCustomerSourceChannel = function() {
    var _channel = sessionStorage.getItem("CustomerSourceChannel") ? sessionStorage.getItem("CustomerSourceChannel") : '';
    return _channel;
}

//通用购买  渠道来源区分
APP.setNewChannel= function(type) {
    var _channel = type ? type : '';
    sessionStorage.setItem("NewChannel", _channel);
}

APP.getNewChannel = function() {
    var _channel = sessionStorage.getItem("NewChannel") ? sessionStorage.getItem("NewChannel") : '';
    return _channel;
}





//推广链接来源fromchannel
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


    订单来源 source
    public static $source = array(0 => "app", 1 => "falv58", 2 => "falv58rb", 3 => "后台创建", 4 => "小程序", 
    5 => "企安宝PC", 6 => "企安宝M站", 7 => "crm", 8 => "邮储", 9 => "联璧", 10 => "收银宝特惠", 11 => "收银宝优惠", 
    12 => "收银宝特选", 13 => "anyhelper", 14 => "falv会员", 15 => "钉钉");

    客户来源
    public static $customer_source_map = array(0 => "员工转介绍", 1 => "客户转介绍", 2 => "渠道置换", 3 => "红枫", 
    4 => "腾讯创服", 5 => "微信营销", 6 => "线下电销", 7 => "线下会销（PR）", 8 => "线下会销（SP）", 
    9 => "线下会销（PR和SP）", 10 => "智齿", 11 => "自主开发", 12 => "app", 13 => "web前端", 14 => "服务号", 
    15 => "公众号", 16 => "微信", 17 => "线上活动", 18 => "小程序", 19 => "诉讼公司名单", 
    20 => "企安宝智能投顾管家", 21 => "汇桔网", 22 => "东家会", 23 => "环球黑卡", 24 => "邮政", 
    25 => "短信营销", 26 => "联璧", 27 => "收银宝特惠", 28 => "收银宝优惠", 29 => "收银宝特选", 
    30 => "anyhelper", 31 => "法驴会员", 32 => "法驴会员服务号", '33' => '钉钉'， 35);

*/



/* 
    init 注册来源 订单来源
*/
APP.initChannel = function() {
    //链接来源
    var _reg_from_channel = APP.getParam("reg_from_channel");

    //注册来源对应订单来源 channel
    var _order_channel = {
        "24": "0",  //邮政
        "22": "1",  //东家会
        "26": "5",  //联璧
        "27": "6",  //收银宝特惠
        "28": "7",  //收银宝优惠
        "29": "8",  //收银宝特选
        "15": "14", //服务号
        "33": "11", //钉钉
        "35": "12", //壹钱包
        "36": "13",//华夏
        "37": "14",//安居客
    }
    if (_reg_from_channel) {
        APP.setFromChannel(_reg_from_channel);
        APP.setOrderChannel(_order_channel[_reg_from_channel]);
    }

    //推广链接来源 
    if (APP.getParam("fromchannel")=='falvvip') {
        APP.setFromChannel('31')
    } else if (APP.getParam("fromchannel")=='falvfuwu') {
        APP.setFromChannel('32')
    }

}
APP.initChannel();


/* 
    hm
*/
APP.sendHm = function(object, callback) {
    var _json = object;
    // var _json = {
    //     action: action,
    //     object: object,
    //     chinese_object: chinese_object,
    //     chinese_url: chinese_url,
    //     parameter: parameter,
    //     fromchannel: _fromchannel
    // }

    var _paramChannel = APP.getParamChannel();
    var _channel = APP.getOrderChannel()
    if(APP.getNewChannel()){
         _channel = APP.getNewChannel()
     }
     if(APP.getNewChannel()){
         _channel = APP.getNewChannel()
     }
    var _fromchannel = _paramChannel ? _paramChannel : 'falvvip';

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
    } else if (_channel == '11') {
        _fromchannel = "dingding";
    } else if (_channel == '12') {
        _fromchannel = "壹钱包";
    }else if (_channel == '13') {
        _fromchannel = "华夏";
    }else if (_channel == '14') {
        _fromchannel = "安居客";
    }else if (_channel == '16') {
        var cover = APP.getCustomerSourceChannel()
        var list={
            "0":"员工转介绍",
            "1":"客户转介绍",
            "2":"渠道置换",
            "3":"红枫",
            "4":"腾讯创服",
            "5":"微信营销",
            "6":"线下电销",
            "7":"线下会销（PR）",
            "8":"线下会销（SP）",
            "9":"线下会销（PR和SP）",
            "10":"智齿",
            "11":"自主开发",
            "12":"app",
            "13":"web前端",
            "14":"服务号",
            "15":"公众号",
            "16":"微信",
            "17":"线上活动",
            "18":"小程序",
            "19":"诉讼公司名单",
            "20":"企安宝智能投顾管家",
            "21":"汇桔网",
            "22":"东家会",
            "23":"环球黑卡",
            "24":"邮政",
            "25":"短信营销",
            "26":"联璧",
            "27":"收银宝特惠",
            "28":"收银宝优惠",
            "29":"收银宝特选",
            "30":"anyhelper",
            "31":"法驴会员（falv58)",
            "32":"法驴会员服务号",
            "33":"钉钉",
            "34":"企业服务云",
            "35":"壹钱包",
            "36":"华夏",
            "37":"安居客",
            "39":"通用渠道",
            "41":"易买买商城",
            "42":"畅由积分商城",
            "43":"翼支付",
            "44":"联通积分商城",
            "45":"中国人寿优惠券",
            "46":"青黑",
            "47":"返利网",
            "48":"包小黑",
            "49":"戊禾",
            "50":"狮韵",
        }

        _fromchannel = list[cover];
    }else if (_channel == '18') {
        _fromchannel = "易买买商场";
    }else if (_channel == '19') {
        _fromchannel = "畅游积分商场";
    }else if (_channel == '20') {
        _fromchannel = "翼支付";
    }else if (_channel == '21') {
        _fromchannel = "联通积分商城";
    }else if (_channel == '22') {
        _fromchannel = "中国人寿优惠券";
    }else if (_channel == '23') {
        _fromchannel = "青黑";
    }else if (_channel == '24') {
        _fromchannel = "返利网";
    }else if (_channel == '48') {
        _fromchannel = "包小黑";
    }else if (_channel == '49') {
        _fromchannel = "戊禾";
    }else if (_channel == '50') {
        _fromchannel = "狮韵";
    }else if (_channel == '53') {
        _fromchannel = "华夏H5";
    }

    //快捷链接 falvvip法驴会员H5 falvfuwu法驴会员服务号
    // if (_paramChannel) {
    //     _fromchannel = APP.getParamChannel();
    // }


     _json["fromchannel"] = _fromchannel;
    
    var _callback = callback ? callback : function() {};
    APP.send("/PC/User/visit.json", _json, function() {
        _callback();
    })
}






/* 

    钉钉分享

*/
if (APP.isdingding()) {
    dd.ready(function() {

        // 钉钉右上角更多事件控制
        dd.biz.navigation.setRight({
          show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
          control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
          text: '', // 控制显示文本，空字符串表示显示默认文本
          onSuccess: function (result) {
            //alert("开始分享")
            // 如果control为true，则onSuccess将在发生按钮点击事件被回调
            // check share url ---------------------------------------------
            // 钉钉内置分享
            dd.biz.util.share({
    　　　　　　type: 1, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
    　　　　　　url: ajax_url + '/Member/goodsDd.html',
    　　　　　　content: '高定”法驴权益，不止于免费',
    　　　　　　title: '法驴出手，权益“板上钉钉”',
    　　　　　　image: 'http://www.falv58.com/Public/Home/member/img/slogo.png',
    　　　　　　onSuccess: function() {
    　　　　　　//onSuccess将在分享完成之后回调
    　　　　　　/**/
    　　　　　　},
    　　　　　　onFail: function(err) {}
    　　　　})
          },
          onFail: function (err) {
             //alert('点击右上角失败')
          }
        })

　　　　
　　});
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

//监控脚本
!(function(c,b,d,a){c[a]||(c[a]={});c[a].config={pid:"ip6vuhqbfi@9695f9654c72a69",imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",sendResource:true,useFmp:true};
with(b)with(body)with(insertBefore(createElement("script"),firstChild))setAttribute("crossorigin","",src=d)
})(window,document,"https://retcode.alicdn.com/retcode/bl.js","__bl");


/*
    vconsole
*/

// ;(function() {
//     var _hmt = _hmt || [];
//     var hm = document.createElement("script");
//     hm.src = "/Public/Home/Live/js/vconsole.min.js";
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(hm, s);
//     hm.onload = hm.onreadystatechange = function() {
//         var vConsole = new VConsole();
//         hm.onload = hm.onreadystatechange = null;
//     }
// })();

