/* 
用来页面内容事件
*/

var $$ = jQuery
function api_ajax(operation, params, before_func, suc_callback_func, err_callback_func){
    $$.ajax({
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
    var _menu = $$("#main-menu");
    api_ajax(
        "MainMenu",
        {"block": jQuery("#block").attr("name")},
        function(){
            _menu.empty();
        },
        function(s){
            var data = $$.parseJSON(s).data.items;
            for (var i in data){
                var a = "<li><a class=\"waves-effect waves-dark\" id=\"" + data[i].ID + "\"><i class=\"" + data[i].IconClass + "\"></i>\n" + data[i].Text + "</a></li>";
                _menu.append(a);
                $$("#" + data[i].ID).click(new Function(data[i].OnClick));
            }
        },
        function(){}
    );
}

function change_inner(keyword) {
    var _inner = $$("#page-inner");
    if(_inner.attr("name") == keyword){return null;}
    api_ajax(
        "Inner",
        {"block":  $$("#block").attr("name"), "keyword": keyword},
        function(){
            _inner.empty();
            _inner.attr("name", "");
            $$(".active-menu.waves-effect.waves-dark").attr("class", "waves-effect waves-dark");
        },
        function(data){
            var data = $$.parseJSON(data).data;
            _inner.append(data);
            _inner.attr("name", keyword);
            $$("#" + keyword).attr("class","active-menu waves-effect waves-dark");
        },
        function(){}
    );
}