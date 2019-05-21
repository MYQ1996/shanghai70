//鑾峰彇甯哥敤鏁呴殰
localStorage.removeItem("comBtn");
$.ajax({
    type: 'get',
    dataType: 'json',
    url: url + '/Api/ShortcutOrder/getPhonecommon',
    success: function (data, status) {
        if (status == "success" && data.code == 200) {
            var comData = data.data;
            for (var i = 0; i < 9; i++) {
                $(".comm-box").append(`
            		<div class="comm-list" 
            			data-id="`+ comData[i].phone_id + `" 
            			data-mal="`+ comData[i].malfunction + `"
            			data-name="`+ comData[i].name + `"
            			data-price="`+ comData[i].price_reference + `"
            			data-malId="`+ comData[i].id + `" 
            			data-colorId="`+ comData[i].color_id + `"
            			data-color="`+ comData[i].color + `"
            		>
						<p class="com-phone">`+ comData[i].name + `</p>
						<p class="com-mal">`+ comData[i].malfunction + `</p>
						<p class="com-bottom">
							<span class="price-box">
								<span class="comPrice-item">￥</span><span class="com-price">`+ comData[i].price_reference + `</span>
							</span>
							<span class="com-fix">立即下单 ></span>
						</p>
					</div>           		
            	`)

            }
            $(".comm-box").append(`<div class="comm-list2" >更多故障维修></div>`)
            $(".comm-list").bind('click', function () {
                var Index = $(".comm-list").index($(this));
                var idx = $(".comm-list").eq(Index).attr("data-id");
                var alias = $(".comm-list").eq(Index).attr("data-name");
                var malname = $(".comm-list").eq(Index).attr("data-mal");
                var malPrice = $(".comm-list").eq(Index).attr("data-price");
                var malId = $(".comm-list").eq(Index).attr("data-malid");
                var selecteddata = { "data": idx, "value": alias };
                onSelect(selecteddata, function (data) {
                    renderSelectedData(data, selecteddata);
                });
                localStorage.comBtn = malId;
                localStorage.comname = malname;
                $("#break").val(malname);
                $("#gz").text(malname);
                $("#jg").text(malPrice);
                $('html,body').animate({ scrollTop: $('#demo1').offset().top }, 800);
                getcolor(idx);
            })
            $(".comm-list2").bind("click", function () {
                $('html,body').animate({ scrollTop: $('#brand-box').offset().top }, 800);
            })

        }
    }
});
$.ajax({
    type: "get",
    url: url + "/api/content/banner/type/1",
    dataType: "json",
    success: function (data, status) {
        // console.log(data,status);
        // if (data.code == 200 && status == "success") {
            // for (var i = 0; i < data.data.rows.length; i++) {
            //     var jumpUrl;
            //     var jump = data.data.rows[i].url;
            //     if (jump == "") {
            //         jumpUrl = "#"
            //     } else {
            //         jumpUrl = jump;
            //     }
            //     $(".banner-box").append('<a href="' + jumpUrl + '" class="d1 banner-list" style="background:url(' + data.data.rows[i].image_url + ') center no-repeat;"></a>')
            // }
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
                        },
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
        // }
    }
});
var obj = {};
//var countries = {}
$.ajax({
    type: 'get',
    dataType: 'json',
    url: url + '/api/PhoneType/brandPhone',
    success: function (data, status) {
        if (status == "success" && data.code == 200) {
            for (var i = 0; i < data.data.length; i++) {
                obj[data.data[i].alias] = data.data[i].id;
            }
            var countriesArray = $.map(obj, function (value, key) { return { value: key, data: value }; });
            $('#autocomplete-ajax').autocomplete({
                lookup: countriesArray,
                onSelect: onSelect
            });

        }
    }
});

var breakData = [];
var data1 = [];

