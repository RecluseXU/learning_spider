_init_comment();

function _get_message_html(username, message){
    return '\n<li><span>%username%: </span><span>%message%</span></li>'.replace('%username%', username).replace('%message%', message)
}

function _init_comment(){
    $("#_all_the_message").html(
        _get_message_html('群主', '禁止复读') + _get_message_html('管理员', '严禁复读')
    );
}

$('#_send_a_common').click(function(){
    var _message = $("#the_words").val()
    $("#_all_the_message").append(_get_message_html('你', _message));
})

$("#reset_inner").click(function () {
    _init_comment();
})
