/**
 * Created by wangting on 16/10/9.
 */
//banner
function banner() {
    var bn_id = 0;
    var bn_id2 = 1;
    var speed33 = 5000;
    var qhjg = 1;
    var MyMar33;
    $("#banner .d1").hide();
    $("#banner .d1").eq(0).fadeIn("slow");
    if ($("#banner .d1").length > 1) {
        $("#banner_id li").eq(0).addClass("nuw");
        function Marquee33() {
            bn_id2 = bn_id + 1;
            if (bn_id2 > $("#banner .d1").length - 1) {
                bn_id2 = 0;
            }
            $("#banner .d1").eq(bn_id).css("z-index", "2");
            $("#banner .d1").eq(bn_id2).css("z-index", "1");
            $("#banner .d1").eq(bn_id2).show();
            $("#banner .d1").eq(bn_id).fadeOut("slow");
            $("#banner_id li").removeClass("nuw");
            $("#banner_id li").eq(bn_id2).addClass("nuw");
            bn_id = bn_id2;
        };

        MyMar33 = setInterval(Marquee33, speed33);

        $("#banner_id li").click(function () {
            var bn_id3 = $("#banner_id li").index(this);
            if (bn_id3 != bn_id && qhjg == 1) {
                qhjg = 0;
                $("#banner .d1").eq(bn_id).css("z-index", "2");
                $("#banner .d1").eq(bn_id3).css("z-index", "1");
                $("#banner .d1").eq(bn_id3).show();
                $("#banner .d1").eq(bn_id).fadeOut("slow", function () { qhjg = 1; });
                $("#banner_id li").removeClass("nuw");
                $("#banner_id li").eq(bn_id3).addClass("nuw");
                bn_id = bn_id3;
            }
        })
        $("#banner_id").hover(
            function () {
                clearInterval(MyMar33);
            }
            ,
            function () {
                MyMar33 = setInterval(Marquee33, speed33);
            }
        )
    }
    else {
        $("#banner_id").hide();
    }
}

banner();

//鍝佺墝鍒囨崲
$(function () {
    $('#choice1').show();
    $('#choice2').hide();
    $('#choice3').hide();
    $('#choice4').hide();
    $('#choice5').hide();
    $('#item1').click(function () {
        $('#choice1').show();
        $('#choice2').hide();
        $('#choice3').hide();
        $('#choice4').hide();
        $('#choice5').hide();
    });
    $('#item2').click(function () {
        $('#choice1').hide();
        $('#choice2').show();
        $('#choice3').hide();
        $('#choice4').hide();
        $('#choice5').hide();
    });
    $('#item3').click(function () {
        $('#choice1').hide();
        $('#choice2').hide();
        $('#choice3').show();
        $('#choice4').hide();
        $('#choice5').hide();
    });
    $('#item4').click(function () {
        $('#choice1').hide();
        $('#choice2').hide();
        $('#choice3').hide();
        $('#choice4').show();
        $('#choice5').hide();
    });
    $('#item5').click(function () {
        $('#choice1').hide();
        $('#choice2').hide();
        $('#choice3').hide();
        $('#choice4').hide();
        $('#choice5').show();
    })
});



function kefu() {
    window.open('http://a1.7x24cc.com/phone_webChat.html?accountId=N000000008575&chatId=hzws-fed46270-99b9-11e6-b69c-21576bafa257');

}


$('#weixinBtn').click(function () {
    $("#weixin").toggle();
});




$.ajax({
    type: 'POST',
    dataType: 'json',
    url: url + '/api/order/countOrder',
    success: function (data, status) {
        if (status == "success" && data.code == 200) {
            $('.timer').countTo({ from: 400000, to: data.data.num });
        }
    }
});




$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $("#topcontrol").fadeIn();
            $(".toolbar").fadeIn();
        }
        else {
            $("#topcontrol").fadeOut();
            $(".toolbar").fadeOut();
        }
    });
    $("#topcontrol").click(function () {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    });
    $("#woyaofankui").click(function () {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    });
});

var url2 = window.location.href;
if (url2.indexOf('shanxiuxia.com') >= 0) {
    $('.companyNumber').html('鏉窞缁存椂绉戞妧鏈夐檺鍏徃 娴橧CP澶�15007035鍙�-2');
} else if (url2.indexOf('weadoc.com') >= 0) {
    $('.companyNumber').html('鏉窞缁存椂绉戞妧鏈夐檺鍏徃 娴橧CP澶�15007035鍙�-1');
} else {
    $('.companyNumber').html('鏉窞缁存椂绉戞妧鏈夐檺鍏徃 娴橧CP澶�15007035鍙�-1');
}