function onSelect(suggestion, callback) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url + '/api/PhoneType/getPhoneInfo',
        data: {
            id: suggestion.data
        },
        success: function (data, status) {
            if (data.code != 200) return;
            if (callback) callback(data);
            else renderSelectedData(data, suggestion);
            data1 = data;

            $("#one-left").empty();
            $("#one-left").prepend('<img class="model-pic" src="' + data.data.img + '">' + '<p class="model-text">' + data.data.name + '</p>');
            var isFirst = false;
            $("#modelColor").empty();
            for (var k = 0; k < data.data.color.length; k++) {
                var colorData = data.data.color[k];
                colorData.name = "'" + colorData.name + "'";
                if (isFirst == false) {
                    isFirst = true;
                    $("#modelColor").append('<button id="color" data-color="' + colorData.color_id + '" class="color-btn" title="' + colorData.name + '" style="background-color:' + colorData.code + ' " type="button" data-id="' + k + '" onclick="colorButton(' + k + ');datashopcolor(' + colorData.name + ');datacolor(' + colorData.color_id + ');colorId(' + colorData.color_id + ')"></button>');
                } else {
                    $("#modelColor").append('<button id="color" data-color="' + colorData.color_id + '" class="color-btn" title="' + colorData.name + '" style="background-color:' + colorData.code + ' " type="button" data-id="' + k + '" onclick="colorButton(' + k + ');datashopcolor(' + colorData.name + ');datacolor(' + colorData.color_id + ');colorId(' + colorData.color_id + ')"></button>');
                }
            }
            var isFirst = false;
            $("#break-list").empty();
            for (var i = 0; i < data.data.malfunction.length; i++) {
                var breakData = data.data.malfunction[i];
                if (isFirst == false) {
                    isFirst = true;
                    $("#break-list").append('<li class="break-bg" data-id="' + i + '"onclick="brakButton(' + i + ');">' + breakData.name + '<span>￥' + breakData.reference_price + '</span></li>');
                } else {
                    $("#break-list").append('<li class="break-bg" data-id="' + i + '"onclick="brakButton(' + i + ');">' + breakData.name + '<span>￥' + breakData.reference_price + '</span></li>');
                }
            }
        }
    });
    getcolor(suggestion.data);
}
function colorId(k) {
    $("#color_list").find("option[data-id=" + k + "]").attr("selected", true);
}
function datashopcolor(shopcolor) {
    localStorage.shopcolors = shopcolor;
    $("#ys").text(localStorage.shopcolors);
}
localStorage.oDatacolor = 0;
function datacolor(a) {
    localStorage.oDatacolor = a;
}
function colorButton(k) {
    /*$("[data-id=0]").removeClass("colorChoice");
    $("[data-id=1]").removeClass("colorChoice");
    $("[data-id=2]").removeClass("colorChoice");
    $("[data-id=3]").removeClass("colorChoice");
    $("[data-id="+k+"]").removeClass("colorChoice");*/
    $(".color-btn").removeClass('colorChoice');
    $("[data-id=" + k + "]").addClass("colorChoice");
}

function brakButton(k) {
    // $(".break-bg").attr("style", "background:url('image/break-bg1.png') no-repeat;");
    // $(".break-bg").attr("width", "415px;");
    // $(".break-bg").attr("height", "55px;");
   
    // document.getElementById('.break-bg').eq(k).style.backgroundImage;
    var avatar = $('.break-bg').eq(k).css("backgroundImage");
    avatar = avatar.split("(")[1].split(")")[0];
    tu = avatar.substr(avatar.length - 13);
    // alert(tu);

    if (tu=='break_bg.png"') {
        $(".break-bg").eq(k).attr("style", "background:url('image/break-bg1.png') no-repeat;background-size:400px 55px;");
    }else{
        $(".break-bg").eq(k).attr("style", "background:url('image/break_bg.png') no-repeat;background-size:400px 55px;");
    }

    $("#break").val(k);
    breakError = k;
    selectedBreakErrorData = breakErrorData[breakError];
   
    var domdiv = document.getElementById('data-id'+k);
    
    $("#jg").text("￥" + selectedBreakErrorData.reference_price);
    $("#gz").text(selectedBreakErrorData.name);

    //console.log(data1.data.malfunction);
    for (var i = 0; i < data1.data.malfunction.length; i++) {
        $("#break-list [data-id=" + i + "]").css("background-image", "");
    }
    $("#break-list [data-id=" + k + "]").css("background-image", "url(images/break-bg1.png)");
}

$('.btn').click(function () {
    if (localStorage.oDatacolor == 0) {
        $("#color-text").show();
    }
    else {
        $('html,body').animate({
            scrollTop: $('#demo1').offset().top
        }, 800);
    }
});

//$(".sure-btn").click(function(){
//	
//})
//鐐瑰嚮闅愯棌鏄剧ず

$("#show-btn").click(function () {
    $("#page-one").hide();
    $("#page-two").show();
});

$("#two-submit").click(function () {
    $("#page-one").show();
    $("#page-two").hide();
    var idx = $(".model-btn-c").data("id");
    var mData = secondList[idx];
    var selecteddata = { "data": mData.id, "value": mData.alias };
    onSelect(selecteddata, function (data) {
        renderSelectedData(data, selecteddata);
    });
    getcolor(mData.id);
});
$("#return").click(function () {
    $("#page-two").hide();
    $("#page-one").show();
})

