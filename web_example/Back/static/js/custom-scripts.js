/* 
    页面内容变更
*/
function api_ajax(operation, params, before_func, suc_callback_func, err_callback_func) {
    jQuery.ajax({
        url: "/api/" + operation,
        dataType: "text",
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: params,
        type: "GET",
        timeout: 1200,
        cache: true,
        beforeSend: before_func,
        success: suc_callback_func,
        error: err_callback_func,
    });
}

function change_main_menu() {
    var _menu = jQuery("#main-menu");
    api_ajax(
        "MainMenu", {
            "block": jQuery("#block").attr("name")
        },
        function () {
            _menu.empty();
        },
        function (s) {
            var data = jQuery.parseJSON(s).data.items;
            for (var i in data) {
                var a = "<li><a class=\"waves-effect waves-dark\" id=\"" + data[i].ID + "\"><i class=\"" + data[i].IconClass + "\"></i>\n" + data[i].Text + "</a></li>";
                _menu.append(a);
                jQuery("#" + data[i].ID).click(new Function(data[i].OnClick));
            }
        },
        function () {}
    );
}

function change_inner(keyword) {
    var _inner = jQuery("#page-inner");
    if (_inner.attr("name") == keyword) {
        return null;
    }
    api_ajax(
        "Inner", {
            "block": jQuery("#block").attr("name"),
            "keyword": keyword
        },
        function () {
            contain_loading_animation(_inner);
            _inner.attr("name", "");
            jQuery(".active-menu.waves-effect.waves-dark").attr("class", "waves-effect waves-dark");
        },
        function (data) {
            var data = jQuery.parseJSON(data).data;
            _inner.empty();
            _inner.append(data);
            _inner.attr("name", keyword);
            jQuery("#" + keyword).attr("class", "active-menu waves-effect waves-dark");
        },
        function () {}
    );
}

// 将元素的内容更换为一个读取动画
function contain_loading_animation(element) {
    element.empty();
    element.append("<div class=\"preloader-wrapper big active\"><div class=\"spinner-layer spinner-blue\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div>");
}



/* 
    初始化
*/
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
            change_main_menu();
            change_inner("site_info");
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

