var itv = setInterval(function () {
    _$he();
    debugger
}, 1000);


var _$jG = function() {
    return "\x65\x76\x61\x6c"
}

var _$he = function() {
    var a = new Date();
    _$fI();
    _$jD = (new Date() - a > 100);
    if (_$jD) {
        _$hR()
    }
}

var _$fI = function() {
    window[_$jG()](_$hu());
    debugger
}

var _$hu = function () {
    return "\x28\x66\x75\x6e\x63\x74\x69\x6f\x6e\x28\x29 \x7b\x76\x61\x72 \x61 \x3d \x6e\x65\x77 \x44\x61\x74\x65\x28\x29\x3b \x64\x65\x62\x75\x67\x67\x65\x72\x3b \x72\x65\x74\x75\x72\x6e \x6e\x65\x77 \x44\x61\x74\x65\x28\x29 \x2d \x61 \x3e \x31\x30\x30\x3b\x7d\x28\x29\x29"
}

var _$hR = function () {
    _$r3 = window[_$jG()];
    if ((_$r3 + "").indexOf("native") == -1) {
        while (1) {
            _$fI()
        }
    }
    var a = _$r3(_$hu());
    _$st = a;
    if (_$st) {
        _$he()
    }
}


function inner_exit() {
    clearInterval(itv);
    _$jG = null;
    _$he = null;
    _$fI = null;
    _$hu = null;
    _$hR = null;
}