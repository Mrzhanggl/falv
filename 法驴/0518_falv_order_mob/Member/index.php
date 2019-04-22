<?php
if(isset($_GET["fromchannel"]))
{
	$fromchannel = $_GET["fromchannel"];
	
}
else
{
	$fromchannel = "";
}

$iipp = $_SERVER["REMOTE_ADDR"];
$ua = $_SERVER['HTTP_USER_AGENT'];


// $myurlentre = "http://www.falv58.com/?fromchannel=wechatshare";//设置微信分享后点击进入的URL
$iipp = $_SERVER["REMOTE_ADDR"]; //获取用户IP


// require_once "jssdk.php";
// $jssdk = new JSSDK("wxc01b04deb2742871", "895447c26829944b3a67ee0c7d74633b");//法驴服务号的ID，不要外泄，也不用改
// $signPackage = $jssdk->GetSignPackage();
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$myurl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

$title = "法驴|个人法律咨询|企业法律管家|公司法务|法律纠纷";
$keyword = "法驴,个人法律咨询,企业法律关键,公司法务,法律纠纷,找律师";
$description = "法驴专注优质法律服务！法驴首创悬赏-选择法律人-咨询-代理-合同上传-支付保证-评价一条龙服务的闭环，以极小的代价，找到自己专属律师和法律顾问，贴心又放心！法律咨询、找律师、打官司首选法驴。";

function search_word_from()
{
    $referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
    if(strstr($referer, 'baidu.com'))
    {
        // 百度
        preg_match('/baidu.+wo?r?d=([^\\&]*)/is', $referer, $tmp);
        $keyword = urldecode($tmp[1]);
        $from = 'baidu-free';
    }
    elseif (strstr($referer, 'so.com'))
    {
        // 360搜索
        preg_match('/so.+q=([^\\&]*)/is', $referer, $tmp);
        $keyword = urldecode($tmp[1]);
        $from = '360-free';
    }
    elseif (strstr($referer, 'sogou.com'))
    {
        // 搜狗
        preg_match('/sogou.com.+query=([^\\&]*)/is', $referer, $tmp);
        $keyword = urldecode($tmp[1]);
        $from = 'sogou-free';
    }
    elseif (strstr($referer, 'soso.com'))
    {
        // 搜搜
        preg_match('/soso.com.+w=([^\\&]*)/is', $referer, $tmp);
        $keyword = urldecode($tmp[1]);
        $from = 'soso-free';
    }
    else
    {
        $keyword ='';
        $from = '';
    }

    return array('keyword' => $keyword, 'from' => $from);
}
$word = search_word_from();
if(!empty($word['keyword']))
{
    //$word['keyword']  来源关键词
	//$word['from'] 来源引擎
}

function curPageURL() 
{
  $pageURL = 'http';
  $pageURL .= "://";
 
  if ($_SERVER["SERVER_PORT"] != "80") 
  {
    $pageURL .= $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . $_SERVER["REQUEST_URI"];
  } 
  else
  {
    $pageURL .= $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
  }
  return $pageURL;
}

$page = curPageURL();

?>

<!DOCTYPE HTML>

