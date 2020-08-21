_$vD = window;
o0oo0o00 = "";
inp = $("#the_words")
// (function() {
//     setInterval(function() {
//         _$he()
//     }, 4000)
// }());

function _$fI() {
    debugger
}
function _$he() {
    var a = new Date();
    _$fI();
    _$jD = (new Date() - a > 100);
    if (_$jD) {
        _$hR()
    }
}
function _$hR() {
    var x = eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('"\\6\\0\\1\\2\\3\\7\\8\\4\\5\\9\\a\\4\\5\\b\\c\\d\\0\\1\\2\\3"',14,14,'x72|x79|x70|x74|x53|x2e|x43|x6f|x4a|x41|x45|x64|x65|x63'.split('|'),0,{})),
    y = eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('"\\5\\1\\6\\2\\3\\7\\8\\9\\0\\4\\a\\b\\0\\c\\3\\d\\e\\0\\2\\f\\1\\g\\4"',17,17,'x2e|x72|x70|x74|x65|x43|x79|x6f|x4a|x53|x6e|x63|x55|x66|x38|x61|x73'.split('|'),0,{}));
    function _$jG() { // 实际上只是个返回"eval"的函数
        var o0000o = "";
        var o00o0o = [101, 119, 99, 111];
        for (var i = 0; i < o00o0o.length; i++) {
            var o00o00 = o00o0o[i] - i;
            o0000o += String.fromCharCode(o00o00);
        }
        return o0000o;
    }
    function _$hu() {
        return "(function() {var a = new Date(); debugger; return new Date() - a > 100;}())"
    }
    function _$ddf(){
        return inp.text()
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
    // var a = _$r3(_$hu()); // 实际上是在eval一个会进行无限debugger的字符串
    // _$st = a;
    // if (_$st) {
    //     _$he()
    // }

    _$r5 = _$r3(x);

    var o00o0o00o0o0o00 = _$r3(y)( // 转码切分
        (_$vD["t"]["d"] + "e4328438e2fd11eaa4b40242ac150002" + _$he()).substring(0, 16) // 实际上是"e44834e4328438e2"
    );
    o0oo0o00 = _$r5(
        _$vD[_$jG()](_$jj() + "ify")({  // 密文 "{"o00o0o00o0o0o0":"eval0514undefined"}"
            o00o0o00o0o0o0: _$jG() + "0514" + _$he() 
        }),
        o00o0o00o0o0o00,  // 秘钥 实际上是"e44834e4328438e2"
        {
            mode: o00o0o00.mode.o00o0o00o0o0o,  // AES模式  实际是ECB
            padding: o00o0o00.pad.o00o0o00o0o0o0  // AES填充方式  实际是Pkcs7
        }).toString();
}

inp.bind("input propertychange", function() {
    _$he();
    _$hR();
    htmlobj = $.ajax({
        url: "/",
        data: {
            arg: o0oo0o00,
            t: new Date().getTime()
        },
        async: false
    });
})