//鑾峰彇鍝佺墝
var firstList = [];
function getPhoneType() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: url + '/api/PhoneType/activity',
        success: function (data, status) {
            if (status == "success" && data.code == 200) {
                firstList = data.data;
                var isFirst = false;
                for (var i = 0; i < data.data.length; i++) {
                    var brandData = data.data[i];
                    if (i === 0) {
                        //榛樿绗竴涓搧鐗岀殑鏁版嵁鏄剧ず
                        brandClickButton(brandData.id);
                    }
                    if (isFirst == false) {
                        isFirst = true;
                        $("#two-brand").append('<li onclick="brandClickButton(' + brandData.id + ');brandChangeButton(' + i + ')">' + '<img class="brand-pic" data-id="' + i + '" src="' + brandData.img1 + '">' + '<p class="brand-name">' + brandData.name + '</p></li>');
                    } else {
                        $("#two-brand").append('<li onclick="brandClickButton(' + brandData.id + ');brandChangeButton(' + i + ')">' + '<img class="brand-pic" data-id="' + i + '" src="' + brandData.img2 + '">' + '<p class="brand-name">' + brandData.name + '</p></li>');
                    }
                }
            }
        }
    });

}
//涓婇棬缁翠慨鐪佸競鍖哄湴鍧€璇锋眰
var areaList = [];
var cityList = [];
$.ajax({
    type: 'get',
    dataType: 'json',
    url: url + '/api/Address/doorAddress',
    success: function (data, status) {
        if (status == "success" && data.code == 200) {
            $.each(data.data, function (id, value) {
                areaList.push(value);
            });
            renderProvince();
        }
    }
});

function renderProvince() {
    $('#provinceOne').empty();
    for (var i = 0; i < areaList.length; i++) {
        var value = areaList[i];
        $('#provinceOne').append($('<option>', {
            value: value.id,
            text: value.name
        }));
    }
    renderCity(areaList[0]);
}

function renderCity(area) {
    cityList = area.city;
    $('#cityOne').empty();

    for (var i = 0; i < cityList.length; i++) {
        var city = cityList[i];
        $("#cityOne").append($('<option>', {
            value: city.id,
            text: city.name
        }));
    }

    var cityArea = [];
    $.each(cityList[0].area, function (id, value) {
        cityArea.push(value);
    });

    renderArea(cityArea);
}

function renderArea(area) {
    $('#areaOne').empty();
    for (var i = 0; i < area.length; i++) {
        var value = area[i];
        $('#areaOne').append($('<option>', {
            value: value.id,
            text: value.name
        }));
    }
}

$('#provinceOne').change(function () {
    var currentValue = $(this).val();
    //  localStorage.province = currentValue;
    for (var i = 0; i < areaList.length; i++) {
        var value = areaList[i];
        if (currentValue == value.id) {
            renderCity(value);
            break;
        }
    }
});

$("#cityOne").change(function () {
    var currentCity = $(this).val();
    //  localStorage.city = currentCity;
    for (var i = 0; i < cityList.length; i++) {
        var city = cityList[i];
        if (currentCity == city.id) {
            var cityArea = [];
            $.each(city.area, function (id, value) {
                cityArea.push(value);
            });
            renderArea(cityArea);
            break;
        }
    }
});

//鑾峰彇閭瘎鍦板潃
var areaList2 = [];
var cityList2 = [];
$.ajax({
    type: 'get',
    dataType: 'json',
    url: url + '/api/Address/allAddress',
    success: function (data, status) {
        if (status == "success" && data.code == 200) {
            $.each(data.data, function (id, value) {
                areaList2.push(value);
            });
            renderProvince2();
        }
    }
});

function renderProvince2() {
    $('#province').empty();
    for (var i = 0; i < areaList2.length; i++) {
        var value = areaList2[i];
        $('#province').append($('<option>', {
            value: value.id,
            text: value.name
        }));
    }
    renderCity2(areaList2[0]);
}

function renderCity2(area) {
    cityList2 = area.city;
    $('#city').empty();
    for (var i = 0; i < cityList2.length; i++) {
        var city = cityList2[i];
        $("#city").append($('<option>', {
            value: city.id,
            text: city.name
        }));
    }

    var cityArea = [];
    $.each(cityList2[0].area, function (id, value) {
        cityArea.push(value);
    });

    renderArea2(cityArea);
}

function renderArea2(area) {
    $('#areap').empty();
    for (var i = 0; i < area.length; i++) {
        var value = area[i];
        $('#areap').append($('<option>', {
            value: value.id,
            text: value.name
        }));
    }
}

$('#province').change(function () {
    var currentValue = $(this).val();
    //  localStorage.province = currentValue;
    for (var i = 0; i < areaList2.length; i++) {
        var value = areaList2[i];
        if (currentValue == value.id) {
            renderCity2(value);
            break;
        }
    }
});

