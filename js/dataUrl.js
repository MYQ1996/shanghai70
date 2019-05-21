function dataUrl() {
    return "http://192.168.1.106:8888/wxJavaPlat/";
}

function orgid() {
    return '14b8c8f3-7338-4d4c-a924-37c3db7a7fb5';
}


//ajax post异步方法
function ajaxyp(url, val, caozuo) {
    $.ajax({
        type: 'POST',
        data: val,
        dataType: "json",
        url: dataUrl() + url,
        async: true,
        success: function (data) {
            caozuo(data)
        }, error: function () {
            console.log(url + "  ajax交互失败！")
        }
    })
}

//ajax post同步方法
function ajaxtp(url, val, caozuo) {
    $.ajax({
        type: 'POST',
        data: val,
        dataType: "json",
        url: dataUrl() + url,
        async: false,
        success: function (data) {
            caozuo(data)
        }, error: function () {
            // alert(url + "  ajax交互失败！")
            console.log(url + "  ajax交互失败！")
        }
    })
}

// function 函数名() {
//     var 参数 = { 参数: 参数值, 参数: 参数值, 参数值: 参数值 };
//     ajaxyp('接口名.do', 参数, function (data) {
//         console.log(data);
//         }
//     })

// }

function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
}
function omitzi(maxLen, character) {
    //   定义长度，文字
    // 例子：omit(15, "sdsadsad")
    var dispose = "";
    var titleStr = character;
    if (titleStr.length > maxLen) {
        dispose = titleStr.substring(0, maxLen) + "...";
    }
    else {
        dispose = titleStr;
    }
    return dispose

}
