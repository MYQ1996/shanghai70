(function() {
    /*
     * 公共JS
     +----------------------------------------------------
     * @author joyang 2015.7.1
     */
    /*
     * 提供一些工具方法  与业务逻辑相关性较大
     */
    IU.namespace('IU.util');

    /**
     * 验证是否为空
     * @param str
     * @returns {boolean}
     */
    IU.util.validEmpty = function(str) {
        var newstr = $.trim(str);
        if (!newstr || typeof(newstr) == 'undefined') return false;
        return true;
    };
    /**
     * 验证邮箱
     * @param str
     * @returns {boolean}
     */
    IU.util.validEmail = function(str) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        return reg.test(str);
    };

    /**
     * 验证手机号
     * @param str
     * @returns {boolean}
     */
    IU.util.validMobile = function(str) {
        var reg = /^1\d{10}$/;
        return reg.test(str);
    };

    /**发送短信验证码计时**/
    IU.util.sendMsg = function(id, time) {
        var eventId = $(id);
        var flag = true;
        var timer = null;
        var tNow = time;
        eventId.click(function() {
            if (flag) {
                //AJAX请求
                var uMobile = $("#txtMobile").val();

                var start = $("#SetColor").val();
                if (!IU.util.validMobile(uMobile)) {
                    //IU.util.errorMessage('手机号为空或格式错误！');
                    $('.err_mobile').text('手机号为空或格式错误').show();
                    $('.err_login_msg').text('手机号为空或格式错误').show();
                    return false;
                }else{
                    $('.err_mobile').hide();
                }

                var uCode = $("input.imgcode_code").val();
                if (!IU.util.validEmpty(uCode) || uCode.length != 4) {
                    //alert('图形验证码为空或者格式错误！');
                    $('.err_imgcode').text('图形验证码为空或者格式错误').show();
                    $('.err_login_msg').text('图形验证码为空或者格式错误').show();
                    return false;
                }

                if (start == 1) {
                    setClass(eventId, 1, 'cxhq');
                } else {
                    setClass(eventId, 1, 'cxfs');
                    eventId.css('color', '#ff5000');
                }

                eventId.html(time + '秒重新获取');
                timer = setInterval(run, 1000);

                $.post('/member/get-sms-code', { uMobile: uMobile, uCode: uCode }, function(resp_data) {
                    if (resp_data.err == 0) {
                        eventId.css('color', '#b3b3b3');
                        //eventId.css('background','#ff5000');
                        //IU.util.errorMessage(resp_data.msg);
                        $('.err_imgcode').hide();
                        $('.err_login_msg').hide();
                    } else {
                        flag = true;
                        time = tNow;
                        if (start == 1) {
                            setClass(eventId, 2, 'cxhq');
                        } else {
                            eventId.css('color', '#ff5000');
                        }
                        eventId.html("获取验证码");
                        clearInterval(timer);
                        //IU.util.errorMessage(resp_data.msg);
                        $('.err_imgcode').text(resp_data.msg).show();
                        $('.err_login_msg').text(resp_data.msg).show();
                        $('.shuaxin').click();
                    }
                }, 'json');
            }
            flag = false;
        });

        function setClass(eventId, start, class_name) {
            if (start == 1) {
                eventId.addClass('cxhq');
            } else {
                eventId.removeClass('cxhq');
            }

        }

        function run() {
            var start = $("#SetColor").val();
            time--;
            eventId.html(time + '秒重新获取');
            if (time < 1) {
                flag = true;
                time = tNow;
                if (start == 1) {
                    setClass(eventId, 2, 'cxhq');
                } else {
                    //setClass(eventId, 2, 'cxfs');
                    eventId.css('color', '#ff5000');
                }
                eventId.css('color', '#ff5000');
                eventId.html("获取验证码");
                clearInterval(timer);
            }
        }
    };

    IU.util.errorMessage = function(error_str) {
        alert(error_str);
        return;
        var str = '<div class="tishi"><img src="http:pic.hiweixiu.com/images/mobile/v1.1/tishi.png" /><span>' + error_str + '</span></div>';
        $(".tishi").remove();
        $('body').append(str);
        $(".tishi").show();
        $(".tishi").fadeOut(3000);
    }

    /**ajax提交**/
    IU.util.myAjax = function(options) {
        $.ajax({
            url: options.url,
            dataType: options.dataType,
            type: options.type,
            data: options.data,
            cache: false,
            success: function(resp_data, resp_status) {
                options.callback(resp_data, resp_status);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (options.error) {
                    options.error(textStatus, errorThrown);
                } else {
                    console.log(textStatus + '|' + errorThrown);
                }
            }
        })
    };

    IU.util.init = function() {

    }

    /**
     * 刷新图形验证码
     */
    IU.util.reloadImageCode = function() {
        get_image_status = 1;
        //获取图形验证码
        // $.getJSON('/member/get-image-code', function(res) {
        //     if (res.err == 0) {
        //         image_loading = 0;
        //         $("input.imgcode_code").val('');
        //         $(".imgcode_img").attr('src', res.data);
        //     }
        //     get_image_status = 0;
        // });
    }
})();
/**位置上下互换**/

image_loading = 0;
var get_image_status = 0;
$(function() {
    IU.util.init();

    $('.v1-1tishi1').hide();

    //刷新图片
    IU.util.reloadImageCode();
    $("img.shuaxin").click(function() {
        if(image_loading == 1){
            return false;
        }
        image_loading = 1;
        IU.util.reloadImageCode();
        return false;
    });
});