$("#city").change(function () {
    var currentCity = $(this).val();
    //  localStorage.city = currentCity;
    for (var i = 0; i < cityList2.length; i++) {
        var city = cityList2[i];
        if (currentCity == city.id) {
            var cityArea = [];
            $.each(city.area, function (id, value) {
                cityArea.push(value);
            });
            renderArea2(cityArea);
            break;
        }
    }
});
/*$("#areaOne").change(function(){
	localStorage.qu = $(this).val();
})*/
////鑾峰彇鍝佺墝鏇存敼鍥剧墖
function brandChangeButton(i) {
    var personData = firstList[i];
    $("[data-id=0]").attr("src", firstList[0].img2);
    $("[data-id=1]").attr("src", firstList[1].img2);
    $("[data-id=2]").attr("src", firstList[2].img2);
    $("[data-id=3]").attr("src", firstList[3].img2);
    $("[data-id=4]").attr("src", firstList[4].img2);
    $("[data-id=5]").attr("src", firstList[5].img2);
    $("[data-id=6]").attr("src", firstList[6].img2);
    $("[data-id=" + i + "]").attr("src", personData.img1);
}

//鑾峰彇鏈哄瀷 棰滆壊 鐑棬鏁呴殰
var secondList = [];
function brandClickButton(id) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url + '/api/PhoneType/pattern',
        data: {
            id: id
        },
        success: function (data, status) {
            secondList = data.data;
            var isFirst = false;
            if (status == "success" && data.code == 200) {
                $("#modelPhone").empty();
                $("#modelPad").empty();
                for (var j = 0; j < data.data.length; j++) {
                    var phoneData = data.data[j];
                    if (phoneData.category_id == "1") {
                        if (isFirst == false) {
                            isFirst = true;
                            $("#modelPhone").append('<button type="button" class="model-btn model-btn-c" data-id="' + j + '" onclick="phoneClickButton(' + j + ')">' + phoneData.alias + '</button>');
                        } else {
                            $("#modelPhone").append('<button type="button" class="model-btn" data-id="' + j + '" onclick="phoneClickButton(' + j + ')">' + phoneData.alias + '</button>');
                        }
                    } else if (phoneData.category_id == "2") {
                        $("#modelPad").append('<button type="button" class="model-btn" data-id="' + j + '" onclick="ipadClickButton(' + j + ')">' + phoneData.alias + '</button>');
                    }
                }
            }
        }
    });
}

function phoneClickButton(j) {
    $("#modelPad button").removeClass("model-btn-c");
    for (var i = 0; i < secondList.length; i++) {
        $("#modelPhone button").removeClass("model-btn-c");
    }
    $("#modelPhone [data-id=" + j + "]").addClass("model-btn-c");
}

function ipadClickButton(j) {
    $("#modelPhone button").removeClass("model-btn-c");
    for (var i = 0; i < secondList.length; i++) {
        $("#modelPad button").removeClass("model-btn-c");
    }
    $("#modelPad [data-id=" + j + "]").addClass("model-btn-c");
}

//閭瘎鍦板潃閫夋嫨

//閫夋嫨鍒囨崲
localStorage.cat = 1;
$("#way").change(function () {
    if ($("#way").val() == "鍒板簵缁翠慨") {
        $(".mode-name2").text("鎮ㄧ殑鍦板潃");
        $("#alladress").show();
        $("#homeadress").hide();
        localStorage.cat = 2;
        $("#imei").hide();
        $("#invoicebox").hide();
        $(".lg").hide();
        $(".branch").show();
        $("#centerDetails").show();
    } else if ($("#way").val() == "閭瘎缁翠慨") {
        $(".mode-name2").text("鍥炲瘎鍦板潃");
        $("#alladress").show();
        $("#homeadress").hide();
        localStorage.cat = 2;
        $("#address").show();
        $("#imei").show();
        $("#invoicebox").show();
        $(".branch").show();
        $(".lg").hide();
        $("#centerDetails").show();
    } else if ($("#way").val() == "涓婇棬缁翠慨") {
        $(".mode-name2").text("鎮ㄧ殑鍦板潃");
        $("#alladress").hide();
        $("#homeadress").show();
        localStorage.cat = 1;
        $(".branch").hide();
        $(".centerDetails").hide();
        $("#imei").hide();
        $("#invoicebox").hide();
        $(".lg").show();
    }
})

//鍙戠エ鎶ご鐨勯殣钘忓拰鏄剧ず

$("#invoice").change(function () {
    $("#invoice2").attr("checked", false);
    $("#titleFixTips").hide();
    var check = $(this).is(":checked");
    if (check) {
        $("#invoiceTitle").show();
        localStorage.invoice = 1;
        localStorage.is_personal = 1;
    } else {
        $("#invoiceTitle").hide();
        localStorage.invoice = 0;
        localStorage.removeItem("is_personal");
    }
});
$("#invoice2").change(function () {
    $("#invoice").attr("checked", false);
    $("#titleFixTips").hide();
    var check2 = $(this).is(":checked");
    if (check2) {
        $(".invoice-box").show();
        $('.prompy-btn').click(function () {
            $(".invoice-box").hide();
        })
        $("#invoiceTitle").show();
        localStorage.invoice = 1;
        localStorage.is_personal = 2;
    } else {
        $("#invoiceTitle").hide();
        localStorage.invoice = 0;
        localStorage.removeItem("is_personal");
    }
});

