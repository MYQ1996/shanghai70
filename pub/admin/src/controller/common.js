/**

 @Name：layuiAdmin 公共业务
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：GPL-2
    
 */
 
layui.define(function(exports){
  var $ = layui.$
  ,layer = layui.layer
  ,laytpl = layui.laytpl
  ,setter = layui.setter
  ,view = layui.view
  ,admin = layui.admin
  
  //公共业务的逻辑处理可以写在此处，切换任何页面都会执行
  //……
  
  
  
  //退出
  admin.events.logout = function(){
    //执行退出接口
    admin.req({
      url: './json/user/logout.js'
      ,type: 'get'
      ,data: {}
      ,done: function(res){ //这里要说明一下：done 是只有 response 的 code 正常才会执行。而 succese 则是只要 http 为 200 就会执行
        
        //清空本地记录的 token，并跳转到登入页
        admin.exit();
      }
    });
  };
  
  
  //拦截器
  var interceptor = (function(){
    //你在每次登入页面成功后，会在 localStorage 的本地表中写入一个字段。如： access_token （名称可以在 config.js 自定义）
    //拦截器判断没有 access_token 时，则会跳转到登入页
    //尽管可以通过伪造一个假的 access_token 绕过视图层的拦截，但在请求接口时，会自动带上 access_token，服务端需再次做一层校验
    
    var local = layui.data(setter.tableName);
    
    
    if(!local[setter.request.tokenName]){
      
      //这里为了方便线上用户演示，我们就不开启强制跳转了
      //location.hash = '/user/login'; //跳转到登入页
      
    }
    
  }());
  
  
  
  
  
  //对外暴露的接口
  exports('common', {});
});