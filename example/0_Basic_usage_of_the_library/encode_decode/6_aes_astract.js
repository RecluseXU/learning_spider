_$vD = window;

function _$hR() {
    function _$jG() { // 实际上只是个返回"eval"的函数
        var o0000o = "";
        var o00o0o = [101, 119, 99, 111];
        for (var i = 0; i < o00o0o.length; i++) {
            var o00o00 = o00o0o[i] - i;
            o0000o += String.fromCharCode(o00o00);
        }
        return o0000o;
    }

    function _$jj() { // 实际上只是个返回"JSON.string"的函数
        var o0000o = "";
        var o00o0o = [74, 82, 77, 75, 42, 110, 110, 107, 97, 101, 93];
        for (var i = 0; i < o00o0o.length; i++) {
            var o00o00 = o00o0o[i] + i;
            o0000o += String.fromCharCode(o00o00);
        }
        return o0000o;
    }
    _$r3 = _$vD[_$jG()]; // 从window中获取到eval函数
    if ((_$r3 + "").indexOf("native") == -1) { // 如果eval函数被改写，那么直接无限debugger
        while (1) {
            _$fI()
        }
    }
    _$r4 = _$r3(_$jj() + "ify"); // 实际上是eval("JSON.stringify")
    if ((_$r4 + "").indexOf("native") == -1) { // 如果JSON.stringify函数被改写，那么直接无限debugger
        while (1) {
            _$fI()
        }
    }
    var a = _$r3(_$hu()); // 实际上是在eval一个会进行无限debugger的字符串
    _$st = a;
    if (_$st) {
        _$he()
    }

    var o00o0o00o0o0o00 = o00o0o00.o00o0o00o.o00o0o00o0.o00o0o00o0o( // 转码切分
        (_$vD["t"]["d"] + "e4328438e2fd11eaa4b40242ac150002" + _$he()).substring(0, 16) // 实际上是"e44834e4328438e2"
    );
    o0oo0o00 = o00o0o00.o00o0o00o0o0.o00o0o00orypt(
        _$vD[_$jG()](_$jj() + "ify")({  // 密文 "{"o00o0o00o0o0o0":"eval0514undefined"}"
            o00o0o00o0o0o0: _$jG() + "0514" + _$he() 
        }),
        o00o0o00o0o0o00,  // 秘钥 实际上是"e44834e4328438e2"
        {
            mode: o00o0o00.mode.o00o0o00o0o0o,  // AES模式  实际是ECB
            padding: o00o0o00.pad.o00o0o00o0o0o0  // AES填充方式  实际是Pkcs7
        }).toString();
}

_$hR()