//閭瘎鍦板潃閮ㄥ垎闂ㄥ簵鍦板潃鑾峰彇
var servicecenter = [];
$.ajax({
    type: 'POST',
    dataType: 'json',
    url: url + '/api/Address/mailAddress',
    success: function (data, status) {
        if (status == "success" && data.code == 200) {
            servicecenter = data.data;
            for (var c = 0; c < data.data.length; c++) {
                var centerData = data.data[c];
                if (c == 0) {
                    $("#centerDetails").append(' <p>' +
                        '<span  class="mailadress">閭瘎鍦板潃:' + centerData.address + '</span>' +
                        //'<span>'+centerData.receiver+'</span><br>' +
                        '<span>鑱旂郴鐢佃瘽:' + centerData.phone + '</span></p>')
                    localStorage.dcaddress = $(".mailadress").text();
                }
                $("#provinceService").append($('<option>', {
                    value: centerData.id,
                    text: centerData.name,
                    city: centerData.city
                }));
            }
        }
    }
});

$('#provinceService').change(function () {
    var serviceValue = $(this).val();
    $('#centerDetails').empty();
    for (var i = 0; i < servicecenter.length; i++) {
        var value = servicecenter[i];
        if (serviceValue == value.id) {
            $("#centerDetails").append(' <p>' +
                '<span class="mailadress">閭瘎鍦板潃:' + value.address + '</span>' +
                //'<span>'+value.receiver+'</span><br>' +
                '<span>鑱旂郴鐢佃瘽:' + value.phone + '</span></p>')
            localStorage.dcaddress = $(".mailadress").text();
            break;
        }
    }
});

//鍔ㄦ€�
$.ajax({
    type: 'POST',
    dataType: 'json',
    url: url + '/api/Content/rows',
    data: {
        "page": 1
    },
    success: function (data, status) {
        if (status == "success" && data.code == 200) {
            var dataNews = data.data.rows;
            for (var i = 0; i < 4; i++) {
                $(".newlist").append('<span class="newitem" onclick="newsjump(' + dataNews[i].id + ');"><img class="listL" src="' + dataNews[i].cover_img + '"><div class="listR"><p class="rtitle">' + dataNews[i].title + '</p><p class="rsubtitle">' + dataNews[i].introduction + '</p></div></span>')
            }
        }
    }
});
function newsjump(id) {
    window.location.href = "http://weadoc.com/articleList.html?id=" + id + "";
}
//搴曢儴鍒楄〃鏁版嵁鑾峰彇
var brandData = [];
var breakErrorData = [];
var getPhoneData = [];
var getcolorData = [];
var brand = 0;
var selectedBrandData = null;
var phone = 0;
var selectedPhoneData = null;
var breakError = 0;
var selectedBreakErrorData = null;

function getPhoneBrand(callback) {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: url + '/api/PhoneType/activity',
        success: function (data, status) {
            if (status == "success" && data.code == 200) {
                brandData = data.data;
                for (var i = 0; i < brandData.length; i++) {
                    var nameData = brandData[i];
                    $("#brand").append('<option value="' + i + '">' + nameData.name + '</option>');
                }
                callback(brandData);
            }
        }
    });
}

getPhoneBrand(function () {
    getPhoneType();
    var defaultSelected = { "data": "32", "value": "iPhone 6" };
    onSelect(defaultSelected, function (data) {
        renderSelectedData(data, defaultSelected);
    });

    //getphone(brand,function(name){
    //    return name == defaultSelected.value;
    //},function(){
    //    getBreakData();
    //    onSelect(defaultSelected,function(data){
    //        renderSelectedData(data,defaultSelected);
    //    });
    //});

});

function renderSelectedData(data, selected) {
    for (var i = 0; i < firstList.length; i++) {
        var item = firstList[i];
        if (data.data.brand == "iPhone") {
            data.data.brand = "鑻规灉";
        }
        if (item.name == data.data.brand) {
            brandClickButton(item.id);
            brand = i;
            selectedBrandData = brandData[i];
            $("#brand").val(brand);
            getphone(brand, function (name) {
                return selectedBrandData.name == name;
            }, function (data) {
                for (var j = 0; j < data.length; j++) {
                    var thephone = data[j];
                    if (thephone.alias == selected.value) {
                        phone = j;
                        $("#model").val(phone);
                        selectedPhoneData = data[j];
                        getBreakData(selectedPhoneData.id);
                        $("#sj").text(selectedPhoneData.alias);
                        break;
                    }
                }
            });
            break;
        }
    }
}

