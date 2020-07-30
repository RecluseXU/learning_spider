$("a.waves-effect waves-dark").click(function(){
    change_inner(this.attr("name"));
});
/* 
用来页面内容事件
*/
function api_ajax(operation, params, bef_callback_func, suc_callback_func, err_callback_func){
    $.ajax({
        url: "/api/" + operation,
        dataType: "json",
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: params,
        type: "GET",
        timeout: 1200,
        cache: true,
        beforeSend: bef_callback_func,
        success: suc_callback_func,
        error: err_callback_func,
    });
}

function change_main_menu(){
    menu = $("#main-menu");
    api_ajax(
        "MainMenu",
        {"Block": $("#Block").attr("name")},
        function(){
            menu.empty();
        },
        function(s){
            var data = eval(s).Data;
            for (var i in data){
                var a = "<li><a class=\"active-menu waves-effect waves-dark\" id=\"" + data[i].ID + "\"><i class=\"" + data[i].IconClass + "\"></i>\n" + data[i].Text + "</a></li>";
                menu.append(a);
                // $("#" + data[i].get("ID")).click(eval(data[i].get("OnClick")));
            }
        },
        function(){},
    );
}

function change_inner(keyword) {
    _api_ajax(
        "getInner",
        {"block": $("#Block").attr("name"), "keyword": keyword},
        function(data){
            document.getElementById("page-wrapper").innerHTML = data;
            $("#main-menu").children().children("a").attr("class","waves-effect waves-dark");
            $("#" + keyword).attr("class","active-menu waves-effect waves-dark");
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
            change_main_menu()
            // change_inner()
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




