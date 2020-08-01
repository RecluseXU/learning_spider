/* 
用来页面内容事件
*/
function api_ajax(operation, params, before_func, suc_callback_func, err_callback_func){
    $.ajax({
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

function change_main_menu(){
    var _menu = $("#main-menu");
    api_ajax(
        "MainMenu",
        {"block": $("#block").attr("name")},
        function(){
            _menu.empty();
        },
        function(s){
            var data = $.parseJSON(s).data.items;
            for (var i in data){
                var a = "<li><a class=\"waves-effect waves-dark\" id=\"" + data[i].ID + "\"><i class=\"" + data[i].IconClass + "\"></i>\n" + data[i].Text + "</a></li>";
                _menu.append(a);
                $("#" + data[i].ID).click(new Function(data[i].OnClick));
            }
        },
        function(){}
    );
}

function change_inner(id) {
    var _inner = $("#page-inner");
    api_ajax(
        "Inner",
        {"block": $("#block").attr("name"), "keyword": id},
        function(){
            _inner.empty();
        },
       function(data){
            _inner.append(data);
            $("main-menu").attr("class", "waves-effect waves-dark");
            $("#" + id).attr("class","active-menu waves-effect waves-dark");
        },
        function(){}
    );
}



(function () {
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