$("#brand").change(function () {
    brand = $(this).val();
    selectedBrandData = brandData[brand];
    getphone(brand, function (name) {
        return false;
    }, function (data) {
        phone = 0;
        selectedPhoneData = data[0];
        getBreakData(selectedPhoneData.id);
        $("#sj").text(selectedPhoneData.alias);
    });
});
$("#model").change(function () {
    color = $("#model option:selected").attr("data-id");
    localStorage.color = color;
    phone = $(this).val();
    selectedPhoneData = getPhoneData[phone];
    getBreakData(selectedPhoneData.id);
    $("#sj").text(selectedPhoneData.alias);
    getcolor(color);
    //	$("#colorbox").css({display:'block'});
});
$("#color_list").change(function () {
    localStorage.shopcolors = $("#color_list").val()
    localStorage.oDatacolor = $("#color_list option:selected").attr("data-id");
    $("#ys").text(localStorage.shopcolors)
})
getcolor(9);
function getcolor(color) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url + '/api/PhoneType/malfunction',
        data: {
            id: color
        },
        success: function (data, status) {
            var colorlist = data.data.color;
            $("#ys").html(colorlist[0].name);
            var str = '';
            for (var i in colorlist) {
                str += '<option data-id="' + colorlist[i].color_id + '">' + colorlist[i].name + '</option>';
            }
            $("#color_list").html(str);
            localStorage.oDatacolor = colorlist[0].color_id;
        }
    });
}

$("#break").change(function () {
    breakError = $(this).val();
    selectedBreakErrorData = breakErrorData[breakError];
    localStorage.breakId = breakError;
    $("#jg").text("￥" + selectedBreakErrorData.reference_price);
    $("#gz").text(selectedBreakErrorData.name);
});

function getphone(brandIndex, callback, finish) {
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: url + '/api/PhoneType/getphone',
        data: {
            id: brandData[brandIndex].id
        },
        success: function (data, status) {
            if (status == "success" && data.code == 200) {
                $("#model").empty();
                var name = brandData[brandIndex].name;
                getPhoneData = data.data.filter(function (item) {
                    if (item.brand == "iPhone") {
                        item.brand = "鑻规灉";
                    }
                    return item.brand == name;
                });
                /*for(var i = 0;i<data.data.length;i++){
                	var list = data.data.[i];
                	console.log(list)
                }*/
                for (var i = 0; i < getPhoneData.length; i++) {
                    var nameData = getPhoneData[i];
                    if (callback(nameData.alias)) {
                        selectedPhoneData = nameData;
                        getBreakData(selectedPhoneData.id);

                        $("#model").append('<option data-id="' + nameData.id + '"  value="' + i + '" selected>' + nameData.alias + '</option>');
                    } else {
                        $("#model").append('<option  data-id="' + nameData.id + '" value="' + i + '">' + nameData.alias + '</option>');
                    }
                }
                if (finish) finish(getPhoneData);
            }
        }
    });
}

function getBreakData(id) {
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: url + '/api/PhoneType/malfunction',
        data: {
            id: id
        },
        success: function (data, status) {
            if (status == "success" && data.code == 200) {
                breakErrorData = data.data.malfunction;
                selectedBreakErrorData = breakErrorData[0];
                $("#break").empty();
                $("#break").append('<option value="000000">请选择</option>')
                $("#gz").text(selectedBreakErrorData.name);
                for (var i = 0; i < breakErrorData.length; i++) {
                    var nameData = breakErrorData[i];
                    $("#break").append('<option list = "' + breakErrorData[i].id + '" value="' + i + '">' + nameData.name + '</option>');
                }
                if (localStorage.comBtn) {
                    var comId = parseInt(localStorage.comBtn);
                    $("#break").find("option[list =" + comId + "]").attr("selected", "selected");
                    $("#gz").text(localStorage.comname);
                }
            }
        }
    });
}

//琛ㄥ崟楠岃瘉

//涓嬪崟鏂瑰紡
$('#stepA').hover(function () {
    $("#stepThree").html('閭瘎璁惧');
    $("#stepFive").html('杞处浠樻');
    $("#stepSix").html('瀵勫洖璁惧');
    $("#stepA").addClass('choice');
});
$('#stepB').hover(function () {
    $("#stepThree").html('涓婇棬缁翠慨');
    $("#stepFive").html('鐢ㄦ埛楠屾敹');
    $("#stepSix").html('杞处浠樻');
    $("#stepA").removeClass('choice');
});
$('#stepC').hover(function () {
    $("#stepThree").html('鍒板簵缁翠慨');
    $("#stepFive").html('鐢ㄦ埛楠屾敹');
    $("#stepSix").html('杞处浠樻');
});

