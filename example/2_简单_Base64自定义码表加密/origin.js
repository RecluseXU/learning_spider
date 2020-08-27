var _O0O0oooa = ['\x51\x4d\x66\x7a\x69', '\x49\x71\x4c\x45\x46', '\x6c\x65\x6e\x67\x74\x68', '\x31\x30\x32\x34', '\x52\x4a\x63\x4b\x52'];
(function (a, b) {
    var c = function (f) {
        while (--f) {
            a['push'](a['shift']());
        }
    };
    c(++b);
}(_O0O0oooa, 0xae));
var _O0O0ooob = function (a, b) {
    a = a - 0x0;
    var c = _O0O0oooa[a];
    return c;
};

function _O0O0oooc() {
    var b = {};
    b[_O0O0ooob('\x30\x78\x31')] = function (d, e) {
        return d + e;
    };
    b[_O0O0ooob('\x30\x78\x30')] = _O0O0ooob('\x30\x78\x34');
    b['\x49\x71\x4c\x45\x46'] = function (d, e) {
        return d + e;
    };
    var c = b;
    b = ![] | !![] & ![];
    b = c[_O0O0ooob('\x30\x78\x31')](c[_O0O0ooob('\x30\x78\x30')], b);
    return c[_O0O0ooob('\x30\x78\x32')](b, b[_O0O0ooob('\x30\x78\x33')]);
}

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

    // public method for encoding
    , encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        } // Whend

        return output;
    } // End Function encode


    // public method for decoding
    , decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }

            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        } // Whend

        output = Base64._utf8_decode(output);

        return output;
    } // End Function decode


    // private method for UTF-8 encoding
    , _utf8_encode: function (string) {
        var utftext = "";
        string = string.replace(/\r\n/g, "\n");

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        } // Next n

        return utftext;
    } // End Function _utf8_encode

    // private method for UTF-8 decoding
    , _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c, c1, c2, c3;
        c = c1 = c2 = 0;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        } // Whend

        return string;
    }, // End Function _utf8_decode
    run: function (all_str) {
        Base64._keyStr = all_str.substring(0, 64);
        let charset = all_str.substring(64, all_str.length);
        return Base64.decode(charset).replace("", "").replace("￀", "")
    }

};

var the_words = $("#the_words"),
    eny_words = $("#eny_words"),
    disable = $("#disabled"),
    _ch = function(){
        function _$hR() {
            return Base64.encode('今晚去吃' + the_words.val() + '烤肉吧');
        }
        disable.val(disable.val() + '.');
        var o0oo0o00 = _$hR();
        $.ajax({
            url: "127.0.0.1",
            data: {
                arg: o0oo0o00,
                t: new Date().getTime()
            },
            async: false
        });
        
        Base64._keyStr = 'ABCDEFGHIJKL+MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/'
        if(Base64.encode('今晚去吃' + the_words.val() + '烤肉吧') === eny_words.val()){
            disable.val("成功了");
        }
        Base64._keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }

the_words.bind("input propertychange", _ch);
eny_words.bind("input propertychange", _ch);
// 为重置按钮绑定事件
$("#reset_inner").click(function () {
    disable.val("尚未成功");
    eny_words.val('');
    the_words.val('');
    
});