<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width"
    />
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="yes" name="apple-touch-fullscreen">
    <meta content="telephone=no,email=no" name="format-detection">
    <meta name="renderer" content="webkit">
	<META NAME="Title" CONTENT="<?php echo $title?>">
	<META NAME="Author" CONTENT="晓法网络科技">
	<META NAME="Keywords" CONTENT="<?php echo $keyword?>">
	<META NAME="Description" CONTENT="<?php echo $description?>">
    
    <title>首页</title>
    <!-- <link type="text/css" rel="stylesheet" href="/App//newPC/css/style.css?v=02" /> -->
    <link rel="stylesheet" href="/newPC/css/animate.css">
    <link rel="stylesheet" href="/newPC/css/swiper.min.css">
    <link rel="stylesheet" href="/newPC/css/mainindex.css?v=22">
    <link href="/newPC/img/bitbug_favicon.ico" rel="icon" type="image/x-icon" />
	<script>
		var kfJson = {
			promotion_party: '<?php echo $word["from"]?>' ? 'sem' : 'seo',
			from: '<?php echo $word["from"]?>',
			keyword: '<?php echo $word["keyword"]?>',
			page: window.location.href
		}
	</script>
	<?php
	if($_SERVER['HTTP_HOST']=='www.falv58.com'){
	?>
	<script>
		var _hmt = _hmt || [];
		(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?d759fed30aab93aa659fdabadc9e15e5";
		var s = document.getElementsByTagName("script")[0]; 
		s.parentNode.insertBefore(hm, s);
		})();
	</script>
	<?php
	}
	?>


	<?php
	if($_SERVER['HTTP_HOST']=='www.falv58rb.com'){
	?>
	<script>
		var _hmt = _hmt || [];
		(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?81017b10de168f9f1ac697a9b039db98";
		var s = document.getElementsByTagName("script")[0]; 
		s.parentNode.insertBefore(hm, s);
		})();
	</script>
	<?php
	}
	?>
</head>
<script>
var fromchannel = "<?php echo $fromchannel?>";
if(fromchannel == '')
	fromchannel = "<?php echo $word['from']?>";
recordlog("<?php echo $iipp?>",fromchannel,"<?php echo $ua?>","visitor","<?php echo $word['keyword']?>","<?php echo $page?>",'visit');


