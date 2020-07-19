/*------------------------------------------------------
    Author : www.webthemez.com
    License: Commons Attribution 3.0
    http://creativecommons.org/licenses/by/3.0/
---------------------------------------------------------  */

/* 
用来刷新页面主要内容
keyword=[
    "PopularityEstimated"
    "GameInfo"
]
*/
function change_inner(keyword) {
    $.ajax({
        url: "/ajax-get-inner", //请求的url地址
        dataType: "text", //返回格式为text
        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
        data: {
            "keyword": keyword
        }, //参数值
        type: "GET", //请求方式
        success: function (data) {
            document.getElementById("page-wrapper").innerHTML = data
        }
    });

    $("#main-menu").children().children("a").attr("class","waves-effect waves-dark");

    switch(keyword){
        case "PopularityEstimated":
            load_baidu_index_chart("baidu-index-chart");
            load_steam_index_chart("steam-index-chart");
            load_jannchie_index_chart("jannchie-index-chart");
            $("#main-menu-PopularityEstimated").attr("class","active-menu waves-effect waves-dark");
            break;
        case "GameInfo":
            $("#main-menu-GameInfo").attr("class","active-menu waves-effect waves-dark");
            break;


    }
}


/* 
数据显示与导入
*/
function load_baidu_index_chart(chart_element_id) {
    if (document.getElementById(chart_element_id) == null) {
        return null
    }

    $.ajax({
        url: "/ajax-get-baiduindex", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: {
            "keyword": "MHW"
        }, //参数值
        type: "GET", //请求方式
        success: function (data) {
            //请求成功时处理
            //解析
            var baiduindex_time = data['CrawlDay'];
            var baiduindex_json = data['Data'];
            var baiduindex_list = new Array();
            for (var key in baiduindex_json) {
                baiduindex_list.push({
                    period: key,
                    index: baiduindex_json[key]
                })
            }
            //绘制
            Morris.Area({
                element: chart_element_id,
                data: baiduindex_list,
                xkey: 'period',
                ykeys: ['index'],
                labels: ['百度指数值'],
                pointSize: 2,
                hideHover: 'auto',
                lineColors: ['#33c6f7'],

                resize: true
            });

            document.getElementById("baidu_index_simple_info").innerHTML = '百度指数&emsp;' + '记录时间: ' + baiduindex_time + '&emsp;<a href="http://index.baidu.com/v2/index.html#/">数据来源</a>'
        },
        error: function () { //请求出错处理
        }
    });
}

function load_steam_index_chart(chart_element_id) {
    if (document.getElementById(chart_element_id) == null) {
        return null
    }
    $.ajax({
        url: "/ajax-get-steamindex", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: {
            "keyword": "MHW"
        }, //参数值
        type: "GET", //请求方式
        success: function (data) {
            //请求成功时处理
            //解析
            var steamindex_time = data['CrawlDay'];
            var steamindex_json = data['Data'];
            var steamindex_list = new Array();
            for (var key in steamindex_json) {
                steamindex_list.push({
                    period: key,
                    index: steamindex_json[key]
                })
            }
            //绘制
            Morris.Area({
                element: chart_element_id,
                data: steamindex_list,
                xkey: 'period',
                ykeys: ['index'],
                labels: ['steam玩家指数值'],
                pointSize: 2,
                hideHover: 'auto',
                lineColors: ['#33c6f7'],

                resize: true
            });

            document.getElementById("steam_index_simple_info").innerHTML = 'steam玩家指数&emsp;' + '记录时间: ' + steamindex_time + '&emsp;<a href="https://steamcharts.com/">数据来源</a>'
        },
        error: function () {
            //请求出错处理
        }
    })
}


function load_jannchie_index_chart(chart_element_id) {
    if (document.getElementById(chart_element_id) == null) {
        return null
    }
    $.ajax({
        url: "/ajax-get-jannchieindex", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: {
            "keyword": "MHW"
        }, //参数值
        type: "GET", //请求方式
        success: function (data) {
            //请求成功时处理
            //解析
            var jannchieindex_time = data['CrawlDay'];
            var jannchieindex_json = data['Data'];
            var jannchieindex_list = new Array();
            for (var key in jannchieindex_json) {
                jannchieindex_list.push({
                    period: key,
                    index: jannchieindex_json[key]
                })
            }
            //绘制
            Morris.Area({
                element: chart_element_id,
                data: jannchieindex_list,
                xkey: 'period',
                ykeys: ['index'],
                labels: ['BILIBILI指数值'],
                pointSize: 2,
                hideHover: 'auto',
                lineColors: ['#33c6f7'],

                resize: true
            });

            document.getElementById("jannchie_index_simple_info").innerHTML = 'Bilibili指数&emsp;' + '记录时间: ' + jannchieindex_time + '&emsp;<a href="https://www.biliob.com/index">数据来源</a>'
        },
        error: function () {
            //请求出错处理
        }
    });

}




(function ($) {
    "use strict";
    var mainApp = {

        initFunction: function () {
            /*MENU 
            ------------------------------------*/
            $('#main-menu').metisMenu();

            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });

            /* BASE INNEER
            默认首页
            ----------------------------------------*/
            change_inner("GameInfo")
        },

        initialization: function () {
            mainApp.initFunction();

        }

    }
    // Initializing ///

    $(document).ready(function () {
        $(".dropdown-button").dropdown();
        $("#sideNav").click(function () {
            if ($(this).hasClass('closed')) {
                $('.navbar-side').animate({
                    left: '0px'
                });
                $(this).removeClass('closed');
                $('#page-wrapper').animate({
                    'margin-left': '260px'
                });

            } else {
                $(this).addClass('closed');
                $('.navbar-side').animate({
                    left: '-260px'
                });
                $('#page-wrapper').animate({
                    'margin-left': '0px'
                });
            }
        });

        mainApp.initFunction();
    });

    $(".dropdown-button").dropdown();

}(jQuery));