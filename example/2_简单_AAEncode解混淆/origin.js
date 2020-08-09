var _input = $("#the_words"),
    _sum = 0,
    _password = "well",
    _output = $("#disabled");

_input.bind("input propertychange", function (event) {
    _sum = _sum + 1;

    if (_input.val() == _password) {
        _output.attr('value', "成功了");
    } else {
        _output.attr('value', _output.attr('value') + '.');
    }
});

$("#reset_inner").click(function () {
    _input.val('');
    _output.attr('value', "尚未成功");
})