//鑾峰彇楠岃瘉鐮�
/*$("#enterCode").click(function(){
	var filter1 = /^0?1[3|5|7|8][0-9]\d{8}$/;
    if(!filter1.test($("#phoneNum").val())){
        $('#phonetips').show();
        //alert('璇锋纭～鍐欐墜鏈哄彿鐮�');
        return;
    }
    $.ajax({
        type: 'POST',
        url: url + '/api/order/sendSms',
        data: {
            mobile : $("#phoneNum").val()
        },
        dataType: 'json',
        success: function (data, status) {
            if (status == "success" && data.code == 200) {
            	$("#enterCode").attr("disabled",true);
                time(document.getElementById('enterCode'));
                //alert('鑾峰彇鎴愬姛')
            }
        }

    })
})

var wait=60;
// var wait;
function time(o) {
    // debugger;
    if (wait == 0) {
    	$("#enterCode").removeAttr("disabled");
        o.innerHTML="鑾峰彇";
        $('#enterCode').css({background:"#fff"});
        wait = 60;
    } else {
        //alert(wait);
        o.innerHTML="鍐嶆鑾峰彇(" + wait + ")";
        $('#enterCode').css({background:"#fff"});
        wait--;
        setTimeout(function() {
            time(o)
        },1000)
    }
}*/

//杈撳叆妗嗗け鍘荤劍鐐圭殑鍒ゆ柇
$("#userName").change(function () {
    var username = $(this).val();
    var length = username.length;
    if (length >= 2 && length <= 16) {
        if (/^[\u0391-\uFFE5A-Za-z]+$/.test(username)) {
            $("#nametips").hide();
        } else {
            $("#userName").css({ "background-color": "#fff6f6", "border": "1px solid #ff5151" });
            $("#nametips").show();
        }
    } else {
        $("#userName").css({ "background-color": "#fff6f6", "border": "1px solid #ff5151" });
        $("#nametips").show();
    }
});

$("#phoneNum").change(function () {
    var filter1 = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (!filter1.test($("#phoneNum").val())) {
        $("#phoneNum").css({ "background-color": "#fff6f6", "border": "1px solid #ff5151" });
        $("#phonetips").show();
    } else {
        $("#phonetips").hide();
    }
});

/*$("#vCode").change(function(){
    var reg = /^\d{4}$/;
    if(!reg.test($("#vCode").val())){
    	$(".vcode").css({"background-color":"#fff6f6","border":"1px solid #ff5151"});
        $("#codetips").show();
    }else{
        $("#codetips").hide();
    }
});*/

$("#Street").change(function () {
    var streetname = $(this).val();
    var length = streetname.length;
    if (length >= 6 && length <= 32) {
        $("#streettips").hide();
    } else {
        $("#Street").css({ "background-color": "#fff6f6", "border": "1px solid #ff5151" });
        $("#streettips").show();
    }
});