</script>
<body>
    <style>
        
    </style>

    <div class="all" id='app'>
        <div class="top">
            <div class="top_main">
                <div class="top_main_left">FALV <span class="shu"></span> 法驴</div>
                <div class="top_main_right">
                    <span class="dh">
                        <img src="/newPC/img/telephone_icon.png" alt="">
                    </span> 400-0183-693
                </div>
                <div class="top_main_m">
                    <div class="sy jianju">首页</div>
                    <a class="qyyh" href="http://www.7anb.com/">
                        企业用户
                    </a>
                </div>
            </div>
        </div>
        <div class="banner">
            <div class="banner-left">
                <div class="banner-lefta">法驴</div>
                <p class="banner-leftb">专业法律服务管家</p>
                <div style="font-size: 0">
                    <div class="banner-pull banner-pulla" @click="window.location.href='/Member/mIndex.html'">
                        <span class="banner-pull-text">法律服务</span>
                        <span class="banner-qr">
                            <img src="/newPC/img/QR Code_icon.png" alt="">
                        </span>
                        <div class="banner-er banner-era">
                            <img src="/newPC/img/falvfuwu.png" alt="">
                        </div>
                    </div>
                    <div class="banner-pull banner-pullb" @click="window.location.href='/h5/lawyerreg/quick_supplier.html'">
                        <span class="banner-pull-text">律师入驻</span>
                        <span class="banner-qr">
                            <img src="/newPC/img/QR Code_icon.png" alt="">
                        </span>
                        <div class="banner-er banner-erb">
                            <img src="/newPC/img/lvshiruzhu.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="banner-right">
                <img src="/newPC/img/bner.png" alt="">
            </div>
        </div>
        <div class="count">
            <div class="count-main">
                <div class="count-main-item">
                    <p class="count-main-b">{{num.pay_money_num}}<span class="count-main-m">人</span></p>
                    <div class="count-main-m count-main-m-fol">付费用户数</div>
                </div>
                <div class="count-main-shu"></div>
                <div class="count-main-item">
                    <p class="count-main-b">{{num.today_time_long}}<span class="count-main-m">分钟</span></p>
                    <div class="count-main-m count-main-m-fol">今日咨询时长</div>
                </div>
                <div class="count-main-shu"></div>
                <div class="count-main-item">
                    <p class="count-main-b">{{num.all_service_time}}<span class="count-main-m">分钟</span></p>
                    <div class="count-main-m count-main-m-fol">累计咨询时长</div>
                </div>
                <div class="count-main-shu"></div>
                <div class="count-main-item">
                    <p class="count-main-b">{{num.lawyer_num}}<span class="count-main-m">人</span></p>
                    <div class="count-main-m count-main-m-fol">平台律师数</div>
                </div>
            </div>
        </div>
        <div class="goup" id="tup">
            <div class="goup-item goup-itema" @click="window.location.href='/Member/mIndex.html'">
                <div class="goup-item-qr">
                    <img src="/newPC/img/QR Code_icon.png" alt="">
                </div>
                法律</br>
                服务
                <div class="goup-item-ord goup-item-orda">
                    <img src="/newPC/img/falvfuwu.png" alt="">
                </div>
            </div>
            <div class="goup-item goup-itemb" @click="window.location.href='/h5/lawyerreg/quick_supplier.html'">
                <div class="goup-item-qr">
                    <img src="/newPC/img/QR Code_icon.png" alt="">
                </div>
                律师</br>入驻
                <div class="goup-item-ord goup-item-ordb">
                    <img src="/newPC/img/lvshiruzhu.png" alt="">
                </div>
            </div>
            <div id='btn' class="gpup-sp">
                <div class="goup-item-up">
                    <!--<img src="/newPC/img/top_icon.png" alt="">-->
                </div>
            </div>
        </div>
         
        <div class="flfw">
            <div class="common-m">
                <div class="title-typea">
                    <div class="title-imga"></div>
                    法律服务
                    <div class="title-imgb"></div>
                </div>
                <div class="swp-main">
                    <div class="swp-zsq">
                        <div class="swp-zsq-item big" id="swpbtna">
                            <div class="swp-zsq-num">01</div>
                            <div class="swp-zsq-r">
                                <div class="swp-zsq-tt">不限时电话咨询</div>
                                <div class="swp-zsq-xian"></div>
                                <div class="swp-zsq-ft">单次通话不限时长，线上下单，等待律师电话回拨服务</div>
                            </div>
                        </div>
                        <div class="swp-zsq-item" id="swpbtnb">
                            <div class="swp-zsq-num">02</div>
                            <div class="swp-zsq-r">
                                <div class="swp-zsq-tt">计时电话咨询</div>
                                <div class="swp-zsq-xian"></div>
                                <div class="swp-zsq-ft">根据用户问题领域，实时电话咨询，律师极速响应，满意后付费</div>
                            </div>
                        </div>
                        <div class="swp-zsq-item" id="swpbtnc">
                            <div class="swp-zsq-num">03</div>
                            <div class="swp-zsq-r">
                                <div class="swp-zsq-tt">非标准类法律服务</div>
                                <div class="swp-zsq-xian"></div>
                                <div class="swp-zsq-ft">满足用户线下服务的场景，包含：诉讼代理，律师陪同，撰写文书、合同审阅等</div>
                            </div>
                        </div>
                    </div>
                    <div class="swp-main-phone">
                        <div class="swp-main-phonebox">
                            <div class="swiper-container">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <img src="/newPC/img/bner1.png" alt="">
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="/newPC/img/bner2.png" alt="">
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="/newPC/img/bner3.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swp-ljty" @click="gotop()">
                        立即体验
                        <span>
                                <img src="/newPC/img/ljty_icon.png" alt="">
                            </span>
                    </div>
                </div>
            </div>

        </div>
        <div class="spnr">
            <div class="common-m">
                <div class="title-typea">
                    <div class="title-imga"></div>
                    <p class="title-type-p">我们也在做视频内容投放</p>
                    <div class="title-type-sm">诚邀业界大咖助阵，深度剖析法律问题</div>
                    <div class="title-imgb"></div>
                </div>
                <ul class="sp-box">
                    <li class="sp-box-li">
                        <div class="sp-box-lg sp-box-hovea">
                            <div class="sp-box-imga">
                                <img src="/newPC/img/logo.png" alt="">
                            </div>
                            <div class="spnr-coverbox sp-box-cova" @click="window.open('http://v.qq.com/vplus/f479529d34d9ef857a828772ba0710bd/videos')">
                                <div class="spnr-coverbox-op"></div>
                                <div class="spnr-coverbox-t">
                                    查看更多
                                    <span class="spnr-coverbox-icon">
                                            <img src="/newPC/img/more_icon .png" alt="">
                                        </span>
                                </div>
                            </div>
                        </div>
                        <p class="sp-box-zi">腾讯视频</p>
                        <p class="sp-box-ft" style="text-align: center">中国领先的在线视频媒体平台</p>
                    </li>
                    <li class="sp-box-li">
                        <div class="sp-box-lg sp-box-hoveb">
                            <div class="sp-box-imgb">
                                <img src="/newPC/img/logo(1).png" alt="">
                            </div>
                            <div class="spnr-coverbox sp-box-covb">
                                <div class="spnr-coverbox-op"></div>
                                <div class="spnr-coverbox-t">
                                    查看更多
                                    <span class="spnr-coverbox-icon">
                                            <img src="/newPC/img/more_icon .png" alt="">
                                        </span>
                                </div>
                            </div>
                        </div>
                        <p class="sp-box-zi">安居客</p>
                        <p class="sp-box-ft">国内知名房地产信息服务平台，全房源信息网</p>
                    </li>
                    <li class="sp-box-li">
                        <div class="sp-box-lg sp-box-hovec">
                            <div class="sp-box-imgc">
                                <img src="/newPC/img/logo(2).png" alt="">
                            </div>
                            <div class="spnr-coverbox sp-box-covc" @click="window.open('https://i.snssdk.com/rogue/ugc/profile/?version_code=7.0.6&version_name=70006&device_platform=iphone&user_id=6813289870&media_id=6813857490&request_source=1&active_tab=dongtai&visit_user_id=6813289870&device_id=60873905790&iid=58314878821&app_name=news_article') ">
                                <div class="spnr-coverbox-op"></div>
                                <div class="spnr-coverbox-t">
                                    查看更多
                                    <span class="spnr-coverbox-icon">
                                            <img src="/newPC/img/more_icon .png" alt="">
                                        </span>
                                </div>
                            </div>
                        </div>
                        <p class="sp-box-zi">今日头条</p>
                        <p class="sp-box-ft">数据挖掘的推荐引擎产品，是国内移动互联网领域成长最快的产品服务之一</p>
                    </li>
                    <li class="sp-box-li">
                        <div class="sp-box-lg sp-box-hoved">
                            <div class="sp-box-imgd">
                                <img src="/newPC/img/logo(3).png" alt="">
                            </div>
                            <div class="spnr-coverbox sp-box-covd" @click="window.open('https://www.pearvideo.com/author_12066833?st=7')">
                                <div class="spnr-coverbox-op"></div>
                                <div class="spnr-coverbox-t">
                                    查看更多
                                    <span class="spnr-coverbox-icon">
                                            <img src="/newPC/img/more_icon .png" alt="">
                                        </span>
                                </div>
                            </div>
                        </div>
                        <p class="sp-box-zi">梨视频</p>
                        <p class="sp-box-ft" style="text-align: center">中国领先的资讯类短视频生产者</p>
                    </li>

                </ul>
            </div>

        </div>
        <div class="jszc">
            <div class="common-m">
                <div class="title-typea">
                    <div class="title-imga"></div>
                    技术支持
                    <div class="title-imgb"></div>
                </div>
                <div class="jszc-main">
                    <div class="jszc-img">
                        <img src="/newPC/img/inbetweening.png" alt="">
                    </div>
                    <div class="jszc-text">
                        <div class="jszc-text-item wow fadeIn" data-wow-duration="2s" data-wow-delay="0s">
                            <img src="/newPC/img/icon.png" alt="" class="jszc-icon">
                            <div class="jszc-text-div">订单智能派发解决方案</div>
                            <p class="jszc-text-p">法律大数据涵盖律师增长领域/地区/资历等多维度信息，结合用户的需求行为进行智能匹配，只为客户提供最合适的律师。</p>
                        </div>
                        <div class="jszc-text-item wow fadeIn" data-wow-duration="2s" data-wow-delay="0.6s">
                            <img src="/newPC/img/icon.png" alt="" class="jszc-icon">
                            <div class="jszc-text-div">用户隐私保护</div>
                            <p class="jszc-text-p">号码加密/传输加密/通信加密/服务加密视客户隐私为最高权限。</p>
                        </div>
                        <div class="jszc-text-item wow fadeIn" data-wow-duration="2s" data-wow-delay="1.2s">
                            <img src="/newPC/img/icon.png" alt="" class="jszc-icon">
                            <div class="jszc-text-div">数据安全</div>
                            <p class="jszc-text-p" style="border: none">与阿里/腾讯等数据机构深度技术合作，数据永不丢失/服务在线率99.99%。</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="mainpn">
            <div class="common-m">
                <div class="title-typea">
                    <div class="title-imga"></div>
                    <p class="title-type-p">主要战略合作伙伴</p>
                    <div class="title-type-sm">法驴正在为他们提供服务</div>
                    <div class="title-imgb"></div>
                </div>
                <div class="mainpn-futt">
                    <div class="mainpn-futt-ston"></div>
                    <span class="mainpn-futt-sp">银行</span>
                    <div class="mainpn-futt-ston"></div>
                    <span class="mainpn-futt-sp">保险</span>
                    <div class="mainpn-futt-ston"></div>
                    <span class="mainpn-futt-sp">互联网</span>
                </div>
                <ul class="mainpn-li">
                    <li>
                        <span>
                            <img src="/newPC/img/SPDBANKlogo .png" alt="">
                        </span>

                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/HUAONLINE_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/tianyi_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/CHINAMERCHANTSBANK_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/NCI_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/DingDing_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/zhongguoyz.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/CPIC_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/JDFinance_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/BankofShanghai_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/CHINALIFE_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/Lvmama_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/AGRICULTURALCHINA_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/TAIKANGLIFE_logo.png" alt="">
                        </span>
                    </li>
                    <li>
                        <span>
                            <img src="/newPC/img/BLACKMAGIC_logo.png" alt="">
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <div class="common-m">
                <div class="f-logo">
                    <img src="/newPC/img/falv_logo .png" alt="" style="border-radius: 3px;">
                    <p>法驴</p>
                </div>
                <div class="mainpn-futt footer-tr">
                    <span class="footer-tr-l">商务合作：zhangwei@falv58.com</span>
                    <span class="footer-tr-m">联系电话：400-0183-693</span>
                    <span class="footer-tr-r">公司地址：上海市静安区凤阳路659号3F</span>
                </div>
                <div class="footer-ban">
                    晓法网络科技（上海）有限公司沪ICP备18048606号
                </div>
            </div>
        </div>
    </div>
    <script src="/newPC/js/jquery-2.1.0.js"></script>
    <script src="/newPC/js/wow.js"></script>
    <script src="/newPC/js/swiper.min.js"></script>
    <script src="/newPC/js/vue.min.js"></script>
    <script type="text/javascript">
        $(document).scroll(function () {
            var scroH = $(document).scrollTop(); //滚动高度
            var viewH = $(window).height(); //可见高度 
            var contentH = $(document).height(); //内容高度

                  
            if (scroH > 0) { //距离顶部大于100px时
                $(".top").addClass("topshadow")      
            } 
            if (scroH == 0) {
                $(".top").removeClass("topshadow")      
            }

        })

        window.onload = function () {
            var obtn = document.getElementById('btn');
            var otup = document.getElementById('tup');
            var timer = null;
            var isTop = true;
            //获取页面的可视窗口高度
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

            //滚动条滚动时触发
            window.onscroll = function () {
                console.log()
                //在滚动的时候增加判断
                var osTop = document.documentElement.scrollTop || document.body.scrollTop; //特别注意这句，忘了的话很容易出错
                if (osTop >= clientHeight) {
                    otup.style.display = 'block';
                } else {
                    otup.style.display = 'none';
                }
                console.log(osTop, clientHeight)
                if (!isTop) {
                    clearInterval(timer);
                }
                isTop = false;
            };


            obtn.onclick = function () {

                //设置定时器
                timer = setInterval(function () {
                    //获取滚动条距离顶部的高度
                    var osTop = document.documentElement.scrollTop || document.body.scrollTop; //同时兼容了ie和Chrome浏览器

                    //减小的速度
                    var isSpeed = Math.floor(-osTop / 10);
                    document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed;
                    //console.log( osTop + isSpeed);

                    isTop = true;

                    //判断，然后清除定时器
                    if (osTop == 0) {
                        clearInterval(timer);
                    }
                }, 30);



            };
        }
        new WOW().init();

    </script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                num: {      
                },
            },
            created: function () {
                this.get()
            },
            mounted: function () {

            },
            methods: {
                gotop: function () {
                    timer = setInterval(function () {
                        //获取滚动条距离顶部的高度
                        var osTop = document.documentElement.scrollTop || document.body.scrollTop; //同时兼容了ie和Chrome浏览器

                        //减小的速度
                        var isSpeed = Math.floor(-osTop / 10);
                        document.documentElement.scrollTop = document.body.scrollTop = osTop +
                            isSpeed;
                        //console.log( osTop + isSpeed);

                        isTop = true;

                        //判断，然后清除定时器
                        if (osTop == 0) {
                            clearInterval(timer);
                        }
                    }, 30);
                },
                get: function () {
                    var _this = this
                    var ajax_url = "https://www.falv58.com";
                    if (window.location.host !== "www.falv58.com" && window.location.host !== "www.falv58app.com"  ) {
                        ajax_url = "http://mest.falv58.com";
                    }

                    $.ajax({
                        url: ajax_url + '/PC/IndexData/indexView.json',
                        type: "get",
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function (res) {
                            _this.num = res.data


                        }
                    })
                }
            }
        })
    </script>

    <script>
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            on: {
                slideChangeTransitionEnd: function () {
                    if (this.realIndex == "0") {
                        $('#swpbtna').addClass('big')
                        $('#swpbtnb').removeClass('big')
                        $('#swpbtnc').removeClass('big')
                    } else if (this.realIndex == "1") {
                        $('#swpbtnb').addClass('big')
                        $('#swpbtna').removeClass('big')
                        $('#swpbtnc').removeClass('big')
                    } else if (this.realIndex == "2") {
                        $('#swpbtnc').addClass('big')
                        $('#swpbtnb').removeClass('big')
                        $('#swpbtna').removeClass('big')
                    }
                },
            },

        })

        $('#swpbtna').click(function () {
            mySwiper.slideTo(0, 1000, false);
            $('#swpbtna').addClass('big')
            $('#swpbtnb').removeClass('big')
            $('#swpbtnc').removeClass('big')
        })
        $('#swpbtnb').click(function () {
            mySwiper.slideTo(1, 1000, false);
            $('#swpbtnb').addClass('big')
            $('#swpbtna').removeClass('big')
            $('#swpbtnc').removeClass('big')
        })
        $('#swpbtnc').click(function () {
            mySwiper.slideTo(2, 1000, false);
            $('#swpbtnc').addClass('big')
            $('#swpbtnb').removeClass('big')
            $('#swpbtna').removeClass('big')
        })
    </script>

    
	<script>
!(function(c,b,d,a){c[a]||(c[a]={});c[a].config={pid:"ip6vuhqbfi@9695f9654c72a69",imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",sendResource:true,useFmp:true};
with(b)with(body)with(insertBefore(createElement("script"),firstChild))setAttribute("crossorigin","",src=d)
})(window,document,"https://retcode.alicdn.com/retcode/bl.js","__bl");
</script>
	<!--<script src="http://www.falv58app.com/Public/common/im.js"></script>-->
	<!--cnzz统计代码
	<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1262056358'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1262056358%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>-->
	<script src="https://www.sobot.com/chat/frame/js/entrance.js?sysNum=72ff77ec0e1646f6945ff0aa05fbbe53" class="zhiCustomBtn" id="zhichiScript" data-args="manual=true"></script>
</body>

</html>