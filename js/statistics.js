/**
 * Created by wangting on 16/9/12.
 */

//缃戠珯鏁版嵁鏉ユ簮缁熻
//鑾峰彇url涓殑鍙傛暟
function getUrlParam(tommagic) {
    var reg = new RegExp("(^|&)" + tommagic + "=([^&]*)(&|$)"); //鏋勯€犱竴涓惈鏈夌洰鏍囧弬鏁扮殑姝ｅ垯琛ㄨ揪寮忓璞�
    var r = window.location.search.substr(1).match(reg);  //鍖归厤鐩爣鍙傛暟
    if (r != null) return unescape(r[2]); return ''; //杩斿洖鍙傛暟鍊�
}
var share = getUrlParam('tommagic');
var landUrl = window.location.href;
var referrer = document.referrer || "";
if (localStorage.landData2 == undefined) {
    localStorage.referrer = referrer;
    localStorage.tommagic = JSON.stringify(share);
    localStorage.landData2 = landUrl;
}


var _maq = _maq || [];
_maq.push(['_setAccount', 'shanxiuxia']);

(function () {
    var ma = document.createElement('script'); ma.type = 'text/javascript'; ma.async = true;
    ma.src = ('https:' == document.location.protocol ? 'https://api.shanxiuxia.com/Public/js' : 'http://api.shanxiuxia.com/Public/js') + '/ss.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ma, s);
})();
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?0f97df3d9385bdfb444c289f439b4fa4";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?a357d0a0f000b2ba1ff02798e38719d4";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?a8defa81c3382a223207fad0caf27ab8";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cspan id='cnzz_stat_icon_1264380914'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1264380914' type='text/javascript'%3E%3C/script%3E"));