//琛ㄥ崟楠岃瘉
var sheng;
var shi;
var qu;
$("#fixSubmit").click(function () {
    if ($("#way option:selected").attr("data-id") == 1) {
        sheng = $("#provinceOne option:selected").attr("value");
        shi = $("#cityOne option:selected").attr("value");
        qu = $("#areaOne option:selected").attr("value");
    }
    if ($("#way option:selected").attr("data-id") == 2) {
        sheng = $("#province option:selected").attr("value");
        shi = $("#city option:selected").attr("value");
        qu = $("#areap option:selected").attr("value");
    }
    if ($("#way option:selected").attr("data-id") == 3) {
        sheng = $("#province option:selected").attr("value");
        shi = $("#city option:selected").attr("value");
        qu = $("#areap option:selected").attr("value");
    }
    if ($("#break option:selected").attr("value") == "000000") {
        $("#breakbox").css({ "background-color": "#fff6f6", "border": "1px solid #ff5151" });
        return;
    }
    if ($("#userName").val() == "") {
        $('#nametips').show();
        $("#userName").css({ "background-color": "#fff6f6", "border": "1px solid #ff5151" });
        return;
    }
    if ($("#phoneNum").val() == "") {
        $('#phonetips').show();
        $("#phonetips").css({ "background-color": "#fff6f6", "border": "1px solid #ff5151" });
        return;
    }
    if ($("#taxNumber").val().length > 50) {
        alert("绋庡彿鍦�50浣嶄互鍐�");
        return;
    }
    if ($("#Street").val() == "") {
        $('#streettips').show();
        $("#Street").css({ "background-color": "#fff6f6", "border": "1px solid #ff5151" });
        return;
    }
    if ($('#invoice').is(':checked') && $("#bill").val() == "") {
        $("#titleFixTips").show();
        return;
    }
    if ($('#invoice2').is(':checked') && $("#bill").val() == "") {
        $("#titleFixTips").show();
        return;
    }
    if ($('#invoice2').is(':checked') && $("#taxNumber").val() == "") {
        alert("绋庡彿涓嶈兘涓虹┖");
        return;
    }
    doSubmit();
});
localStorage.removeItem("coupon");
localStorage.clicktype = 0;
localStorage.coutype = 0;
//浼樻儬鍒�
$("#convert").bind("click", function () {
    localStorage.clicktype = 2;
    var citydata;
    if (localStorage.cat == 1) {
        citydata = $("#city option:selected").attr("data-code");
    } else if (localStorage.cat == 2) {
        citydata = $("#provinceService option:selected").attr("city");
    }
    var coupondata = {
        "coupon": $("#coupon").val(),
        "city": citydata,
        "phone_id": $("#model option:selected").attr("data-id"),
        "phomal_id": [$("#break option:selected").attr("list")].join(",")
    }
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url + '/api/preferential/couponisavailable',
        data: coupondata,
        success: function (data, status) {
            if (status == "success" && data.code == 200) {
                if (data.data.status == 1) {
                    $(".agio").text(data.data.data.info);
                    $(".add-price").text('￥' + data.data.data.new_price);
                    $(".price-title").show();
                    $(".add-price").show();
                    $(".coupon-title").text("");
                    localStorage.coupon = $("#coupon").val();
                    localStorage.coutype = 1;
                } else if (data.data.status == 0) {
                    $(".coupon-title").text(data.data.data);
                    $(".price-title").hide();
                    $(".add-price").hide();
                    $("#convert").text("鍐嶆浣跨敤");
                    localStorage.coutype = 0;
                }
            }
        }
    })
})

//鎻愪氦琛ㄥ崟
var sheng;
var shi;
var qu;
var allowSubmit = true;
function doSubmit() {
    var formdata = {
        "type": 1,
        "category": $("#way option:selected").data("id"),
        "name": $("#userName").val(),
        "mobile": $("#phoneNum").val(),
        //      "code": $("#vCode").val(),
        "color_id": localStorage.oDatacolor,
        "province": sheng,
        "city": shi,
        "area": qu,
        "detailed_address": $("#Street").val(),
        "phone_id": $("#model option:selected").attr("data-id"),
        "malfunctions": [$("#break option:selected").attr("list")],
        "user_remark": $("#message").val(),
        "mailAddress": localStorage.dcaddress,
        "mailCiyt": $("#provinceService option:selected").attr("city"),
        "reference_price": $("#jg").text(),
        "is_invoice": localStorage.invoice,
        "is_personal": localStorage.is_personal,
        "invoice": $("#bill").val(),
        "tax_number": $("#taxNumber").val(),
        "phone_imei": $("#IMEI").val(),
        "tommagic": localStorage.tommagic,
        "landUrl": localStorage.landData2,
        "referrer": localStorage.referrer,
        "coupon": localStorage.coupon
    };
    if (allowSubmit) {
        if (localStorage.clicktype = 0 && $("#coupon").val().length > 0) {
            return;
        } else if (localStorage.coutype == 0 && $("#coupon").val().length > 0) {
            return;
        } else if (localStorage.coutype == 1 || $("#coupon").val() == "") {
            allowSubmit = false;
            $('#fixSubmit').attr('disabled', 'true');
            $('#fixSubmit').css('background-color', '#787878');
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: url + '/api/order/add',
                data: formdata,
                success: function (data, status) {
                    if (status == "success" && data.code == 200) {
                        localStorage.removeItem("tommagic");
                        localStorage.removeItem("landData2");
                        localStorage.removeItem("referrer");
                        localStorage.removeItem("oDatacolor");
                        localStorage.removeItem("dcaddress");
                        localStorage.removeItem("color");
                        localStorage.removeItem("cat");
                        localStorage.removeItem("breakId");
                        localStorage.removeItem("is_personal");
                        localStorage.removeItem("shopcolors");
                        localStorage.removeItem("clicktype");
                        localStorage.removeItem("coutype");
                        localStorage.removeItem("coupon");
                        $("#fixSubmit").text("鎻愪氦鎴愬姛锛�");
                        //	                    $(".feedback-box").show();
                        window.location.href = "success.html";
                        $("input").val('');
                    }
                }
            });
        }
    } else {
        alert("鎻愪氦涓�");
    }
}
$(".feed-clear").click(function () {
    $(".feedback-box").hide()
})
$(".notice-main").click(function () {
    $(".notice").show();
})
$(".notice-btn").click(function () {
    $(".notice").hide();
})

