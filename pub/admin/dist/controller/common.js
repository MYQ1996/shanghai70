/** layuiAdmin-v1.0.0-beta5 GPL-v2 License By http://www.layui.com/admin/ */
 ;layui.define(function(a){var e=(layui.$,layui.layer,layui.laytpl,layui.setter),t=(layui.view,layui.admin);t.events.logout=function(){t.req({url:"./json/user/logout.js",type:"get",data:{},done:function(a){t.exit()}})};(function(){var a=layui.data(e.tableName);!a[e.request.tokenName]})();a("common",{})});